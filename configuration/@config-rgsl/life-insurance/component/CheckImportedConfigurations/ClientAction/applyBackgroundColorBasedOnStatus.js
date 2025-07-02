'use strict';

module.exports = function applyBackgroundColorBasedOnStatus(input) {

    const importedConfigs = input.context?.Body?.importedConfigs ?? {};

    if (importedConfigs.status === "Success") {
        return "Success";
    } else if (importedConfigs.status === "Warning") {
        return "Warning";
    } else if (importedConfigs.status === "Danger") {
        return "Danger";
    }
    return undefined;

};
