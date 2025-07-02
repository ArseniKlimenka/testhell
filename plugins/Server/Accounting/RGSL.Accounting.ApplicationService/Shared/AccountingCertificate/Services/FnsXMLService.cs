using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests;
using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Services;
using Adacta.AdInsure.RGSL.Accounting.Domain.AccountingCertificate.Interface;

namespace Adacta.AdInsure.RGSL.Accounting.ApplicationServices.Shared.AccountingCertificate.Services
{
	public class FnsXMLService : IFnsXMLService
	{
		private readonly IFnsXMLDomainService _domainService;

		public FnsXMLService(IFnsXMLDomainService domainService)
		{
			_domainService = domainService;
		}

		public FnsXMLResponse CreateXml(FnsXMLRequest request)
		{
			var xmlResponse = _domainService.CreateXml(request);

			return xmlResponse;
		}
	}
}
