using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IChildrenProfileSupportCategoryService
    {
        Task<ApiResponse<ChildrenProfileSupportCategoryResource>> CreateChildrenProfileSupportCategory(ChildrenProfileSupportCategoryResource childrenProfileSupportCategoryResource);
        Task<ApiResponse<ChildrenProfileSupportCategoryResource>> UpdateChildrenProfileSupportCategory(long id, ChildrenProfileSupportCategoryResource childrenProfileSupportCategoryResource);
        Task<ApiResponse<ChildrenProfileSupportCategoryResource>> DeleteChildrenProfileSupportCategory(long id, bool removeFromDB = false);
        Task<ApiResponse<ChildrenProfileSupportCategoryResource>> GetChildrenProfileSupportCategory(long id);
        Task<ApiResponse<QueryResultResource<ChildrenProfileSupportCategoryResource>>> GetchildrenProfileSupportCategories(QueryResource queryObj);
    }
}
