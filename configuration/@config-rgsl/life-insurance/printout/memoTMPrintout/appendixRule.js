const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);

    // ТЕЛЕМЕДИЦИНА расширенная
    if (additionalServices.some(item => item.serviceCode == "TMExtended"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoTMExtended.pdf`,
        mode: 'Prepend'
    }); }

    // ТЕЛЕМЕДИЦИНА базовая
    if (additionalServices.some(item => item.serviceCode == "TMBase"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoTMBase.pdf`,
        mode: 'Prepend'
    }); }

    return appendix;

};
