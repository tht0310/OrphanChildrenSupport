using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;

namespace OrphanChildrenSupport.DataContracts.Resources
{
    public class QueryResource
    {
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
        public int? Page { get; set; }
        public byte PageSize { get; set; }
        public string Title { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool? Gender { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public long? AccountId { get; set; }
        public long? ChildrenProfileId { get; set; }
        public long? SupportCategoryId { get; set; }
        public string SupportCategoryTitle { get; set; }
        public Role? Role { get; set; }
        public bool? IsActive { get; set; }
        public ChildrenProfileStatus? ChildrenProfileStatus { get; set; }
        public DonationStatus? DonationStatus { get; set; }
        public ReportStatus? ReportStatus { get; set; }
        public ReportDetailStatus? ReportDetailStatus { get; set; }
        public DonationDetailStatus? DonationDetailStatus { get; set; }
    }
}