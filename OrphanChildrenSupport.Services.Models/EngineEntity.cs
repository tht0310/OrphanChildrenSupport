using System;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.Services.Models
{
    public class EngineEntity
    {
        [Key] public long Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? LastModified { get; set; }
        public string ModifiedBy { get; set; }
        public bool IsDeleted { get; set; }
    }
}
