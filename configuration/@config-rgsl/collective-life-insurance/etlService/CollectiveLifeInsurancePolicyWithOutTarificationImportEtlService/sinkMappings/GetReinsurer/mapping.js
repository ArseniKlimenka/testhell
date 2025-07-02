'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapInput(input) {

    const reinsurerCode = getValue(input, 'data.reinsurerCode');
    if (!reinsurerCode) {

        return null;
    }

    return {
        input: {
            data: {
                criteria: {
                    reinsurerCode
                }
            }
        }
    };
};
