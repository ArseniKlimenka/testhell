"use strict";

module.exports = function partyEmailsAfterGridAction(input, ambientProperties) {

    if (input.data.partyEmails?.length > 0 && input.data.partyEmailsAdditionalInfo?.noEmail) {
        input.data.partyEmailsAdditionalInfo.noEmail = false;
    }

};
