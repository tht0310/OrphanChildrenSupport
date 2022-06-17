using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class Notification : EngineEntity
    {
        [ForeignKey("Account")]
        [Required]
        public long AccountId { get; set; }
        public string Content { get; set; }
        public bool IsSeen { get; set; }
        public DateTime SeenTime { get; set; }
    }
}
