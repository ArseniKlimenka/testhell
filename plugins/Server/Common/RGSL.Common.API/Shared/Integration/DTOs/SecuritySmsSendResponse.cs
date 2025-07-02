using System;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Integration.DTOs
{
    public class SecuritySmsSendResponse
    {
        public DateTime? SendDate { get; set; }
        public bool IsSent { get; set; }
        public bool IsOnCooldown { get; set; }
        public int? CooldownMinutes { get; set; }
    }
}
