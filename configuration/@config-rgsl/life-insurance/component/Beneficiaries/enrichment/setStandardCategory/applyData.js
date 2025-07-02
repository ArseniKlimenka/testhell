'use strict';

module.exports = function applyData(input) {

    const body = this.businessContext.rootData;

    if (body.beneficiaries?.beneficiaries?.length > 0) {

        body.beneficiaries.beneficiaries.forEach(item => {
            if (!item.beneficiaryCategory) {
                item.beneficiaryCategory = 'Standard';
            }
            if (!item.description) { // Can't be null in platform (PAS.P_DESCR_BENEFICIARY_SAT)
                item.description = item.relationType;
            }
        });
    }

};
