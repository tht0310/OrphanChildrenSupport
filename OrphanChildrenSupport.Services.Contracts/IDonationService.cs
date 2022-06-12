using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IDonationService
    {
        Task<ApiResponse<DonationResource>> CreateDonation(DonationResource donationResource);
        Task<ApiResponse<DonationResource>> UpdateDonation(long id, DonationResource donationResource);
        Task<ApiResponse<DonationResource>> DeleteDonation(long id, bool removeFromDB = false);
        Task<ApiResponse<DonationResource>> GetDonation(long id);
        Task<ApiResponse<QueryResultResource<DonationResource>>> GetDonations(QueryResource queryObj);
        Task<ApiResponse<DonationResource>> Approve(long id);
        Task<ApiResponse<DonationResource>> Reject(long id);
    }
}
