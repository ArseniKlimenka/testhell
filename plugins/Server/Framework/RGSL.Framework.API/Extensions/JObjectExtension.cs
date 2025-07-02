using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Framework.API.Extensions
{
    public static class JObjectExtension
    {
        private static T GetDefault<T>(string path, T res, bool mandatory, T defaultValue, Func<T, bool> checkNull)
        {
            if (mandatory && checkNull(res))
            {
                res = !checkNull(defaultValue) ? defaultValue : throw new Exception($"Mandatory attribute {path} isn't defined or empty");
            }

            return res;
        }

        public static string GetString(this JObject jObject, string path, bool mandatory = false, string defaultValue = null)
        {
            var res = jObject.SelectTokenSafe(path)?.ToString();
            return res ?? GetDefault(path, res, mandatory, defaultValue, (a) => String.IsNullOrEmpty(a));
        }

        /// <summary>
        /// Returns meaningful value, otherwise throws exception.
        /// </summary>
        /// <param name="jObject"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string GetStringOrThrow(this JObject jObject, string path)
        {
            var value = GetStringOrNull(jObject, path);

            if (value == null)
                throw new Exception($"Mandatory value of JSON object property '{path}' is not defined.");

            return value;
        }

        /// <summary>
        /// Returns meaningful value, otherwise null.
        /// </summary>
        /// <param name="jObject"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string GetStringOrNull(this JObject jObject, string path)
        {
            var value = jObject.SelectTokenSafe(path)?.ToString().Trim();

            if (string.IsNullOrWhiteSpace(value))
                return null;

            return value;
        }

        public static DateTime? GetDateTimeOrNull(this JObject jObject, string path)
        {
            return jObject.SelectTokenSafe(path)?.Value<DateTime?>();
        }

        public static DateTime? GetDateTime(this JObject jObject, string path, bool mandatory = false, DateTime? defaultValue = null)
        {
            var res = jObject.SelectTokenSafe(path)?.Value<DateTime?>();
            return res ?? GetDefault(path, res, mandatory, defaultValue, (a) => a == null);
        }

        public static DateTime GetDateTime(this JObject jObject, string path, DateTime defaultValue)
        {
            return GetDateTime(jObject, path, true, defaultValue).GetValueOrDefault();
        }

        public static DateTime GetDateTime(this JObject jObject, string path)
        {
            return GetDateTime(jObject, path, true, null).GetValueOrDefault();
        }

        public static DateTime? GetDateTimeFromString(this JObject jObject, string path, bool mandatory = false, DateTime? defaultValue = null)
        {
            string sDefaultValue = defaultValue.HasValue ? defaultValue.ToDateString() : null;
            string sDate = GetString(jObject, path, mandatory, sDefaultValue);

            DateTime? date = null;
            if (!String.IsNullOrEmpty(sDate))
            {
                date = sDate.FromDateString();
            }
            return date;
        }

        public static DateTime GetDateTimeFromString(this JObject jObject, string path, DateTime defaultValue)
        {
            return GetDateTimeFromString(jObject, path, true, defaultValue).GetValueOrDefault();
        }

        public static DateTime GetDateTimeFromString(this JObject jObject, string path)
        {
            return GetDateTimeFromString(jObject, path, true, null).GetValueOrDefault();
        }

        public static int? GetInt(this JObject jObject, string path, bool mandatory = false, int? defaultValue = null)
        {
            var res = jObject.SelectTokenSafe(path)?.Value<int?>();
            return res ?? GetDefault(path, res, mandatory, defaultValue, (a) => a == null);
        }

        public static int GetInt(this JObject jObject, string path, int defaultValue)
        {
            return GetInt(jObject, path, true, defaultValue).GetValueOrDefault();
        }

        public static int GetInt(this JObject jObject, string path)
        {
            return GetInt(jObject, path, true, null).GetValueOrDefault();
        }

        public static decimal? GetDecimal(this JObject jObject, string path, bool mandatory = false, decimal? defaultValue = null)
        {
            var res = jObject.SelectTokenSafe(path)?.Value<decimal?>();
            return res ?? GetDefault(path, res, mandatory, defaultValue, (a) => a == null);
        }

        public static decimal GetDecimal(this JObject jObject, string path, decimal defaultValue)
        {
            return GetDecimal(jObject, path, true, defaultValue).GetValueOrDefault();
        }

        public static decimal GetDecimal(this JObject jObject, string path)
        {
            return GetDecimal(jObject, path, true, null).GetValueOrDefault();
        }

        /// <summary>
        /// Returns meaningful value, otherwise default value (0).
        /// </summary>
        /// <param name="jObject"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public static decimal GetDecimalOrDefault(this JObject jObject, string path)
        {
            return GetDecimal(jObject, path, false, null).GetValueOrDefault();
        }

        public static Guid? GetGuid(this JObject jObject, string path, bool mandatory = false, Guid? defaultValue = null)
        {
            var str = jObject.SelectTokenSafe(path)?.Value<string>();
            Guid? guid = string.IsNullOrEmpty(str) ? (Guid?) null : Guid.Parse(str);
            return guid ?? GetDefault(path, guid, mandatory, defaultValue, (a) => a == null);
        }

        public static Guid GetGuid(this JObject jObject, string path, Guid defaultValue)
        {
            return GetGuid(jObject, path, true, defaultValue).GetValueOrDefault();
        }

        public static Guid GetGuid(this JObject jObject, string path)
        {
            return GetGuid(jObject, path, true, null).GetValueOrDefault();
        }

        public static bool? GetBool(this JObject jObject, string path, bool mandatory = false, bool? defaultValue = null)
        {
            var res = jObject.SelectTokenSafe(path)?.Value<bool?>();
            return res ?? GetDefault(path, res, mandatory, defaultValue, (a) => a == null);
        }

        public static bool GetBool(this JObject jObject, string path, bool defaultValue)
        {
            return GetBool(jObject, path, true, defaultValue).GetValueOrDefault();
        }

        public static JObject GetJObject(this JObject jObject, string path, bool mandatory = false)
        {
            var res = jObject.SelectTokenSafe(path) as JObject;

            if (mandatory && res == null)
                throw new Exception($"Mandatory attribute {path} isn't defined or empty");

            return res;
        }

        private static JArray GetJArray(this JObject jObject, string path, bool mandatory = false, bool populated = false)
        {
            var arr = jObject.SelectTokenSafe(path) as JArray;

            if (mandatory && arr == null)
                throw new Exception($"Array attribute {path} isn't defined or empty");

            if (mandatory && populated && !arr.Any())
                throw new Exception($"Array attribute {path} must have at least one item");

            return arr;
        }

        public static IEnumerable<JObject> GetArray(this JObject jObject, string path, bool mandatory = false, bool populated = false)
        {
            var arr = jObject.GetJArray(path, mandatory, populated);
            var res = arr != null ? arr.Cast<JObject>() : Enumerable.Empty<JObject>();

            return res;
        }

        public static IEnumerable<string> GetArrayStrings(this JObject jObject, string path, bool mandatory = false, bool populated = false)
        {
            var arr = jObject.GetJArray(path, mandatory, populated);
            return arr != null ? arr.Select(i => (string) i) : Enumerable.Empty<string>();
        }

        public static JObject ToJObject(this object o)
        {
            var serializer = new JsonSerializer
            {
                NullValueHandling = NullValueHandling.Ignore
            };

            return JObject.FromObject(o, serializer);
        }

        public static JToken SelectTokenSafe(this JObject jObject, string path)
        {
            return jObject.SelectToken(path, errorWhenNoMatch: false);
        }

        public static JObject ParsedJsonToJObject(this JObject parsedJson)
        {
            return JObject.Parse(parsedJson.ToString());
        }

        public static JArray ToJArray(this object o)
        {
            var serializer = new JsonSerializer
            {
                NullValueHandling = NullValueHandling.Ignore
            };
            return JArray.FromObject(o, serializer);
        }

    }
}
