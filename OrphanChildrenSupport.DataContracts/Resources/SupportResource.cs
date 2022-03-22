using OrphanChildrenSupport.Services.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.DataContracts.Resources
{
    public class SupportResource : EngineEntity
    {
        [Required]
        public long AccountId { get; set; }
        [Required]
        public long ChildrenProfileId { get; set; }
        public string AssignedTo { get; set; }
        public string Approver { get; set; }
        public DateTime? Deadline { get; set; }
        public SupportStatus Status { get; set; }
        public string Note { get; set; }
        #region  Foreign
        public Account Account { get; set; }
        public ChildrenProfile ChildrenProfile { get; set; }
        #endregion
    }
}
