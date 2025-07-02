'use strict';

module.exports = function enableAdditionalInfoItem2(input, ambientProperties) {

    const answer = input.componentContext.questionnaire2?.answer ?? false;

    return answer;
};
