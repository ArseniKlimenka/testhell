/* eslint no-undef: "off"*/

'use strict';

function collectExceptionsByRow(exceptionsByRow, exceptionMessage) {
    exceptionsByRow.push(exceptionMessage);
}

function parseJSONconfigWrongObject(attribute) {

    return JSON.parse(attribute.replace(/\b\d+\b(?=\:)/g, match => `"${match}"`)); /* eslint-disable-line */
}

function objectToString(input, attributesToString) {

    if (input) {

        Object.keys(input).forEach(key => {

            const attributeName = key;
            const attribute = input[key];

            if (attributesToString.includes(key)) {

                if (attribute) {

                    let jsonAttribute;

                    try {
                        jsonAttribute = JSON.stringify(attribute);
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = jsonAttribute;
                }
            }
        });
    }

    return input;
}

function parseJSONconfig(input, attributesToParse) {

    if (input) {

        Object.keys(input).forEach(key => {

            const attributeName = key;
            const attribute = input[key];

            if (attributesToParse.includes(key)) {

                if (attribute) {

                    let jsonAttribute;

                    try {
                        jsonAttribute = JSON.parse(attribute);
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = jsonAttribute;
                }
            }
        });
    }

}

module.exports = {
    collectExceptionsByRow,
    parseJSONconfig,
    parseJSONconfigWrongObject,
    objectToString
};
