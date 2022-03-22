using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.DataContracts.Resources
{
    public class SupportDetailResource: EngineEntity
    {
        [Required]
        public long SupportId { get; set; }
        [Required]
        public long SupportCategoryId { get; set; }
        public SupportDetailStatus Status { get; set; }
        public string Note { get; set; }
        #region  Foreign
        public SupportResource Support { get; set; }
        public SupportCategoryResource SupportCategory { get; set; }
        #endregion
    }
}
