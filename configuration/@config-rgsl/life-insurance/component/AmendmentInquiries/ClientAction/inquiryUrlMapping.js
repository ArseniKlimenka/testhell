module.exports = function inquiryUrlMapping(input) {

    return `edit;entity=UniversalDocument;configurationCodeName=CancellationInquiry;version=1;documentNumber=${input.data.inquiryNumber}`;
};
