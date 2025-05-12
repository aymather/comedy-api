import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const automationPath = process.argv[2];

if (!automationPath) {
	console.error('Please provide the path to the automation script');
	console.error('Usage: yarn automation <path-to-automation>');
	console.error('Example: yarn automation hosts/the-comedy-store');
	console.error('Example: yarn automation hosts/the-comedy-store/hollywood');
	process.exit(1);
}

// Construct the full path to the directory
const fullDirPath = path.join(process.cwd(), 'automations', automationPath);
const indexPath = path.join(fullDirPath, 'index.ts');

// Check if the path exists and is a directory
if (!fs.existsSync(fullDirPath)) {
	console.error(`Directory not found: ${fullDirPath}`);
	process.exit(1);
}

// Check if index.ts exists in the directory
if (!fs.existsSync(indexPath)) {
	console.error(`No index.ts found in: ${fullDirPath}`);
	process.exit(1);
}

try {
	const child = spawn(
		'npx',
		[
			'ts-node',
			'-r',
			'tsconfig-paths/register',
			'-P',
			'./tsconfig.json',
			indexPath
		],
		{
			stdio: 'inherit',
			shell: true
		}
	);

	child.on('error', (error) => {
		console.error('Failed to start automation:', error);
		process.exit(1);
	});

	child.on('close', (code) => {
		process.exit(code ?? 0);
	});
} catch (error) {
	console.error('Error running automation:', error);
	process.exit(1);
}
