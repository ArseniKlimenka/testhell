using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI.SmsNotification
{
    [RoutePrefix("api/rgsl/mock-services/sms-notification")]
    public class SmsNotificationMockServiceController : AIApiController
    {
        [AllowAnonymous]
        [Route("simulate")]
        [HttpGet]
        public IActionResult Simulate()
        {
            return Content("ok;0;-1");
        }
    }
}
