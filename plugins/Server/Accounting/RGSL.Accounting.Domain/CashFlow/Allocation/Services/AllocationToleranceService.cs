using Adacta.AdInsure.Framework.Core.Exceptions;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services
{
    public class AllocationToleranceService : IAllocationToleranceServiceRGSL
    {
        static List<ToleranceLimit> _limits = new List<ToleranceLimit>
        {
            new ToleranceLimit { currencyCode = "EUR", from = 0   , thresholdPercentage = 2.0m },
            new ToleranceLimit { currencyCode = "EUR", from = 187 , thresholdPercentage = 1.5m },
            new ToleranceLimit { currencyCode = "EUR", from = 375 , thresholdPercentage = 1.0m },
            new ToleranceLimit { currencyCode = "EUR", from = 750 , thresholdPercentage = 0.5m },

            new ToleranceLimit { currencyCode = "USD", from = 0   , thresholdPercentage = 2.0m },
            new ToleranceLimit { currencyCode = "USD", from = 250 , thresholdPercentage = 1.5m },
            new ToleranceLimit { currencyCode = "USD", from = 500 , thresholdPercentage = 1.0m },
            new ToleranceLimit { currencyCode = "USD", from = 750 , thresholdPercentage = 0.5m },

            new ToleranceLimit { currencyCode = "RUB", from = 0    , thresholdPercentage = 2.0m },
            new ToleranceLimit { currencyCode = "RUB", from = 7500 , thresholdPercentage = 1.5m },
            new ToleranceLimit { currencyCode = "RUB", from = 15000, thresholdPercentage = 1.0m },
            new ToleranceLimit { currencyCode = "RUB", from = 30000, thresholdPercentage = 0.5m },
        };

        public ApplyToleranceResult ApplyTolerance(AllocationToleranceType toleranceType, string docCurrencyCode, decimal installmentAmount, decimal installmentOpenAmount, decimal requestedAllocationAmount)
        {
            decimal threshold;
            bool allowOverpayment;
            bool allowUnderpayment;

            switch (toleranceType)
            {
                case AllocationToleranceType.None:
                    threshold = 0m;
                    allowUnderpayment = false;
                    allowOverpayment = false;
                    break;
                case AllocationToleranceType.Standard:
                    threshold = installmentAmount * 0.001m;
                    allowUnderpayment = true;
                    allowOverpayment = true;
                    break;
                case AllocationToleranceType.Extended:
                    threshold = installmentAmount / 100m * GetThresholdPercentage(docCurrencyCode, installmentAmount);
                    allowUnderpayment = true;
                    allowOverpayment = true;
                    break;
                case AllocationToleranceType.ExtendedUnderPayment:
                    threshold = installmentAmount / 100m * GetThresholdPercentage(docCurrencyCode, installmentAmount);
                    allowUnderpayment = true;
                    allowOverpayment = false;
                    break;
                case AllocationToleranceType.ExtendedOverPayment:
                    threshold = installmentAmount / 100m * GetThresholdPercentage(docCurrencyCode, installmentAmount);
                    allowUnderpayment = false;
                    allowOverpayment = true;
                    break;
                default:
                    throw new NotSupportedException($"Tolerance type '{toleranceType}' is not supported!");
            }

            return ApplyTolerance(installmentOpenAmount, requestedAllocationAmount, threshold, allowOverpayment, allowUnderpayment);
        }

        private static decimal GetThresholdPercentage(string docCurrencyCode, decimal installmentAmount)
        {
            var limits = _limits
                .Where(_ => _.currencyCode == docCurrencyCode)
                .Where(_ => _.from < installmentAmount)
                .OrderByDescending(_ => _.from);

            if (!limits.Any())
            {
                throw new BusinessException($"Tolerance limits not found for {docCurrencyCode} with amount {installmentAmount}");
            }

            var limit = limits.First();

            return limit.thresholdPercentage;
        }

        private static ApplyToleranceResult ApplyTolerance(decimal installmentOpenAmount, decimal requestedAllocationAmount, decimal threshold, bool allowOverpayment, bool allowUnderpayment)
        {
            decimal remainingOpenAmount = installmentOpenAmount - requestedAllocationAmount;

            // Overpayment
            if (allowOverpayment && remainingOpenAmount < 0 && Math.Abs(remainingOpenAmount) <= threshold)
            {
                return new ApplyToleranceResult
                {
                    AllocationAmount = requestedAllocationAmount,
                    Tolerance = remainingOpenAmount,
                };
            }

            // Underpayment
            if (allowUnderpayment && remainingOpenAmount > 0 && Math.Abs(remainingOpenAmount) <= threshold)
            {
                return new ApplyToleranceResult
                {
                    AllocationAmount = requestedAllocationAmount,
                    Tolerance = remainingOpenAmount,
                };
            }

            // No tolerance
            return new ApplyToleranceResult
            {
                AllocationAmount = Math.Min(installmentOpenAmount, requestedAllocationAmount),
                Tolerance = 0m,
            };
        }

        struct ToleranceLimit
        {
            public string currencyCode;
            public decimal from;
            public decimal thresholdPercentage;
        }
    }
}
