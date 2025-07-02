module.exports = function initItemInlineView(input) {

    if (input.context.Number) {

        const request = {
            data: {
                criteria: {
                    documentNo: [input.context.Number],
                    documentNoStr: input.context.Number,
                    groupByRefNo: true,
                    contractNumbers: []
                }
            }
        };

        this.getCurrentView().setSearchRequest(request);
        this.getCurrentView().search();
    }
};
