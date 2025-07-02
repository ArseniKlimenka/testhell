module.exports = function initHistoryInlineView(input) {

    const actNo = input.context.Number;

    if (actNo) {
        this.getCurrentView().setSearchRequest({
            data: {
                criteria: {
                    actNo,
                }
            }
        });
        this.getCurrentView().setProtectedFields(['actNo']);
        this.getCurrentView().search();
    }
};
