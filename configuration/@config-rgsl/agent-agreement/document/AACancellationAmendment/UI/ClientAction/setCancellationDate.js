'use strict';

module.exports = function setCancellationDate(input) {

    input.rootContext.Body.amendmentData.cancellationAmendmentData.cancellationDate = input.rootContext.Body.validity.cancellationDate;
    input.rootContext.Body.validity.endDate = input.rootContext.Body.validity.cancellationDate;
};
