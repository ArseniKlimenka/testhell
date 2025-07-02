'use strict';

const sendEventConstant = require('@config-rgsl/life-insurance/lib/sendEventConstant');

module.exports = function mapping(sinkInput, sinkExchange) {

    const subscriber = sinkInput.subscriber.toLowerCase();
    const login = this.environmentVariables[`rgsl.sendEvent.${subscriber}.login`];
    const password = this.environmentVariables[`rgsl.sendEvent.${subscriber}.password`];
    const curlPath = this.environmentVariables[`rgsl.sendEvent.${subscriber}.curlPath`];
    const certPath = this.environmentVariables[`rgsl.sendEvent.${subscriber}.certPath`];
    const keyPath = this.environmentVariables[`rgsl.sendEvent.${subscriber}.keyPath`];
    const passPhrase = this.environmentVariables[`rgsl.sendEvent.${subscriber}.passPhrase`];
    const token = this.environmentVariables[`rgsl.sendEvent.${subscriber}.token`];
    const environmentName = this.environmentVariables[`rgsl.sendEvent.${subscriber}.environmentName`];
    let uri = this.environmentVariables[`rgsl.sendEvent.${subscriber}.uri`];

    if (environmentName != "TEST") {

        const bookNumber = sinkExchange.bookNumber;
        const insuranceId = sinkExchange.insuranceId;

        if (sinkInput.subscriber == sendEventConstant.subscriber.SPORTSMAN_CREATE || sinkInput.subscriber == sendEventConstant.subscriber.SPORTSMAN_DELETE) {
            uri = uri.replace("{bookNumber}", bookNumber);
        }

        if (sinkInput.subscriber == sendEventConstant.subscriber.SPORTSMAN_DELETE) {
            uri = uri.replace("{insuranceId}", insuranceId);
        }
    }

    return {
        request: {
            sendEventId: sinkInput.sendEventId,
            subscriber: sinkInput.subscriber,
            request: sinkInput.request,
            uri,
            login,
            password,
            curlPath,
            certPath,
            keyPath,
            passPhrase,
            token
        }
    };
};
