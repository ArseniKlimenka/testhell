const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function appendixRule(input) {

    const appendix = [];

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const barrierAutoCall = getValue(input, 'body.basicInvestmentParameters.barrierAutoCall');

    // заявление на выплату ДИД с приложением
    if (barrierAutoCall) {
        appendix.push({
            name: `InvestmentAppendixImageContainer/img/applicationCouponDID.pdf`,
            mode: 'Append'
        });
        appendix.push({
            name: `InvestmentAppendixImageContainer/img/applicationCouponDIDAnnex.pdf`,
            mode: 'Append'
        });
    }

    // ПФП
    if (additionalServices.some(item => item.serviceCode == "PFP"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoPFP.pdf`,
        mode: 'Append'
    }); }

    // ТЕЛЕМЕДИЦИНА расширенная
    if (additionalServices.some(item => item.serviceCode == "TMExtended"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoTMExtended.pdf`,
        mode: 'Append'
    }); }

    // ТЕЛЕМЕДИЦИНА базовая
    if (additionalServices.some(item => item.serviceCode == "TMBase"))
    { appendix.push({
        name: `CommonAppendixImageContainer/img/memoTMBase.pdf`,
        mode: 'Append'
    }); }

    return appendix;

};
