import {
	ApiJamefComBrDocumentosV1NotaFiscalPost,
	services,
} from '@peralva/services';
import tokenIsExpired from './utils/tokenIsExpired';

export class Jamef {
	private username: string;
	private password: string;
	private isProduction: boolean;
	private token?: `${string}.${string}.${string}`;

	constructor(username: string, password: string, isProduction = true) {
		this.username = username;
		this.password = password;
		this.isProduction = isProduction;
	}

	private async login(): Promise<`Bearer ${string}.${string}.${string}`> {
		if (!this.token || tokenIsExpired(this.token)) {
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: {
					username: this.username,
					password: this.password,
				},
			} as const;

			let responseService;

			if (this.isProduction) {
				responseService = await services({
					url: 'https://api.jamef.com.br/auth/v1/login',
					...options,
				});
			} else {
				responseService = await services({
					url: 'https://api-qa.jamef.com.br/auth/v1/login',
					...options,
				});
			}

			if (responseService.status !== 200) {
				throw new Error(
					'mensagem' in responseService.body
						? responseService.body.mensagem
						: responseService.body.error,
				);
			}

			this.token = responseService.body.dado[0].accessToken;
		}

		return `Bearer ${this.token}`;
	}

	public async sendInvoice(
		body: ApiJamefComBrDocumentosV1NotaFiscalPost['request']['body'],
	): Promise<
		ReturnType<
			typeof services<{
				url: 'https://api.jamef.com.br/documentos/v1/nota-fiscal';
				method: 'POST';
				body: typeof body;
				headers: {
					'Content-Type': 'application/json';
					Authorization: Awaited<ReturnType<Jamef['login']>>;
				};
			}>
		>
	> {
		const options = {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: await this.login(),
			},
		} as const;

		if (this.isProduction) {
			return await services({
				url: 'https://api.jamef.com.br/documentos/v1/nota-fiscal',
				...options,
			});
		}

		return await services({
			url: 'https://api-qa.jamef.com.br/documentos/v1/nota-fiscal',
			...options,
		});
	}
}
