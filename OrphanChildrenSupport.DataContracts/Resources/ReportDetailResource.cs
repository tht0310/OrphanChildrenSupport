using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class ReportDetailResource : EngineEntity
    {

        [Required]
        public long ReportId { get; set; }
        [Required]
        public long ReportFieldCategoryId { get; set; }
        public long? ApproverId { get; set; }
        public string ReportInformation { get; set; }
        public ReportDetailStatus ReportDetailStatus { get; set; }
        public string Note { get; set; }
    }
}
