using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class Favorite : EngineEntity
    {
        [ForeignKey("ChildrenProfile")]
        [Required]
        public long ChildrenProfileId { get; set; }
        [ForeignKey("Account")]
        [Required]
        public long AccountId { get; set; }
        #region  Foreign
        public ChildrenProfile ChildrenProfile { get; set; }
        public Account Account { get; set; }
        #endregion
    }
}
