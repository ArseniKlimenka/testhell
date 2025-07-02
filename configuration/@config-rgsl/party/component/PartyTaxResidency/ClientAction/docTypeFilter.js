'use strict';

module.exports = function docTypeFilter(input) {
    return input.items.filter(_ => _.docTypeClass === 'residence');
};
