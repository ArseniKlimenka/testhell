module.exports = function mapping(input, dataSourceResponse) {

    const resultData = dataSourceResponse.data[0]?.resultData;
    const partnerCode = resultData?.partnerCode;
    const partnerDescription = resultData?.partnerDescription;
    const partnerShortDescription = resultData?.partnerShortDescription;
    const partnerBusinessCode = resultData?.partnerBusinessCode;

    input.partner = {
        partnerCode,
        partnerDescription,
        partnerShortDescription,
        partnerBusinessCode,
    };

};
