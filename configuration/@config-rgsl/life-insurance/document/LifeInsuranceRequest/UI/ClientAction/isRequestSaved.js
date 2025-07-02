'use strict';

module.exports = function isRequestSaved(input, ambientProperties) {

    return input.context.IsSaved && input.context.Body.typeOfRequest;

};
