module.exports = function inquiryUrlMapping(input) {

    return `edit;entity=UniversalDocument;configurationCodeName=EndowmentInquiry;version=1;documentNumber=${input.data.inquiryNumber}`;
};
