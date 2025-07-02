'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function setAmendmentIssueDate(input, ambientProperties) {

    this.view.startBlockingUI();

    try {

        input.rootContext.Body.amendmentData.nonFinChangeAmendmentData.mainAttributes.amendmentIssueDate = dateUtils.dateNow();
        await this.view.save();
    }
    catch (error) {

        this.view.stopBlockingUI();
        throw error;
    }

    this.view.stopBlockingUI();
};
