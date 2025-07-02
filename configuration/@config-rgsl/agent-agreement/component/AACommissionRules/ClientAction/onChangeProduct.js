'use strict';

module.exports = function onChangeProduct(input, ambientProperties) {

    input.context.variant = {};
    input.context.variant.values = [];

    this.view.rebind();
};
