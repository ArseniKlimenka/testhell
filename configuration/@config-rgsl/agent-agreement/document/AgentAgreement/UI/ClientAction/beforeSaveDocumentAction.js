'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { updateEmptyInsuranceYearTo } = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');
const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');
const { callDataSource } = require('@config-rgsl/infrastructure/lib/CommonUtils');

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    const currentExternalNumber = input.context.Body.mainAttributes?.externalDocumentNumber;
    const currentManualNumber = input.context.Body.mainAttributes?.manualDocumentNumber;
    const conclusionDate = input.context.Body.validity?.conclusionDate;
    const agency = input.context.Body.mainAttributes?.agency;

    if (currentExternalNumber) {

        const number = input.context.Number;
        let aaExternalNumbers = await getAgentAgreementsByExternalNumber(currentExternalNumber, ambientProperties, this) || [];

        if (number) {

            aaExternalNumbers = aaExternalNumbers.filter(item => item !== number);
        }

        if (aaExternalNumbers.length > 0) {

            const message = `Невозможно сохранить документ. Найдены дубликаты по внешнему номеру! ${aaExternalNumbers.join(', ')}`;
            ambientProperties.services.confirmationDialog.showConfirmation(message, 'OK', 'OK', 2);
            this.view.stopBlockingUI();
            return false;
        }
    }

    if (currentManualNumber) {

        const number = input.context.Number;
        let aaManualNumbers = await getAgentAgreementsByManualNumber(currentManualNumber, ambientProperties, this) || [];

        if (number) {

            aaManualNumbers = aaManualNumbers.filter(item => item !== number);
        }

        if (aaManualNumbers.length > 0) {

            const message = `Невозможно сохранить документ. Найдены дубликаты по внутреннему номеру! ${aaManualNumbers.join(', ')}`;
            ambientProperties.services.confirmationDialog.showConfirmation(message, 'OK', 'OK', 2);
            this.view.stopBlockingUI();
            return false;
        }
    }

    if (conclusionDate && agency) {

        const isAgencyValid = await checkAgencyByConclusionDate(agency, conclusionDate, ambientProperties);

        if (!isAgencyValid) {

            const message = `Агентство не доступно для выбора.`;
            ambientProperties.services.confirmationDialog.showError(message, "OK", "Cancel", 1);
            this.view.stopBlockingUI();
            return false;
        }
    }

    await evaluateAgentAgreement(input, ambientProperties, this);

    updateEmptyInsuranceYearTo(input);

    this.view.stopBlockingUI();
};

async function evaluateAgentAgreement(input, ambientProperties, self) {

    try {
        await self.view.evaluate([
            '/**'
        ], false, true);

    } catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }
}

async function getAgentAgreementsByExternalNumber(currentExternalNumber, ambientProperties, self) {

    const aaRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AADocumentSearchDataSource',
        data: {
            data: {
                criteria: {
                    externalNumber: currentExternalNumber,
                    onlyNotCancelled: true
                }
            }
        }
    };

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(aaRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    const aaNumbers = result.data.map(_ => _.resultData.documentCode);
    return aaNumbers;
}

async function getAgentAgreementsByManualNumber(currentManualNumber, ambientProperties, self) {

    const aaRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/AADocumentSearchDataSource',
        data: {
            data: {
                criteria: {
                    manualNumber: currentManualNumber,
                    onlyNotCancelled: true
                }
            }
        }
    };

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(aaRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }

    const aaNumbers = result.data.map(_ => _.resultData.documentCode);
    return aaNumbers;
}

async function checkAgencyByConclusionDate(agency, conclusionDate, ambientProperties) {
    const request = basicCtDropdownRequestMapping(agency);
    request.data.criteria.effectiveDate = conclusionDate;
    const response = await callDataSource(ambientProperties, 'AgencyInfoDataSource', request);
    return response.data.length > 0;
}
