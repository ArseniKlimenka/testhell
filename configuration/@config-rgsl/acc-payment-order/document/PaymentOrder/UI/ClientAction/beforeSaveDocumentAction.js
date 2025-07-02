'use strict';

module.exports = function beforeSaveDocumentAction(input, ambientProperties) {

    delete input.context.Body.tempTechnicalData;
};
