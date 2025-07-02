'use strict';

module.exports = function clearAgent(input, ambientProperties) {

    const commRules = input.rootContext.Body.commissionRules || [];
    const productRule = commRules.find(rule => rule.insuranceProduct?.values?.length > 0);

    if (productRule) {

        ambientProperties.services.confirmationDialog
            .showConfirmation('Невозможно удалить агента. Найдены правила вознаграждения со ссылкой на продукты.', 'OK', 'OK', 2);
        return;
    }

    const agent = input.componentContext.agent;

    if (agent) {

        delete input.componentContext.agent;
    }

    this.view.getControlByElementId("agentBankAccountId")?.clear();
    this.view.rebind();
};
