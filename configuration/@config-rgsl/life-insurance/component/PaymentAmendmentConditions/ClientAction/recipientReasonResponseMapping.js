'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');
const { recipientReasons } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function recipientReasonResponseMapping(input) {

    let result = basicCtDropdownResponseMapping(input);
    result = result.filter(item => item.value.code === recipientReasons.heir ||
                                   item.value.code === recipientReasons.heirRepresentative ||
                                   item.value.code === recipientReasons.policyHolderRepresentative ||
                                   item.value.code === recipientReasons.policyHolder);
    return result;
};

