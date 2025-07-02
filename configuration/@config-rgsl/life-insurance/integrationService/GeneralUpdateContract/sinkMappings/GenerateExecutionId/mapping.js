'use strict';

module.exports = function mapping(sinkInput) {

    const message = "Пожалуйста, убедитесь в правильности заполнения полей.";

    switch (sinkInput.modificationType) {
        case "initiator":
            if (!sinkInput.initiator) {
                throw message;
            }
            break;
        case "curator":
            if (!sinkInput.curator) {
                throw message;
            }
            break;
        case "productConfiguration":
            if (!sinkInput.productConfigurationVersion) {
                throw message;
            }
            break;
    }

    return sinkInput;
};
