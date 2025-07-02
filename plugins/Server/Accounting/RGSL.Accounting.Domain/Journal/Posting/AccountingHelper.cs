using System;
using System.Linq;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Posting
{
    static class AccountingHelper
    {
        public static bool GetPreviousPeriod(PostTransactionJournal journal, DateTime postingDate)
        {
            DateTime? date = journal.Lines.Select(l => l.Attributes.DateToCheckPrevPeriod).Distinct().Single();

            DateTime dateToCheckPrevPeriod = date.HasValue ? date.Value : journal.ProposedPostingDate;
            if (journal.DocumentTypeId == DocumentTypeConstsRGSL.CommissionAct)
            {
                //for commission acts, we compare proposed post date only with current date. And ignore fact that maybe December is still opened period and post date will be in previous year (December)
                return (dateToCheckPrevPeriod.Year < DateTime.Now.Year);
            }
            else
            {
                return (dateToCheckPrevPeriod.Year < postingDate.Year);
            }
        }
    }
}
