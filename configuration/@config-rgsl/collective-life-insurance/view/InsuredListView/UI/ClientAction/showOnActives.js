module.exports = function showOnActives(input, ambientProperties) {

    return ['Active', 'Activated'].includes(input.rootContext.State.Code);
};
