using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface ISupportService
    {
        Task<ApiResponse<SupportResource>> CreateSupport(SupportResource supportResource);
        Task<ApiResponse<SupportResource>> UpdateSupport(long id, SupportResource supportResource);
        Task<ApiResponse<SupportResource>> DeleteSupport(long id, bool removeFromDB = false);
        Task<ApiResponse<SupportResource>> GetSupport(long id);
        Task<ApiResponse<QueryResultResource<SupportResource>>> GetSupports(QueryResource queryObj);
    }
}
