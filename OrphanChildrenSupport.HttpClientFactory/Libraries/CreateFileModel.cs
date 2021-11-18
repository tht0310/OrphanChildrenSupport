using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.HttpClientFactory.Libraries
{
    public class CreateFileModel
    {
        public List<FileReturnModel> Listfiles { get; set; }
        public long? IdFolder { get; set; }
        public string Decription { get; set; }
        public string Content { get; set; }
        public string storegate { get; set; }
        public long parentId { get; set; }
        public List<long> Tag { get; set; }
    }
}
