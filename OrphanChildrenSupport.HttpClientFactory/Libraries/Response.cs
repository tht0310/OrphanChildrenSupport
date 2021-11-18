using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.HttpClientFactory.Libraries
{
    public class Response
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public bool IsValid { get; set; }
        public List<long> Ids { get; set; }
    }
}
