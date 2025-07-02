"use strict";

const { assetActors } = require('@config-rgsl/asset-directory/lib/assetHelper');

module.exports = function enableAttachments(input) {
    if (
        input?.context?.WorkUnitActor?.CurrentActor !==
            assetActors.AssetEditor ||
        !input.context.IsSaved || !input?.context?.Body?.entityCode
    ) {
        return false;
    }

    return true;
};
