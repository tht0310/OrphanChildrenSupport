using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface ISupportCategoryService
    {
        Task<ApiResponse<SupportCategoryResource>> CreateSupportCategory(SupportCategoryResource supportCategoryResource);
        Task<ApiResponse<SupportCategoryResource>> UpdateSupportCategory(long id, SupportCategoryResource supportCategoryResource);
        Task<ApiResponse<SupportCategoryResource>> DeleteSupportCategory(long id, bool removeFromDB = false);
        Task<ApiResponse<SupportCategoryResource>> GetSupportCategory(long id);
        Task<ApiResponse<QueryResultResource<SupportCategoryResource>>> GetSupportCategories(QueryResource queryObj);
    }
}
