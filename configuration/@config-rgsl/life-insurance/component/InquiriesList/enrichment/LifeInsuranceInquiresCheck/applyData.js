const { inquiryState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function applyData(quote, dataSourceResponse) {
    const document = quote;
    const businessContext = this.businessContext;
    const uwTriggers = businessContext.rootData.uwTriggers || [];
    let responce = getValue(dataSourceResponse, 'data') || [];
    let checkResult = false;

    responce = responce.map(element => {
        return {
            state: element.resultData.state,
            departmentCode: element.resultData.departmentCode
        };
    });

    const allInqiresNotDraft = responce.some(element => element.state == inquiryState.Draft.desc);
    const allInqiresNotDraftExclusionSecurity = responce.filter(element => element.departmentCode != translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', 'security')).some(element => element.state == inquiryState.Draft.desc);
    const triggersCheckExclusionBlockAndUnderwrating = triggersCheckFunction(uwTriggers, responce);

    switch (businessContext.transitionCodeName) {
        case 'Draft_to_Approved':
            checkResult = allInqiresNotDraft || triggersCheckExclusionBlockAndUnderwrating;
            break;
        case 'OnReview_to_Approved':
            checkResult = allInqiresNotDraftExclusionSecurity || triggersCheckExclusionBlockAndUnderwrating;
            break;
        case 'OnUnderwriting_to_Approved':
            checkResult = allInqiresNotDraftExclusionSecurity || triggersCheckExclusionBlockAndUnderwrating;
            break;
        case 'OnReview_to_WaitUnderwriting':
            checkResult = allInqiresNotDraftExclusionSecurity || triggersCheckExclusionBlockAndUnderwrating;
            break;
        default:
            checkResult = allInqiresNotDraft;
            break;
    }

    document.inquiresCheck = checkResult;
};

function triggersCheckFunction(uwTriggers, responce) {
    let triggerResult = false;
    if (uwTriggers.length > 0) {
        const triggers = [...new Set(uwTriggers.map(element => !['block', 'underwriting'].includes(element.departament) ? translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', element.departament) : undefined).filter(item => item != undefined))];
        if (triggers.length > 0) {
            const check = [];
            triggers.forEach(element => {
                check.push(responce.filter(cur => cur.departmentCode == element).some(element => element.state == inquiryState.Issued.desc));
            });
            triggerResult = check.every(element => element != true);
        }
    }
    return triggerResult;
}
