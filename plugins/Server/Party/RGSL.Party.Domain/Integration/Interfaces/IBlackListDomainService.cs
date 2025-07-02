using System;
using Microsoft.Extensions.Logging;
using Adacta.AdInsure.RGSL.Common.Domain.Integration.Settings;

namespace Adacta.AdInsure.RGSL.Party.Domain.Integration.Interfaces
{
    public interface IBlackListDomainService
    {
        string CallBlackListDomainService(
            string request
        );
    }
}
