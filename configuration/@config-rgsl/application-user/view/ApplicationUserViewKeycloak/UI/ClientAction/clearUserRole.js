module.exports = function clearUserRole(input) {
    const { data } = input;

    data.id = undefined;
    data.codeName = undefined;
};
