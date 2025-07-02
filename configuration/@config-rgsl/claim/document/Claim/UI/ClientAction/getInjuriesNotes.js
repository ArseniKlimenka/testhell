'use strict';

module.exports = function getInjuriesNotes(input) {

    return input.context.Body.tempTechnicalData?.injuriesNotes ?? [];
};
