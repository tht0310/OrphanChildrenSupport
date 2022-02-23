using Microsoft.AspNetCore.Http;

namespace OrphanChildrenSupport.Models
{
    public class FileUploadModel
    {
        public IFormFile File { get; set; }
    }
}
