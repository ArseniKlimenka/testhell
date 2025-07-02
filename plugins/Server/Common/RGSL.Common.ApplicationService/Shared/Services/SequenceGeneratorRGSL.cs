using Adacta.AdInsure.Framework.Core.Sequence;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class SequenceGeneratorRGSL : ISequenceGeneratorRGSL
    {
        private readonly ISequenceGenerator _service;

        public SequenceGeneratorRGSL(ISequenceGenerator service)
        {
            _service = service;
        }

        public long GetNextNamed(GetNamedSequenceRequest request)
        {
            return _service.GetNextValuesOrInsertNew(request.SequenceName, null);
        }

        public List<SequenceResultDto> GenerateSequenceValues(SequenceGenerationParametersDto parameters)
        {
            return parameters.SequenceParameters.Select(p => GenerateValues(p)).ToList();
        }

        private SequenceResultDto GenerateValues(SequenceParameterDto parameter)
        {
            if (parameter.Count < 1)
            {
                return new SequenceResultDto() { SequenceName = parameter.SequenceName, Ids = new List<long>() };
            }

            var result = new List<long>(parameter.Count);
            var seq = _service.GetNextValuesOrInsertNew(parameter.SequenceName, parameter.SequenceName, startValue: parameter.StartValueOffset);
            result.Add(seq);

            if (parameter.Count > 1)
            {
                var last = _service.GetNextValues(parameter.SequenceName, parameter.Count - 1);

                for (long i = last - parameter.Count + 2; i < last + 1; i++)
                {
                    result.Add(i);
                }
            }

            return new SequenceResultDto() { SequenceName = parameter.SequenceName, Ids = result };
        }
    }
}
