using System;
using System.Globalization;

namespace Adacta.AdInsure.RGSL.Framework.API.Extensions
{
    public static class DateTimeExtensions
    {
        const string DateFormat = "yyyy-MM-dd";
        const string DateTimeFormat = "yyyy-MM-ddTHH:mm:sszzz";
        const string LocalDateTimeFormat = "yyyy-MM-ddTHH:mm:ss";

        public static string ToDateString(this DateTime? date)
        {
            return ToDateString(date.Value);
        }

        public static string ToDateString(this DateTime date)
        {     
            return date.ToString(DateFormat, CultureInfo.InvariantCulture);
        }

        public static string ToDateTimeString(this DateTime? date)
        {
            return date.Value.ToDateTimeString();
        }

        public static string ToDateTimeString(this DateTime date)
        {
            return date.ToString(DateTimeFormat, CultureInfo.InvariantCulture);
        }

        public static string ToLocalDateTimeString(this DateTime date)
        {
            return date.ToString(LocalDateTimeFormat, CultureInfo.InvariantCulture);
        }

        public static DateTime FromDateString(this string sDate)
        {
            return DateTime.ParseExact(sDate, DateFormat, CultureInfo.InvariantCulture);
        }

        public static bool CheckDateDefault(this DateTime date)
        {
            if (date.Month == 1 && date.Day == 1 && date.Year == 1)
            {
                return true;
            }

            return false;
        }
    }
}
