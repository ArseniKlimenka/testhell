using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI.DigitalSignature
{
    [RoutePrefix("api/rgsl/mock-services/digital-signature")]
    public class DigitalSignatureMockServiceController : AIApiController
    {
        [AllowAnonymous]
        [Route("simulate")]
        [HttpPost]
        public IActionResult Simulate()
        {
            var body = Request.Body;
            using var stream = new MemoryStream();
            body.CopyTo(stream);
            var file = stream.ToArray();
            var contentType = Request.ContentType;

            return File(file, contentType);
        }
    }
}
