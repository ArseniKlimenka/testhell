const { commissionActItemStatusId } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function applyBackgroundColor(input) {

    const statusId = input.affectedRow.resultData.statusId;

    switch (statusId) {
        case commissionActItemStatusId.NEW:
        case commissionActItemStatusId.RENEW:
            return 'Success';
        case commissionActItemStatusId.REMOVED:
            return 'Danger';
        default:
            return 'BackgroundColor';
    }
};
