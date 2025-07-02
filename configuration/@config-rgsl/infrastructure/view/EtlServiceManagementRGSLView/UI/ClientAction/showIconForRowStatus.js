/**
 * @translationKey {translationKey} CompletedWarningIconTitle
 * @translationKey {translationKey} CompletedIconTitle
 * @translationKey {translationKey} CanceledWarningIconTitle
 * @translationKey {translationKey} CanceledIconTitle
 * @translationKey {translationKey} ProcessingWarningIconTitle
 * @translationKey {translationKey} ProcessingIconTitle
 * @translationKey {translationKey} FailedIconTitle
 * @translationKey {translationKey} RequestedIconTitle
 */

module.exports = function showIconForRowStatus(input, ambientProperties) {
    const rowData = input.data;

    if (rowData.state === 'Completed' && rowData.lastError?.length > 0) {
        return {
            'name': 'check',
            'size': 'Large',
            'color': 'Warning',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.CompletedWarningIconTitle`
            }
        };
    }
    else if (rowData.state === 'Completed') {
        return {
            'name': 'check',
            'size': 'Large',
            'color': 'Success',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.CompletedIconTitle`
            }
        };
    }
    else if (rowData.state === 'Canceled' && rowData.lastError?.length > 0) {
        return {
            'name': 'trash',
            'size': 'Large',
            'color': 'Warning',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.CanceledWarningIconTitle`
            }
        };
    }
    else if (rowData.state === 'Canceled') {
        return {
            'name': 'trash',
            'size': 'Large',
            'color': 'Success',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.CanceledIconTitle`
            }
        };
    }
    else if (rowData.state === 'Processing' && rowData.lastError?.length > 0) {
        return {
            'name': 'pencil',
            'size': 'Large',
            'color': 'Warning',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.ProcessingWarningIconTitle`
            }
        };
    }
    else if (rowData.state === 'Processing') {
        return {
            'name': 'pencil',
            'size': 'Large',
            'color': 'Primary',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.ProcessingIconTitle`
            }
        };
    }
    else if (rowData.state === 'Requested') {
        return {
            'name': 'calendar',
            'size': 'Large',
            'color': 'Primary',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.RequestedIconTitle`
            }
        };
    }
    else if (rowData.state === 'Failed') {
        return {
            'name': 'circle-exclamation',
            'size': 'Large',
            'color': 'Danger',
            'tooltip': {
                'title': `${ambientProperties.configurationCodeName.toUpperCase()}.FailedIconTitle`
            }
        };
    }

    return {
        'name': 'circle-question',
        'size': 'Large'
    };
};
