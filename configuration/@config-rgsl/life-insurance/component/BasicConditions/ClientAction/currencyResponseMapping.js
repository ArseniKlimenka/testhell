module.exports = function currencyResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data.map(elem => elem.resultData);
    }
    else {
        output.push(input.context.currency);
    }

    return output;

};
