using System;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.BankStatement
{
    public class PaymentReference
    {
        private string _errorMessage;

        public long BankStatementItemId { get; set; }
        public string ReferenceNo { get; set; }
        public int OrderNo { get; set; }
        public string ErrorCode { get; set; }
        public string ErrorMessage
        {
            get => _errorMessage;
            set {
                if (value == null)
                {
                    _errorMessage = null;
                }
                int maxLength = 512;
                _errorMessage = value.Length > maxLength ? value.Substring(0, maxLength) : value;
            }
        }
        public bool IsError { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
