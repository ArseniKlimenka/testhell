namespace Adacta.AdInsure.RGSL.Accounting.Domain.CashFlow.Allocation.Services.Strategy.PaymentOrder.Outgoing
{
    public class PaymentOrderOutgoingAllocationDocument : AllocationDocument
    {
        public string DocumentNo { get; set; }
        public string State { get; set; }
        public bool NonAcceptance { get; set; }
    }
}