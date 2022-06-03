using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models
{
    public class ChildrenProfileImage : EngineEntity
    {
        [ForeignKey("ChildrenProfile")]
        [Required]
        public long ChildrenProfileId { get; set; }
        public string ImagePath { get; set; }
    }
}