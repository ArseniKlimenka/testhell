module.exports = function mapping(nput, sinkExchange) {

    const serviceResponce = sinkExchange.resolveContext("serviceResponce");

    const integrationStatus = {};

    integrationStatus.INTEGRATION_STATUS_ID = newGuid();
    integrationStatus.LOAD_DATE = serviceResponce.LoadedOnDate;
    integrationStatus.METHOD_NAME = serviceResponce.MethodName;
    integrationStatus.STATUS = serviceResponce.Status;
    integrationStatus.ERRORS = serviceResponce.ErrorMesages;
    integrationStatus.RESULT_ENTITY_ID = serviceResponce.ResultEntityId;

    return {
        'BFX_IMPL.SAP_INTEGRATION_STATUS': [integrationStatus],
        'PAS_IMPL.RECOMMENDED_STRATEGIES': []
    };
};

function newGuid() {
    const requestId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return requestId;
}
