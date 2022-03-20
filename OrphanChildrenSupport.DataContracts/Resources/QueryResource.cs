using OrphanChildrenSupport.Services.Models;

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
        public string FullNameOrEmail { get; set; }
        public bool? Gender { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public ChildrenProfileStatus? ChildrenProfileStatus { get; set; }
    }
}