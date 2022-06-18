using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts.Responses
{
    public class ReportStatusStatisticsResponse
    {
        public ReportStatus ReportStatus { get; set; }
        public double Percentage { get; set; }
    }
}