'use strict';

module.exports = async function confirmSelectAdditionalServices(input, ambientProperties) {

    const selection = input.getLookupData().selection;
    selection.forEach(x => {
        input.componentContext.push(x);
    });
};
