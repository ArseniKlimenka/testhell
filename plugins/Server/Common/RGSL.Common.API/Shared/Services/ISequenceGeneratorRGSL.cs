using Adacta.AdInsure.Framework.Core.Domain.Common;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Responses;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Services
{

    public interface ISequenceGeneratorRGSL
    {
        long GetNextNamed(GetNamedSequenceRequest request);
        [IncludeInTransactionWithinDefaultSinkGroupingStrategy]
        List<SequenceResultDto> GenerateSequenceValues(SequenceGenerationParametersDto parameters);
    }
}
