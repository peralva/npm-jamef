# jamef

Jamef

[![NPM Version](https://img.shields.io/npm/v/jamef)](https://www.npmjs.com/package/jamef?activeTab=versions)
[![GitHub Release Date](https://img.shields.io/github/release-date/peralva/npm-jamef)](https://github.com/peralva/npm-jamef/releases)
[![GitHub License](https://img.shields.io/github/license/peralva/npm-jamef)](https://github.com/peralva/npm-jamef?tab=MIT-1-ov-file#readme)
[![NPM Downloads](https://img.shields.io/npm/dm/jamef)](https://www.npmjs.com/package/jamef)
[![NPM Publish](https://github.com/peralva/npm-jamef/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/peralva/npm-jamef/actions/workflows/npm-publish.yml)

## Installation

```bash
npm install --save jamef
```

## Usage

```ts
import { Jamef } from 'jamef';

const jamef = new Jamef('sistemas@jamef.com.br', '12343456');

(async () => {
	const response = await jamef.sendInvoice({
		notasFiscais: [
			{
				remetente: {
					documento: '12345678000123',
					nome: 'EMPRESA EXEMPLO LTDA',
					logradouro: 'RUA DAS FLORES',
					numeroEndereco: '500',
					complementoEndereco: 'BLOCO A',
					bairro: 'CENTRO',
					codigoIbge: '1234567',
					municipio: 'EXEMPLOMUNI',
					estado: 'EX',
					cep: '12345000',
					telefone: '40028922',
					inscricaoEstadual: 'ISENTO',
					email: 'contato@exemplo.com',
				},
				destinatario: {
					documento: '98765432000198',
					nome: 'CLIENTE EXEMPLAR S/A',
					logradouro: 'AV. DOS NEGÓCIOS',
					numeroEndereco: '1000',
					complementoEndereco: 'TORRE 2',
					bairro: 'NEGÓCIOS',
					codigoIbge: '7654321',
					indicadorInscricaoEstadual: '1',
					municipio: 'EXEMPLOMUNI',
					estado: 'NG',
					cep: '98765000',
					telefone: '08001234567',
					inscricaoEstadual: '123456789',
					email: 'exemplo@cliente.com',
				},
				frete: {
					pagadorFrete: '1',
					tipoNotaFiscal: '1',
					numeroNotaFiscal: '123456',
					serieNotaFiscal: '1',
					dataEmissaoNotaFiscal: new Date('2023-12-18'),
					quantidadeVolumeNotaFiscal: 5,
					pesoNotaFiscal: 50,
					pesoCubadoNotaFiscal: 0.75,
					metragemCubica: 0.05,
					valorNotaFiscal: 1000,
					cfop: '5102',
					numeroPedido: '',
					chaveNotaFiscal: '12345678901234567890123456789012345678901234',
					videNotaFiscal: '2',
					clienteRetira: '2',
					filialNotaFiscal: '01',
				},
			},
		],
	});

	if (response.status !== 200) {
		let messageError;

		if ('mensagem' in response.body) {
			messageError = response.body.mensagem;
		} else {
			messageError = response.body.error;
		}

		throw new Error(messageError);
	}

	console.log(response.body.dado[0]);
})();
```
