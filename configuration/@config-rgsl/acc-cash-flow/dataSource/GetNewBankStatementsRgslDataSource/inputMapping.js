module.exports = function DataSourceInputMapping(input) {
    const guid = input.data?.criteria?.rgslGuid ? '<ban:GUID>' + input.data.criteria.rgslGuid + '</ban:GUID>' : '<ban:GUID/>';
    const output = {
        request: {
            baseAddress: this.environmentVariables['rgsl.getBankStatements.baseAddress'],
            requestUri: this.environmentVariables['rgsl.getBankStatements.requestUri'],
            content: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ban="http://www.BankStatements.life/"><soapenv:Header/><soapenv:Body><ban:GetBanksStatements>' + guid + '</ban:GetBanksStatements></soapenv:Body></soapenv:Envelope>',
            user: this.environmentVariables['rgsl.getBankStatements.user'],
            password: this.environmentVariables['rgsl.getBankStatements.password'],
            iterable: true,
            queryPath: '$.soap:Envelope.soap:Body.m:GetBanksStatementsResponse.m:return.m:BS',
        }
    };

    return output;
};
