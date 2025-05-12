import {
	GetSecretValueCommand,
	SecretsManagerClient
} from '@aws-sdk/client-secrets-manager';

export const getEnv = (): string => {
	const env = process.env['ENV'];
	if (env === undefined) {
		throw new Error('ENV is not defined');
	}
	return env;
};

const getSecretKeyEnvironment = (key: string): string => {
	const env = getEnv();

	// If we have an override in the environment config, use that instead
	// Example: <key name>=<environment>
	// Example: alysium-service=prod
	const keyEnvOverride = process.env[key];
	if (keyEnvOverride !== undefined) {
		return `${keyEnvOverride}/${key}`;
	}

	return `${env}/${key}`;
};

export const loadAwsSecretsManagerKey = async (key: string) => {
	const client = new SecretsManagerClient();
	const command = new GetSecretValueCommand({ SecretId: key });

	const response = await client.send(command);
	const secrets = JSON.parse(response.SecretString || '{}');
	for (const key in secrets) {
		if (process.env[key] === undefined) {
			process.env[key] = secrets[key];
		}
	}
};

export default async (secrets: string[]) => {
	const envSecrets = secrets.map((key) => getSecretKeyEnvironment(key));

	const env = getEnv();
	console.log(`\n<-------- CONFIGURING ENVIRONMENT ${env} -------->\n`);
	console.log('With keys:', envSecrets.map((i) => `\n - ${i}`).join(''));
	console.log('\n<------------------------------------------------>\n');
	await Promise.all(envSecrets.map(loadAwsSecretsManagerKey));
};
