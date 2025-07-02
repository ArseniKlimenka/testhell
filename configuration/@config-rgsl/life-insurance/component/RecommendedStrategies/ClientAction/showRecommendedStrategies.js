'use strict';

module.exports = function showRecommendedStrategies(input, ambientProperties) {

    return input.context?.ClientViewModel?.recommendedStrategies?.length > 0;

};
