using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.CashFlow.BankStatement
{
    public class SetRegistryMaskSettingsRequest
    {
        public List<RegistryMaskSettingsItem> Rules { get; set; }
    }

    public class RegistryMaskSettingsItem
    {
        public string AccountNumber { get; set; }
        public string PaymentDescription { get; set; }
    }
}
