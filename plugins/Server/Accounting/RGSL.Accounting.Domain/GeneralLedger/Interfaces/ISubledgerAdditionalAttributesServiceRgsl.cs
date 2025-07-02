using Adacta.AdInsure.Accounting.Domain.GeneralLedger;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.Subledger.Requests;
using Adacta.AdInsure.RGSL.Accounting.Domain.Journal.Attributes;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger.Interfaces
{
    public interface ISubledgerAdditionalAttributesServiceRgsl
    {
        GLAdditionalAttrsRgsl CreateGLAdditionalAttributes(JRAdditionalAttrsRgsl rgslAttrs, PostTransactionJournal journal, bool isDebit, SubledgerEntry entry);
        GLAdditionalAttrsRgsl FilterLedgerAdditionalAttributesRgsl(GLAdditionalAttrsRgsl ledgerAttrs, long? attributeSetId);
    }
}
