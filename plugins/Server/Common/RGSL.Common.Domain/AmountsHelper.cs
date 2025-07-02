using System;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Common.Domain
{
    public static class AmountsHelper
    {
        public static decimal[] GetDistribution(decimal[] proportions, decimal amountToDistribute)
        {
            amountToDistribute = RoundCurrency(amountToDistribute);
            if (proportions.Length == 0 && amountToDistribute != 0) throw new ArgumentException("Empty proportion array!");

            decimal totalProportionAmountPos = proportions.Where(_ => _ > 0).Sum(_ => _);
            decimal totalProportionAmountNeg = proportions.Where(_ => _ < 0).Sum(_ => _);

            decimal[] payAmounts = new decimal[proportions.Length];

            if (amountToDistribute == 0)
            {
                return payAmounts;
            }

            if (totalProportionAmountPos == 0 && totalProportionAmountNeg == 0)
            {
                for (int i = 0; i < proportions.Length; i++)
                {
                    proportions[i] = 1;
                }
                if (amountToDistribute > 0) totalProportionAmountPos = proportions.Length;
                if (amountToDistribute < 0) totalProportionAmountNeg = proportions.Length;
            }

            for (int i = 0; i < payAmounts.Length; i++)
            {
                decimal proportion = proportions[i];
                decimal multiplier = proportion / (totalProportionAmountPos + totalProportionAmountNeg);
                decimal payAmount = AmountsHelper.RoundCurrency(amountToDistribute * multiplier);

                if (proportion != 0 & payAmount == 0)
                {
                    payAmount = 0.01m * Math.Sign(proportion);
                }

                payAmounts[i] = payAmount;
            }

            decimal totalPayAmountResult = payAmounts.Sum(_ => _);
            decimal payDiff = amountToDistribute - totalPayAmountResult;

            int cycleCount = 0;
            while (payDiff != 0)
            {
                int maxValueIndex = -1;
                decimal maxValue = decimal.MinValue;
                for (int i = 0; i < payAmounts.Length; i++)
                {
                    decimal value = Math.Abs(payAmounts[i]);
                    if (value > maxValue)
                    {
                        maxValue = value;
                        maxValueIndex = i;
                    }
                }

                decimal corrector = 0.01m * Math.Sign(payDiff);
                payAmounts[maxValueIndex] += corrector;
                payDiff -= corrector;

                if (++cycleCount > 100)
                {
                    throw new InvalidOperationException("Maximum cycle count reached!");
                }
            }

            return payAmounts;
        }

        public static decimal RoundCurrency(decimal amount)
        {
            return Math.Round(amount, 2, MidpointRounding.AwayFromZero);
        }
    }
}
