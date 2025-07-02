using System;

namespace Adacta.AdInsure.RGSL.Party.API.Services
{
    public interface IDadataSettings
    {
        bool EnableDadataService { get; }
        Uri Uri { get; }
        string Token { get; }
    }
}