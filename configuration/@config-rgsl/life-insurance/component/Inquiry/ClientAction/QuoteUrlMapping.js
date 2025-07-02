'use strict';

module.exports = function QuoteUrlMapping (input) {

    return `edit;entity=Contract;configurationCodeName=${input.data.inquiry.configurationCodeName};version=1;documentNumber=${input.data.inquiry.quoteNumber}`;
};
