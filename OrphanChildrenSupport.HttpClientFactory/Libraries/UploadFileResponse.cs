using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.HttpClientFactory.Libraries
{
    public class UploadFileResponse
    {
        public bool success { get; set; }
        public int? count { get; set; }
        public string message { get; set; }
        public long? size { get; set; }
        public string name { get; set; }
        public List<FileReturnModel> listfiles { get; set; }
    }
}
