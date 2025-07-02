module.exports = function mapping(sinkInput, sinkExchange) {
    const request = {
        baseAddress: this.environmentVariables['rgsl.setSuccessfulFlag.baseAddress'],
        requestUri: this.environmentVariables['rgsl.setSuccessfulFlag.requestUri'],
        content: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ban="http://www.BankStatements.life/"><soapenv:Header/><soapenv:Body><ban:SetSuccessfulFlag><ban:GUID>' + sinkInput.rgslGuid + '</ban:GUID></ban:SetSuccessfulFlag></soapenv:Body></soapenv:Envelope>',
        user: this.environmentVariables['rgsl.setSuccessfulFlag.user'],
        password: this.environmentVariables['rgsl.setSuccessfulFlag.password'],
        iterable: false,
        queryPath: "$.soap:Envelope.soap:Body.m:SetSuccessfulFlagResponse.m:return",
    };

    return {
        request,
    };
};
