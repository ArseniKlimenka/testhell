'use strict';

module.exports = function hideAssetPlacementAgreement(input) {

    return input?.context?.WorkUnitActor?.CurrentActor != 'AssetEditor';
};
