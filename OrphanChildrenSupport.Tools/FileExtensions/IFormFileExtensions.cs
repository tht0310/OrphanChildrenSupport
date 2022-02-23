using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Tools.FileExtensions
{
    public static class IFormFileExtensions
    {
        public static string GetFileName(this IFormFile file)
        {
            return ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString().Trim('"');
        }

        public static readonly List<string> ImageExtensions = new List<string> { "jpg", "jpeg", "bmp", "gif", "png", "svg" };

        public static bool IsImage(this IFormFile file)
        {
            var fileExt = System.IO.Path.GetExtension(file.FileName).Substring(1);
            if (!ImageExtensions.Contains(fileExt.ToLower()))
            {
                return false;
            }
            return true;
        }

        public static async Task<MemoryStream> GetFileStream(this IFormFile file)
        {
            MemoryStream filestream = new MemoryStream();
            await file.CopyToAsync(filestream);
            return filestream;
        }

        public static async Task<byte[]> GetFileArray(this IFormFile file)
        {
            MemoryStream filestream = new MemoryStream();
            await file.CopyToAsync(filestream);
            return filestream.ToArray();
        }
    }
}
