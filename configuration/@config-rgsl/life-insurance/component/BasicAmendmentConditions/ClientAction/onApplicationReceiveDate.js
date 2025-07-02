'use strict';

module.exports = function onApplicationReceiveDate(input) {

    const applicationReceiveDate = input.componentContext.applicationReceiveDate;
    const fullPackageReceiveDate = input.componentContext.fullPackageReceiveDate;

    if (applicationReceiveDate && !fullPackageReceiveDate) {

        input.componentContext.fullPackageReceiveDate = applicationReceiveDate;
        this.rebindComponent();
    }
};
