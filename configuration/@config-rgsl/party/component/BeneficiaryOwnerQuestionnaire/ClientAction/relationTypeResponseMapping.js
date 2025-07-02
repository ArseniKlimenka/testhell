module.exports = function relationTypeResponseMapping(input) {
    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData.relationTypeDescription)
            .sort((a, b) =>
                (a == 'Иное') ? 1 :
                    (b == 'Иное') ? -1 :
                        (a > b) ? 1 :
                            (a < b) ? -1 :
                                0);
    }
    else {
        output.push(input.context.relationType);
    }

    return output;
};
