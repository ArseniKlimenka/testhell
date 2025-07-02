'use strict';

module.exports = async function onLoadAaExternalNumberSearchView(input, ambientProperties) {
    const lookup = this.getLookup();

    lookup.setSearchRequest({
        data: {
            criteria: {
            }
        }
    });

};
