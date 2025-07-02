using Adacta.AdInsure.Accounting.API.Shared.Constants;
using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Periods;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Repositories;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Periods.Services
{
    public class AccountingPeriodServiceRgsl : IAccountingPeriodServiceRgsl
    {
        private readonly ITranslationServiceRGSL _translationServiceRGSL;
        private readonly IAccountingPeriodRepositoryRgsl _repository;

        public AccountingPeriodServiceRgsl(
            ITranslationServiceRGSL translationServiceRGSL,
            IAccountingPeriodRepositoryRgsl repository)
        {
            _repository = repository;
            _translationServiceRGSL = translationServiceRGSL;
        }

        public void ClosePeriod(AccountingPeriodAppRequest request)
        {
            ValidateClose(request.PeriodIds);

            foreach (var periodId in request.PeriodIds)
            {
                _repository.SetStatus(new SetPeriodStatusRequest
                {
                    PeriodId = periodId,
                    NewStatus = PeriodStatusConsts.Closed,
                });

                _repository.InsertPeriodHistory(new PeriodHistory
                {
                    PeriodId = periodId,
                    PeriodStatusIdTo = PeriodStatusConsts.Closed,
                });
            }
        }

        public void ReopenPeriod(AccountingPeriodAppRequest request)
        {
            ValidateOpen(request.PeriodIds);

            foreach (var periodId in request.PeriodIds)
            {
                _repository.SetStatus(new SetPeriodStatusRequest
                {
                    PeriodId = periodId,
                    NewStatus = PeriodStatusConsts.Open,
                });

                _repository.InsertPeriodHistory(new PeriodHistory
                {
                    PeriodId = periodId,
                    PeriodStatusIdTo = PeriodStatusConsts.Open,
                });
            }
        }

        public DeterminedPeriodResult DeterminePostingDate(DateTime? postingDate, DateTime proposedPostingDate, PeriodTypeIds periodTypeId)
        {
            postingDate ??= proposedPostingDate;

            var period = _repository.Fetch(postingDate.Value, periodTypeId);
            if (period == null)
            {
                period = _repository.Fetch(null, periodTypeId);
            }

            if (period.StartDate > postingDate.Value)
            {
                postingDate = period.StartDate;
            }

            var result = new DeterminedPeriodResult
            {
                Period = period,
                PostingDate = postingDate.Value,
            };

            return result;
        }

        private void ValidateClose(List<long> periodIds)
        {
            var period = _repository.GetPeriodHasOpenedBefore(periodIds);
            if (period != null)
            {
                throw new BusinessException(_translationServiceRGSL.Translate(
                    "ACC_PERIOD_EXISTS_OPENED_BEFORE",
                    period.StartDate.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture),
                    period.EndDate.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture)));
            }
        }

        private void ValidateOpen(List<long> periodIds)
        {
            var period = _repository.GetPeriodHasClosedAfter(periodIds);
            if (period != null)
            {
                throw new BusinessException(_translationServiceRGSL.Translate(
                    "ACC_PERIOD_EXISTS_CLOSED_AFTER",
                    period.StartDate.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture),
                    period.EndDate.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture)));
            }
        }

    }
}
