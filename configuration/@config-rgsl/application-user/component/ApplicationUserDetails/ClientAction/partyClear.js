module.exports = function partyClear(input) {
    const { data } = input;

    delete data.claims.PartyCode;
    delete data.claims.DisplayName;
};
