'use static';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function mapping({ id, number, state, body }, sinkExchange) {

    const clientBaseUrl = this.environmentVariables.clientBaseUrl;
    const contractUri = `${clientBaseUrl}/${uriBuilder.getImportDocumentUri(number, 'AggregatedPaymentRegisterImport')}`;

    sinkExchange.documentNumber = number;
    sinkExchange.documentUri = contractUri;

    body.errors = [];

    const result = {
        body: body,
        number: number
    };

    return result;
};
