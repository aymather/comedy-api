import axios, { AxiosInstance } from 'axios';

export abstract class HttpBaseDelegate {
	protected abstract httpClient: AxiosInstance;

	createDelegateHttpInstance = (
		baseUrl: string,
		authorizationToken: string,
		serviceName: string
	): AxiosInstance => {
		const instance = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json',
				Authorization: authorizationToken
			},
			timeout: 10000
		});

		// Add a response interceptor
		instance.interceptors.response.use(
			(response) => response.data,
			(error) => {
				const env = process.env['ENV'];
				console.error('An error occurred:', {
					delegateName: this.constructor.name,
					env,
					serviceName,
					error: error?.response?.data
				});
				return Promise.resolve(error);
			}
		);

		return instance;
	};
}
