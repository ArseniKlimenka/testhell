'use strict';

module.exports = function enableAdditionalInfoItem1(input, ambientProperties) {

    const answer = input.componentContext.questionnaire1?.answer ?? false;

    return answer;
};
