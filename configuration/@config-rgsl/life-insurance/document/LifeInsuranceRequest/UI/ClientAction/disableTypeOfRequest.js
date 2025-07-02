const { documentStates } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function disableTypeOfRequest(input, ambientProperties) {

    let result = false;
    const saved = input.context.IsSaved;
    const stateCode = input.rootContext.State.Code;
    const isDraft = stateCode == documentStates.Draft;

    if (saved && !isDraft) { result = true; }
    if (!input.context.Body.typeOfRequest) { result = false; }

    return result;

};
