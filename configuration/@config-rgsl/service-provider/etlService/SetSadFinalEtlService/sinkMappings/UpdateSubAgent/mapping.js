module.exports = function mapping(input) {

    const { service_provider_code } = input;
    let { service_provider_body } = input;

    const setSadFinal = function (sp_body) {
        if (sp_body.sadNumber2 && sp_body.sadNumber2 != '') {
            sp_body.sadFinal = sp_body.sadNumber2;
            return sp_body;
        } else if (sp_body.sadNumber1 && sp_body.sadNumber1 != '') {
            sp_body.sadFinal = sp_body.sadNumber1;
            return sp_body;
        } else if (sp_body.level != 'level3') {
            if (sp_body.sadNumberNSO && sp_body.sadNumberNSO != '') {
                sp_body.sadFinal = sp_body.sadNumberNSO;
                return sp_body;
            } else if (sp_body.sadNumberMAG && sp_body.sadNumberMAG != '') {
                sp_body.sadFinal = sp_body.sadNumberMAG;
                return sp_body;
            }
        }

        sp_body.sadFinal = undefined;
        return sp_body;
    };

    service_provider_body = setSadFinal(service_provider_body);

    return {
        body: service_provider_body,
        code: service_provider_code
    };
};

