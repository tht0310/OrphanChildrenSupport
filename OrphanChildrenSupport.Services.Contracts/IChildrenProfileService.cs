using Microsoft.AspNetCore.Http;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Models;
using System.Collections.Generic;
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
        Task<ApiResponse<ChildrenProfileResponse>> UploadChildrenProfileImage(long id, IFormFile file);
        Task<ApiResponse<FileStream>> GetChildrenProfileImage(long id);
        Task<ApiResponse<ChildrenProfileResponse>> UploadChildrenProfileImages(long id, List<IFormFile> files);
    }
}
