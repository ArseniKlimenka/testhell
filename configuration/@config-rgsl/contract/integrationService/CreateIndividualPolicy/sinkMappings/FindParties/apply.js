module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const partyCodes = sinkExchange.resolveContext('partyCodes');
    const partyDataLength = sinkResult.data.length;

    if (partyDataLength === 0 ||
        partyDataLength < partyCodes.length && !partyCodes.every(v => v === partyCodes[0])) {
        this.stopExecution('PartyIsAbsent');
        return;
    }
};
