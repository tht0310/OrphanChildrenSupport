using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface ISupportDetailService
    {
        Task<ApiResponse<SupportDetailResource>> CreateSupportDetail(SupportDetailResource supportDetailResource);
        Task<ApiResponse<SupportDetailResource>> UpdateSupportDetail(long id, SupportDetailResource supportDetailResource);
        Task<ApiResponse<SupportDetailResource>> DeleteSupportDetail(long id, bool removeFromDB = false);
        Task<ApiResponse<SupportDetailResource>> GetSupportDetail(long id);
        Task<ApiResponse<QueryResultResource<SupportDetailResource>>> GetSupportDetails(QueryResource queryObj);
    }
}
