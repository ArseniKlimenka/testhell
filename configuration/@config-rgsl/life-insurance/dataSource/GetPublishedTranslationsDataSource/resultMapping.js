'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    const translationsBody = JSON.parse(input.BODY);
    const subString = this.businessContext.data.criteria.subString;
    const subStringArr = this.businessContext.data.criteria.subStringArr;

    if (subString && translationsBody[subString]) {


        output.translationSubString = translationsBody[subString];
        return output;

    } else if (subStringArr && subStringArr.length > 0) {

        const translationSubStringEl = subStringArr.map(subStringArrEl => {
            if (translationsBody[subStringArrEl]) {
                return { [subStringArrEl]: translationsBody[subStringArrEl] };
            }
        }).filter(i => i);

        if (translationSubStringEl && translationSubStringEl.length > 0) {
            output.translationSubStringEl = translationSubStringEl[0];
            return output;
        }

    } else if (!subString && !subStringArr) {

        output.translationBody = translationsBody;
        return output;

    } else {
        return null;
    }

};
