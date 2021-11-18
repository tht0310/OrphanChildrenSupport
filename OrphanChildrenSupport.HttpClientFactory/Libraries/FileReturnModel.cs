using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.HttpClientFactory.Libraries
{
    public class FileReturnModel
    {
        public string Name { get; set; }
        public string Path { get; set; }
        public long Lenght { get; set; }
        public string FileType { get; set; }
    }
}
