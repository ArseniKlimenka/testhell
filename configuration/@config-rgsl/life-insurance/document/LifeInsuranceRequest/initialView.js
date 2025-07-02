'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { documentActors } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const setReceiveMethodForActors = [documentActors.Agent];
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapDetailsGetInitViewModel(input, ambientProperties) {

    if (input.Body) {

        const createdFromPolicy = input.Body.technicalInformation?.createdFromPolicy;

        if (!input.Number || createdFromPolicy) {

            if (!input.Body.registrationDate) {
                input.Body.registrationDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
            }

            if (!input.Body.issueDate) {
                input.Body.issueDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
            }

            if (!input.Body.receiveMethod) {
                const currentWorkUnitActor = input.WorkUnitActor?.CurrentActor;
                if (setReceiveMethodForActors.includes(currentWorkUnitActor)) {
                    input.Body.receiveMethod = amendmentConstants.receiveMethod.partner;
                }
            }

            if (!input.Body.attachmentsPackage) {
                input.Body.attachmentsPackage = [];
            }

        }

    }

    return input;

};
