using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Interfaces;
using Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Repositories;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement.Services
{
    public class PaymentReferencesService : IPaymentReferencesService
    {
        static List<string> _regExs = new List<string>
        {
            @"(?<!\d)(\d{5})-(\d{8})(?![\d\/])", //           82800-77000005 ==> 82800-77000005
            @"((\d{5})(-?)(\d{8}))(?=\>)(?!>-)", //           82800-77000005> ==> 82800-77000005
            @"(?<!\d)(\d{2}\/?\d{2}-?\d{6})(?!\d)", //        01/02-123456 ==> 01/02-123456
            @"(?<![\d-])(\d{6})(?![\d-])", //                 123456 ==> 123456
            @"(\D{2}\d{2}-\d{7})(?!\d)", //                   РЖ12-0000001 ==> РЖ12-0000001
            @"(?<!\d)(\d{5}-\d{7})(?!\d)", //                 82800-7700005 ==> 82800-7700005
            @"(?<!\d)(\d{5}-\d{8})\/(\d)(?!\d)", //           82800-77000005/1 ==> 82800-77000005/1
            @"(?<!\d)(\d{4}_\d{8})(?!\d)", //                 2024_00000031 - payment order
        };

        private readonly IPaymentReferencesRepository _paymentReferencesRepository;

        public PaymentReferencesService(IPaymentReferencesRepository paymentReferencesRepository)
        {
            _paymentReferencesRepository = paymentReferencesRepository;
        }

        public List<PaymentReference> GetPaymentReferences(long bankStatementItemId)
        {
            return _paymentReferencesRepository.GetPaymentReferences(bankStatementItemId);
        }

        public List<PaymentReference> GetPaymentReferences(IList<long> bankStatementItemIds)
        {
            return _paymentReferencesRepository.GetPaymentReferences(bankStatementItemIds);
        }

        private static List<string> ParseContractNumbers(string paymentDescription)
        {
            List<string> result = new List<string>();
            if (string.IsNullOrEmpty(paymentDescription))
            {
                return result;
            }

            string desc = paymentDescription;
            string desc2 = paymentDescription;
            List<string> removeSymbols = new List<string> { " ", ".", ",", "№", "_", "\\", "->", ")", "(", "?", "#", "*", "%", "!", "@", "^" };

            foreach (string symbol in removeSymbols)
            {
                desc2 = desc2.Replace(symbol, string.Empty, false, CultureInfo.InvariantCulture);
            }

            foreach (string regEx in _regExs)
            {
                Regex rx = new Regex(regEx, RegexOptions.Compiled);
                MatchCollection matches = rx.Matches(desc);
                if (matches.Count > 0)
                {
                    var r = matches.Select(_ => _.Value).ToList();
                    
                    result.AddRange(r);
                }
                MatchCollection matches2 = rx.Matches(desc2);
                if (matches2.Count > 0)
                {
                    var r = matches2.Select(_ => _.Value).ToList();
                    result.AddRange(r);
                }
            }

            var set = new HashSet<string>(result);
            return set.ToList();
        }

        private List<PaymentReference> UpdatePaymentReferences(List<string> paymentReferences, long bankStatementItemId)
        {
            List<PaymentReference> references = new List<PaymentReference>();

            _paymentReferencesRepository.ClearPaymentReferences(bankStatementItemId);
            if (paymentReferences != null && paymentReferences.Count > 0)
            {
                references = paymentReferences
                    .Distinct()
                    .Select(reference => new PaymentReference
                    {
                        BankStatementItemId = bankStatementItemId,
                        ReferenceNo = reference,
                        LastUpdated = DateTime.Now
                    }).ToList();

                for (int i = 0; i < references.Count; i++)
                {
                    references[i].OrderNo = i;
                }

                _paymentReferencesRepository.InsertPaymentReferences(references);
            }

            return references;
        }

        public List<PaymentReference> ParseAndInsertPaymentReferences(BankStatementItemRGSL bsi)
        {
            List<string> references;

            references = ParseContractNumbers(bsi.PaymentDescription);

            return UpdatePaymentReferences(references, bsi.BankStatementItemId.Value);
        }

        public void UpdatePaymentReferenceMessage(PaymentReference paymentReferences)
        {
            _paymentReferencesRepository.UpdatePaymentReferenceMessage(paymentReferences);
        }
    }
}
