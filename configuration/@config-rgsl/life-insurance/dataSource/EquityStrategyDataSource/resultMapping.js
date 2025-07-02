module.exports = function resultMapping(input) {

    const output = {};

    output.strategyCode = input.strategy_code;
    output.strategyName = input.strategy_name;
    output.payOffDescription = input.pay_off_description;
    output.pipCategory = input.pip_category;
    output.payOffType = input.pay_off_type;
    output.isin = input.isin;
    output.couponRate = input.couponRate;
    output.repaymentDate = input.repaymentDate;
    output.emitent = input.emitent;

    return output;

};
