using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class ChildrenSupportCategory : EngineEntity
    {
        [ForeignKey("ChildrenProfile")]
        [Required]
        public long ChildrenProfileId { get; set; }
        [ForeignKey("SupportCategory")]
        [Required]
        public long SupportCategoryId { get; set; }
    }
}
