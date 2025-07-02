'use strict';

const { LocalDate } = require('@js-joda/core');
const currentDate = LocalDate.now().toString();
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { updateClientViewModel, states } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function AccountingCertificateOnLoad(input, ambientProperties) {

    const loaderId = this.view.startPriorityBlockingUI();
    try {
        const state = input.context.State.Code;

        if (input.context.Number && state === states.Draft) {
            const FundLoadHandler = (message) => {
                if (message.eventType === 'StatusChanged') {
                    this.unsubscribeFromEventsFromCurrentEntity('accCertificateHandler');
                    this.view.reloadEntity();
                }
            };

            this.subscribeToEventsFromCurrentEntity({
                handler: {
                    name: 'accCertificateHandler',
                    func: FundLoadHandler
                }
            });
        }

        const documentStateCode = input.context.State?.Code;
        const certificateIssueDate = input.context.Body.issueData.certificateIssueDate;

        if (documentStateCode == states.Draft) {
            if (certificateIssueDate != currentDate) {
                const certificateIssueDateCalendar = dateUtils.formatDate(certificateIssueDate, dateUtils.DateFormats.CALENDAR) ?? 'Не указана';
                const currentDateCalendar = dateUtils.formatDate(currentDate, dateUtils.DateFormats.CALENDAR);
                ambientProperties.services.confirmationDialog.showConfirmation(`Дата выдачи справки ${certificateIssueDateCalendar} обновлена на текущую дату ${currentDateCalendar}`, 'OK', 'OK', 2);
                input.context.Body.issueData.certificateIssueDate = currentDate;
                this.view.rebind();
            }
        }

        await updateClientViewModel(input, this.view);
    }
    finally {
        this.view.stopPriorityBlockingUI(loaderId);
    }
};
