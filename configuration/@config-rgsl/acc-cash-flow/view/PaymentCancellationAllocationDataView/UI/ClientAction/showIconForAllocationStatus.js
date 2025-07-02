'use-strict';

/**
 * @translationKey {translationKey} AllocationCancelledIconTitle
 * @translationKey {translationKey} AllocationNotCancelledIconTitle
 */

module.exports = function showIconForAllocationStatus(input, ambientProperties) {

    if (input.data.cancelled) {
        return {
            name: 'Check',
            size: 'Large',
            color: 'Success',
            tooltip: {
                title: `${ambientProperties.configurationCodeName.toUpperCase()}.AllocationCancelledIconTitle`
            }
        };
    }

    return {
        name: 'Exclamation',
        size: 'Large',
        color: 'Danger',
        tooltip: {
            title: `${ambientProperties.configurationCodeName.toUpperCase()}.AllocationNotCancelledIconTitle`
        }
    };
};
