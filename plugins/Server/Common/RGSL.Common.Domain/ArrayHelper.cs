using System;
using System.Collections.Generic;
using System.Linq;

namespace Adacta.AdInsure.RGSL.Common.Domain
{
    public static class ArrayHelper
    {
        public static IEnumerable<IList<T>> Chunks<T>(IList<T> items, int chunkSize = 1000)
        {
            for (int startIndex = 0; startIndex < items.Count; startIndex += chunkSize)
            {
                int count = Math.Min(items.Count - startIndex, chunkSize);
                var ii = items.Skip(startIndex).Take(count);
                yield return ii.ToList();
            }
        }

        public static TSource SingleWithMessage<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> predicate, string errorMessage, string value = null)
        {
            return source.Where(predicate).SingleWithMessage(errorMessage, value);
        }

        public static TSource SingleWithMessage<TSource>(this IEnumerable<TSource> source, string errorMessage, string value = null)
        {
            var result = source.ToArray();
            if (result.Length != 1)
            {
                string valueText = string.IsNullOrEmpty(value) ? string.Empty : (" Must be only one value = " + value);
                throw new InvalidOperationException(errorMessage + $" Found {result.Length} elements." + valueText);
            }

            return result[0];
        }
    }
}
