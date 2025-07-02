'use strict';

module.exports = function mapping(input, sinkExchange) {

    const affectedContracts = sinkExchange.resolveContext('affectedContracts');

    if (affectedContracts) {
        const result = affectedContracts.filter(_ => _.newPostedUntilPostingDate).map(_ => ({
            contractNumbers: [_.contractNumber],
            newRevaluationDate: _.newPostedUntilPostingDate,
            postingDescription: 'Policy reactivated',
        }));
        return result;
    }

    return [];
};
