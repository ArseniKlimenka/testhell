module.exports = function paymentFrequencyResponseMapping(input) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data.map(elem => elem.resultData);
    }

    return output;

};
