using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.AccountingCertificate.Interface
{
	public interface IFnsXMLDomainService
	{
		FnsXMLResponse CreateXml(FnsXMLRequest request);
	}
}
