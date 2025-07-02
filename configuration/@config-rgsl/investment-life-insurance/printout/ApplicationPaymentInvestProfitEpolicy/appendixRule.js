module.exports = function appendixRule(input) {

    const appendix = [];

    // заявление на выплату ДИД
    appendix.push({
        name: `InvestmentAppendixImageContainer/img/applicationCouponDID.pdf`,
        mode: 'Prepend'
    });

    return appendix;

};
