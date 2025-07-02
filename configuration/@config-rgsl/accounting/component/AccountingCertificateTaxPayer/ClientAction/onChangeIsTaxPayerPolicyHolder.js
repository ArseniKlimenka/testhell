'use strict';

module.exports = async function onChangeIsTaxPayerPolicyHolder(input, ambientProperties) {

    const isTaxPayerPolicyHolder = input.componentContext.isTaxPayerPolicyHolder;
    Object.keys(input.componentContext).forEach(key => delete input.componentContext[key]);
    input.componentContext.isTaxPayerPolicyHolder = isTaxPayerPolicyHolder;

    this.view.save();
};
