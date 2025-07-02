'use strict';

module.exports = async function onLoadAction(input) {

    await this.view.evaluate(['/tempTechnicalData/inquiries[SetAmendmentInquiries]'], false, true);
};
