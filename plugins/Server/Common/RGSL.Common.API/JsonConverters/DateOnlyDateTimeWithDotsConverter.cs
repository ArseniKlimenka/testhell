using Newtonsoft.Json.Converters;

namespace Adacta.AdInsure.RGSL.Common.API.JsonConverters
{
    public class DateOnlyDateTimeWithDotsConverter : IsoDateTimeConverter
    {
        public DateOnlyDateTimeWithDotsConverter()
        {
            DateTimeFormat = "dd.MM.yyyy";
        }
    }
}
