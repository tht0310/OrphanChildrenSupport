using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class Support : EngineEntity
    {
        [ForeignKey("Account")]
        [Required]
        public long AccountId { get; set; }
        [ForeignKey("ChildrenProfile")]
        [Required]
        public long ChildrenProfileId { get; set; }
        public string AssignedTo { get; set; }
        public string Approver { get; set; }
        public DateTime? Deadline { get; set; }
        public SupportStatus Status { get; set; }
        #region  Foreign
        public Account Account { get; set; }
        public ChildrenProfile ChildrenProfile { get; set; }
        [ForeignKey("SupportId")]
        public ICollection<SupportDetail> SupportDetails { get; set; }
        #endregion
    }
}
