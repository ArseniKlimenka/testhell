'use strict';

module.exports = function parentCalendarInputMapping() {
    const view = this.getLookup();

    view.setProtectedFields([
        'skipUserCalendars'
    ]);
    view.setSearchRequest({
        data: {
            criteria: {
                skipUserCalendars: true,
            }
        }
    });

    this.setLookupTitle('Поиск календаря');
};
