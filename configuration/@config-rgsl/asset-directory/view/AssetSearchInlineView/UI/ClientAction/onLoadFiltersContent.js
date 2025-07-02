
module.exports = function onLoadFiltersContent(input) {

    this.setSearchRequest({
        data: {
            criteria: {
                dontShowAmendments: true,
            }
        }
    });

    this.setProtectedFields(['dontShowAmendments'], true);
};
