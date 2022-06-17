using System.ComponentModel;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public enum ReportDetailStatus
    {
        [Description("Processing")]
        Processing,
        [Description("Approved")]
        Approved,
        [Description("Rejected")]
        Rejected,
        [Description("Cancelled")]
        Cancelled
    }
}
