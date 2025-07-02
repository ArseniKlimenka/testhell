module.exports = async function onChangeCommRateManual(input, ambientProperties) {

    const body = input.context.Body;
    if (body.commRateManual && body.lcBaseAmount) {
        body.lcCommAmountManual = body.lcBaseAmount * body.commRateManual;
    }
    else {
        body.lcCommAmountManual = undefined;
    }
};
