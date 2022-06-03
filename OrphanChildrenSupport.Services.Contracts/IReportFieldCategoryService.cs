using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IReportFieldCategoryService
    {
        Task<ApiResponse<ReportFieldCategoryResource>> CreateReportFieldCategory(ReportFieldCategoryResource reportFieldCategoryResource);
        Task<ApiResponse<ReportFieldCategoryResource>> UpdateReportFieldCategory(long id, ReportFieldCategoryResource reportFieldCategoryResource);
        Task<ApiResponse<ReportFieldCategoryResource>> DeleteReportFieldCategory(long id, bool removeFromDB = false);
        Task<ApiResponse<ReportFieldCategoryResource>> GetReportFieldCategory(long id);
        Task<ApiResponse<QueryResultResource<ReportFieldCategoryResource>>> GetReportFieldCategories(QueryResource queryObj);
    }
}
