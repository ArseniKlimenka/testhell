'use strict';

module.exports = function enableAdditionalInfoItem3(input, ambientProperties) {

    const answer = input.componentContext.questionnaire3?.answer ?? false;

    return answer;
};
