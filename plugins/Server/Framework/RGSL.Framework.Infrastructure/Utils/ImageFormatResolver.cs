using System;
using System.Linq;
using System.Text;

namespace Adacta.AdInsure.RGSL.Framework.Infrastructure.Utils
{
    public static class ImageFormatResolver
    {
        private static readonly byte[] _bmp = Encoding.ASCII.GetBytes("BM");
        private static readonly byte[] _gif = Encoding.ASCII.GetBytes("GIF");
        private static readonly byte[] _png = new byte[] { 137, 80, 78, 71 };
        private static readonly byte[] _tiff = new byte[] { 73, 73, 42 };
        private static readonly byte[] _tiff2 = new byte[] { 77, 77, 42 };
        private static readonly byte[] _jpeg = new byte[] { 255, 216, 255, 224 };
        private static readonly byte[] _jpeg2 = new byte[] { 255, 216, 255, 225 };

        public static bool IsImageFormatSupported(byte[] bytes)
        {
            if (_bmp.SequenceEqual(bytes.Take(_bmp.Length)) ||
                _gif.SequenceEqual(bytes.Take(_gif.Length)) ||
                _png.SequenceEqual(bytes.Take(_png.Length)) ||
                _tiff.SequenceEqual(bytes.Take(_tiff.Length)) ||
                _tiff2.SequenceEqual(bytes.Take(_tiff2.Length)) ||
                _jpeg.SequenceEqual(bytes.Take(_jpeg.Length)) ||
                _jpeg2.SequenceEqual(bytes.Take(_jpeg2.Length)))
            {
                return true;
            }

            return false;
        }
    }
}
