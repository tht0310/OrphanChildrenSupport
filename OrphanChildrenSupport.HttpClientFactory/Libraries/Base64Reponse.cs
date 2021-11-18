using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.HttpClientFactory.Libraries
{
    public class Base64Response
    {
        public int Status { get; set; }
        public string Base64 { get; set; }
        public string Extension { get; set; }
    }
}
