'use strict';

module.exports = function creditProgramResponseMapping(input) {

    let output = [];
    const data = input.response?.data ?? [];

    if (data.length > 0) {

        output = data.map((element) => {

            const version = element.resultData['creditProgramVersion'];
            const versionString = version ? `(${version})` : '';

            return {
                value: {
                    description: element.resultData['creditProgramDescription'],
                    code: element.resultData['creditProgramCode']
                },
                displayName: `${element.resultData['creditProgramDescription']} ${versionString}`
            };
        });
    }

    return output;
};
