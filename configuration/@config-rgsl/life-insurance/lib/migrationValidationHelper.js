const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

function skipForMigrated(input) {
    const isMigrated = getValue(input, 'migrationAttributes.isMigrated', false);
    return isMigrated;
}

module.exports = {
    skipForMigrated
};
