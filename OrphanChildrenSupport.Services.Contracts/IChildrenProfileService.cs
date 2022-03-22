using Microsoft.AspNetCore.Http;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Models;
using System.IO;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IChildrenProfileService
    {
        Task<ApiResponse<ChildrenProfileResource>> CreateChildrenProfile(ChildrenProfileResource childrenProfileResource);
        Task<ApiResponse<ChildrenProfileResource>> UpdateChildrenProfile(long id, ChildrenProfileResource childrenProfileResource);
        Task<ApiResponse<ChildrenProfileResource>> DeleteChildrenProfile(long id, bool removeFromDB = false);
        Task<ApiResponse<ChildrenProfileResponse>> GetChildrenProfile(long id);
        Task<ApiResponse<QueryResultResource<ChildrenProfileResponse>>> GetChildrenProfiles(QueryResource queryObj);
        Task<ApiResponse<ChildrenProfile>> UploadChildrenProfileImage(long id, IFormFile file);
        Task<ApiResponse<ChildrenProfile>> UploadChildrenProfileImageBase64(long id, string base64String);
        Task<ApiResponse<FileStream>> GetChildrenProfileImage(long id);
    }
}
