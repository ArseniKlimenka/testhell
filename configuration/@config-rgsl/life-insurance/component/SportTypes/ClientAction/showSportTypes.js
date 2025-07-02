
module.exports = function showSportTypes(input, ambientProperties) {

    return input.context.Body.basicConditions.sportTypes?.availableTypes?.length > 0;
};
