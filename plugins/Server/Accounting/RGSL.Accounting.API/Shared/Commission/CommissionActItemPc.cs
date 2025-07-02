namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Commission
{
    public class CommissionActItemPc
    {
        public long ActId { get; set; }
        public long ActItemId { get; set; }
        public long PayableCommissionId { get; set; }
        public bool Cancelled { get; set; }
    }
}
