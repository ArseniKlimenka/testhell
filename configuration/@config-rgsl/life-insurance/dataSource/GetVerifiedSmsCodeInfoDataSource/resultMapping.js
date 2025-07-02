
module.exports = function resultMapping(input) {

    return {
        referenceNo: input.REFERENCE_NUMBER,
        securityCode: input.SECURITY_CODE,
        notificationDate: input.NOTIFICATION_DATE
    };
};
