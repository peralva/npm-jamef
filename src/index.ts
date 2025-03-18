import {
	ApiJamefComBrConsultaV1RastreamentoGet,
	ApiJamefComBrDocumentosV1NotaFiscalPost,
	ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet,
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

			let response;

			if (this.isProduction) {
				response = await services({
					url: 'https://api.jamef.com.br/auth/v1/login',
					...options,
				});
			} else {
				response = await services({
					url: 'https://api-qa.jamef.com.br/auth/v1/login',
					...options,
				});
			}

			if (response.status !== 200) {
				throw new Error(
					'mensagem' in response.body
						? response.body.mensagem
						: response.body.error,
				);
			}

			this.token = response.body.dado[0].accessToken;
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

		let response;

		if (this.isProduction) {
			response = await services({
				url: 'https://api.jamef.com.br/documentos/v1/nota-fiscal',
				...options,
			});
		} else {
			response = await services({
				url: 'https://api-qa.jamef.com.br/documentos/v1/nota-fiscal',
				...options,
			});
		}

		return response;
	}

	public async getTracking(
		query: ApiJamefComBrConsultaV1RastreamentoGet['request']['query'],
	): Promise<
		ReturnType<
			typeof services<{
				url: 'https://api.jamef.com.br/consulta/v1/rastreamento';
				method: 'GET';
				query: typeof query;
				headers: { Authorization: Awaited<ReturnType<Jamef['login']>> };
			}>
		>
	> {
		const options = {
			method: 'GET',
			query,
			headers: { Authorization: await this.login() },
		} as const;

		let response;

		if (this.isProduction) {
			response = await services({
				url: 'https://api.jamef.com.br/consulta/v1/rastreamento',
				...options,
			});
		} else {
			response = await services({
				url: 'https://api-qa.jamef.com.br/consulta/v1/rastreamento',
				...options,
			});
		}

		return response;
	}

	public async getLabel(
		path: { chaveNotaFisca𝚕: string },
		query: ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet['request']['query'],
	): Promise<
		ReturnType<
			typeof services<{
				url: ApiJamefComBrOperacaoV1EtiquetaChaveNotaFiscalGet['request']['url'];
				method: 'GET';
				query: typeof query;
				headers: { Authorization: Awaited<ReturnType<Jamef['login']>> };
			}>
		>
	> {
		const options = {
			method: 'GET',
			query,
			headers: { Authorization: await this.login() },
		} as const;

		let response;

		if (this.isProduction) {
			response = await services({
				url: `https://api.jamef.com.br/operacao/v1/etiqueta/${path.chaveNotaFisca𝚕}`,
				...options,
			});
		} else {
			response = await services({
				url: `https://api-qa.jamef.com.br/operacao/v1/etiqueta/${path.chaveNotaFisca𝚕}`,
				...options,
			});
		}

		return response;
	}
}
