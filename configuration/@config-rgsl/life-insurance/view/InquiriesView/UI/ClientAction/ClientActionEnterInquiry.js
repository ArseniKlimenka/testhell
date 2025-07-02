'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function ClientActionEnterInquiry(input, ambientProperties) {

    const department = input.context?.request?.data?.department;
    const departmentCode = department?.code;
    const textOfInquiry = input.context?.request?.data?.textOfInquiry;

    if (!departmentCode || !textOfInquiry) {
        const notificationMessage = 'Необходимо указать подразделение и текст запроса!';
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
        return;
    }

    const configurationCodeName = input.rootContext?.ConfigurationCodeName;
    const isCollectivePolicy = configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;

    const createInspectionRequest = {
        method: 'post',
        url: `api/core/public/universal-documents/${isCollectivePolicy ? 'LifeInsurancePolicyInquiry' : 'LifeInsuranceInquiry'}/1/`,
        data: {
            data: {
                inquiry: {
                    configurationCodeName: configurationCodeName,
                    department: department,
                    textOfInquiry: textOfInquiry,
                    quoteNumber: input.rootContext.Number,
                    quoteId: input.rootContext.Id,
                    creatorUserName: ambientProperties.applicationContext.currentUser().getUserName(),
                    holder: input.rootContext.Body.policyHolder?.partyData?.partyFullName,
                    insuredPerson: input.rootContext.Body.insuredPerson?.partyData?.partyFullName,
                    uwTriggers: input.rootContext?.Body?.uwTriggers,
                    riskPremium: input.rootContext?.Body?.basicConditions?.riskPremium,
                    currencyDesc: input.rootContext?.Body?.basicConditions?.currency?.currencyDesc
                }
            }
        },
        callContext: {
            workUnitActorCode: ambientProperties.currentWorkUnitActor
        },
        returnFullResponse: true
    };

    const that = this;
    const data = input.context;
    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(createInspectionRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
        this.view.refreshData();
    }

    data.request.data.textOfInquiry = '';
    data.request.data.department = {};
    that.view.rebind();
    that.view.reevaluateRules();
    that.view.validate();
    that.view.search();
};
