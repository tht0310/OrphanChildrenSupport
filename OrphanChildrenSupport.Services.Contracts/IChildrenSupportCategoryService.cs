using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IChildrenSupportCategoryService
    {
        Task<ApiResponse<ChildrenSupportCategoryResource>> CreateChildrenSupportCategory(ChildrenSupportCategoryResource childrenSupportCategoryResource);
        Task<ApiResponse<ChildrenSupportCategoryResource>> UpdateChildrenSupportCategory(long id, ChildrenSupportCategoryResource childrenSupportCategoryResource);
        Task<ApiResponse<ChildrenSupportCategoryResource>> DeleteChildrenSupportCategory(long id, bool removeFromDB = false);
        Task<ApiResponse<ChildrenSupportCategoryResource>> GetChildrenSupportCategory(long id);
        Task<ApiResponse<QueryResultResource<ChildrenSupportCategoryResource>>> GetChildrenSupportCategories(QueryResource queryObj);
    }
}
