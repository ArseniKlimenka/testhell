using Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.AccountingCertificate.Services
{
	public interface IFnsXMLService
	{
		FnsXMLResponse CreateXml(FnsXMLRequest request);
	}
}
