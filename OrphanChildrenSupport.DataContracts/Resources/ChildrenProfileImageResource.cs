using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.DataContracts.Resources
{
    public class ChildrenProfileImageResource
    {
        [Required]
        public long ChildrenProfileId { get; set; }
        public string ImagePath { get; set; }
    }
}
