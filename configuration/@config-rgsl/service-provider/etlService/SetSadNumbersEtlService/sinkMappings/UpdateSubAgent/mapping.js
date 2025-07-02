module.exports = function mapping(input) {

    const { body, sadNumber1, sadNumber2, service_provider_code } = input;

    body.sadNumber1 = sadNumber1;
    body.sadNumber2 = sadNumber2;

    return {
        body,
        code: service_provider_code
    };
};
