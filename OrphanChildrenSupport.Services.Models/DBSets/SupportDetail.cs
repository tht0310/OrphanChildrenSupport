using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class SupportDetail : EngineEntity
    {
        [ForeignKey("Support")]
        [Required]
        public long SupportId { get; set; }
        [ForeignKey("SupportCategory")]
        [Required]
        public long SupportCategoryId { get; set; }
        public SupportDetailStatus Status { get; set; }
        public string Note { get; set; }
        #region  Foreign
        public Support Support { get; set; }
        public SupportCategory SupportCategory { get; set; }
        #endregion
    }
}