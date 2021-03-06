using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class ChildrenProfileSupportCategory : EngineEntity
    {
        [ForeignKey("ChildrenProfile")]
        [Required]
        public long ChildrenProfileId { get; set; }
        [ForeignKey("SupportCategory")]
        [Required]
        public long SupportCategoryId { get; set; }
        #region  Foreign
        public ChildrenProfile ChildrenProfile { get; set; }
        public SupportCategory SupportCategory { get; set; }
        #endregion
    }
}
