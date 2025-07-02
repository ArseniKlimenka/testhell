using Adacta.AdInsure.Framework.Core.Sequence;
using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Microsoft.AspNetCore.Mvc;

namespace Adacta.AdInsure.RGSL.Common.WebAPI.Integration
{
    [Route("api/rgsl/common/shared/sequence")]
    public class SequenceController : AIApiController
    {
        private readonly ISequenceGenerator _service;

        public SequenceController(ISequenceGenerator service)
        {
            _service = service;
        }

        [HttpPost, Route("get-next-unique")]
        public long GetNextUnique()
        {
            long nextValue = _service.GetNextValuesOrInsertNew("UNIQUE_NUMBER", null);
            return nextValue;
        }

        [HttpPost, Route("get-next-named")]
        public long GetNextNamed([FromBody] GetNamedSequenceRequest request)
        {
            long nextValue = _service.GetNextValuesOrInsertNew(request.SequenceName, null);
            return nextValue;
        }
    }
}