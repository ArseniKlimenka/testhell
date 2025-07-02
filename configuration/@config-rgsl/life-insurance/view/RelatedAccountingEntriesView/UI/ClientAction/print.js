'use strict';

module.exports = async function print(input, ambientProperties) {

    const printElementId = this.view.getControlByElementId('printElementId');
    printElementId.disableElement();

    await new Promise(resolve => setTimeout(resolve, 5000));

    printElementId.enableElement();
};
