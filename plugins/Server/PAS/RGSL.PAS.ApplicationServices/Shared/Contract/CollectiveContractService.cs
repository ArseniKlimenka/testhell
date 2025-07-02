using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.DTO;
using Adacta.AdInsure.RGSL.PAS.API.Shared.Contract.Services;
using Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Contract.Converters;
using Adacta.AdInsure.RGSL.PAS.Domain.Contract.Interfaces;

namespace Adacta.AdInsure.RGSL.PAS.ApplicationServices.Shared.Contract
{
    public class CollectiveContractService : ICollectiveContractService
    {
        private readonly ICollectiveContractDomainService _service;

        public CollectiveContractService(ICollectiveContractDomainService service)
        {
            _service = service;
        }

        public void ClearInsuredList(ClearInsuredListRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            _service.ClearInsuredList(domainRequest);
        }

        public long WriteInsured(WriteInsuredRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            var id =_service.WriteInsured(domainRequest);

            return id;
        }

        public void ClearRiskList(ClearRiskListRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            _service.ClearRiskList(domainRequest);
        }

        public void WriteRisk(WriteRiskRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            _service.WriteRisk(domainRequest);
        }

        public void SetInsuredCalculatedData(WriteInsuredRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            _service.SetInsuredCalculatedData(domainRequest);
        }

        public void SetInsuredPartyCode(WriteInsuredRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            _service.SetInsuredPartyCode(domainRequest);
        }

        public void ClearRiskExpList(ClearRiskExpListRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            _service.ClearRiskExpList(domainRequest);
        }

        public void WriteRiskExp(WriteRiskExpRequest request)
        {
            var domainRequest = CollectiveContractConverter.Convert(request);
            _service.WriteRiskExp(domainRequest);
        }

        public void WriteTestLog(string comment)
        {
            _service.WriteTestLog(comment);
        }
    }
}
