module.exports = function enableGroupByContract(input) {
    const body = input.rootContext.Body;
    return (body.actId || input.rootContext.Number);
};
