'use strict';

const { mapChangeClassByChangeSubtype } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function changeSubtypeOnChange(input, ambientProperties) {

    const changeSubtype = input.context.Body.changeSubtype;
    const changeClass = input.context.Body.changeClass;
    input.context.Body.changeClass = mapChangeClassByChangeSubtype(changeSubtype, changeClass);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
