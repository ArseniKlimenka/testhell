using Adacta.AdInsure.Framework.Core.Common;
using Adacta.AdInsure.Framework.Core.Domain.Activities;
using Adacta.AdInsure.Framework.Core.Domain.Entities.DocumentEntities.DTO;
using Adacta.AdInsure.Framework.Messaging;
using Adacta.AdInsure.RGSL.Common.API.Shared.Requests;
using Adacta.AdInsure.RGSL.Common.API.Shared.Services;
using Newtonsoft.Json;
using System;

namespace Adacta.AdInsure.RGSL.Common.ApplicationServices.Shared.Services
{
    public class ActivityServiceRGSL : IActivityServiceRGSL
    {
        private IActivityDomainService _activityDomainService;

        public ActivityServiceRGSL(IActivityDomainService activityDomainService)
        {
            _activityDomainService = activityDomainService;
        }

        public void CreateActivity(CreateActivityRequest request)
        {
            var parsedMessage = JsonConvert.DeserializeObject<DocumentStateChangedDto>(request.MessageBody.ToString());
            parsedMessage.TransitionEventDate = request.MessageTimestampUtc.ToLocalTime();
            parsedMessage.CorrelationId = new Guid(request.MessageCorrelationId);
            _activityDomainService.CreateStateActivityAndCloseRelatedActivities(parsedMessage);
        }
    }
}
/*
 * CorrelationId = new Guid(messageEnvelope.CorrelationId),
                TransitionEventDate = messageEnvelope.TimestampUtc?.ToLocalTime() ?? DateTime.Now
*/