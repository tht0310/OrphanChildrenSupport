using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Tools.Encryptions;
using OrphanChildrenSupport.Tools.FileExtensions;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class ChildrenProfileService : IChildrenProfileService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChildrenProfileService> _logger;

        public ChildrenProfileService(IMapper mapper, ILogger<ChildrenProfileService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:ChildrenProfileAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ChildrenProfileResource>> CreateChildrenProfile(ChildrenProfileResource childrenProfileResource)
        {
            const string loggerHeader = "CreateChildrenProfile";

            var apiResponse = new ApiResponse<ChildrenProfileResource>();
            ChildrenProfile childrenProfile = _mapper.Map<ChildrenProfileResource, ChildrenProfile>(childrenProfileResource);

            _logger.LogDebug($"{loggerHeader} - Start to add ChildrenProfile: {JsonConvert.SerializeObject(childrenProfile)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenProfile.CreatedBy = _httpContextHelper.GetCurrentUser();
                    childrenProfile.CreatedTime = DateTime.UtcNow;
                    childrenProfile.Age = GetAge(childrenProfile.DOB);
                    await unitOfWork.ChildrenProfileRepository.Add(childrenProfile);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new ChildrenProfile successfully with Id: {childrenProfile.Id}");
                    childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == childrenProfile.Id,
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory));
                    apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResource>(childrenProfile);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<ChildrenProfileResource>> UpdateChildrenProfile(long id, ChildrenProfileResource childrenProfileResource)
        {
            const string loggerHeader = "UpdateChildrenProfile";
            var apiResponse = new ApiResponse<ChildrenProfileResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory));

                    childrenProfile = _mapper.Map<ChildrenProfileResource, ChildrenProfile>(childrenProfileResource, childrenProfile);

                    await unitOfWork.DeleteChildrenProfileSupportCategories(childrenProfile.Id);

                    _logger.LogDebug($"{loggerHeader} - Start to update ChildrenProfile: {JsonConvert.SerializeObject(childrenProfile)}");
                    childrenProfile.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    childrenProfile.LastModified = DateTime.UtcNow;
                    childrenProfile.Age = GetAge(childrenProfile.DOB);

                    unitOfWork.ChildrenProfileRepository.Update(childrenProfile);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update ChildrenProfile successfully with Id: {childrenProfile.Id}");

                    childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == childrenProfile.Id,
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory));
                    apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResource>(childrenProfile);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<ChildrenProfileResource>> DeleteChildrenProfile(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChildrenProfile";

            var apiResponse = new ApiResponse<ChildrenProfileResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete ChildrenProfile with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(d => d.Id == id,
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory));
                    if (removeFromDB)
                    {
                        unitOfWork.ChildrenProfileRepository.Remove(childrenProfile);
                    }
                    else
                    {
                        childrenProfile.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        childrenProfile.IsDeleted = true;
                        childrenProfile.LastModified = DateTime.UtcNow;
                        await unitOfWork.DeleteChildrenProfileSupportCategories(childrenProfile.Id);
                        unitOfWork.ChildrenProfileRepository.Update(childrenProfile);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete ChildrenProfile successfully with Id: {childrenProfile.Id}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<ChildrenProfileResponse>> GetChildrenProfile(long id)
        {
            const string loggerHeader = "GetChildrenProfile";

            var apiResponse = new ApiResponse<ChildrenProfileResponse>();

            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenProfile with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory));
                    apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResponse>(childrenProfile);
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenProfile successfully with Id: {apiResponse.Data.Id}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<QueryResultResource<ChildrenProfileResponse>>> GetChildrenProfiles(QueryResource queryObj)
        {
            const string loggerHeader = "GetChildrenProfiles";

            var apiResponse = new ApiResponse<QueryResultResource<ChildrenProfileResponse>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenProfiles with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.ChildrenProfileRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                            && ((!queryObj.Gender.HasValue ? (d.Gender == true || d.Gender == false) : d.Gender == queryObj.Gender))
                                                                            && (!queryObj.FromAge.HasValue || d.Age >= queryObj.FromAge)
                                                                            && (!queryObj.ToAge.HasValue || d.Age <= queryObj.ToAge)
                                                                            && (!queryObj.ChildrenProfileStatus.HasValue || d.Status == queryObj.ChildrenProfileStatus)
                                                                            && ((String.IsNullOrEmpty(queryObj.FullName)) || (EF.Functions.Like(d.FullName, $"%{queryObj.FullName}%"))),
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory),
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenProfile>, QueryResultResource<ChildrenProfileResponse>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenProfiles successfully");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<ChildrenProfileResponse>> UploadChildrenProfileImage(long id, IFormFile file)
        {
            const string loggerHeader = "UploadChildrenProfileImage";

            var apiResponse = new ApiResponse<ChildrenProfileResponse>();

            if (file == null || file.Length == 0)
            {
                apiResponse.IsError = true;
                apiResponse.Message = "File not selected";
                return apiResponse;
            }
            else if (file.Length > 5242880)
            {
                apiResponse.IsError = true;
                apiResponse.Message = "File must be smaller than 5MB";
                return apiResponse;
            }
            else if (!file.IsImage())
            {
                apiResponse.IsError = true;
                apiResponse.Message = "File must be an image";
                return apiResponse;
            }
            else
            {
                _logger.LogDebug($"{loggerHeader} - Start to Upload ChildrenProfileImage with");
                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        string dir = Path.Combine("wwwroot", "ChildrenProfileImages");
                        if (!Directory.Exists(dir))
                        {
                            Directory.CreateDirectory(dir);
                        }
                        string fileName = id + "_" + DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss") + ".png";
                        var newPath = Path.Combine(dir, fileName);
                        _logger.LogDebug($"{loggerHeader} - Save file in new path: {newPath}");
                        using (var stream = new FileStream(newPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(d => d.Id == id,
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory));
                        var oldPath = childrenProfile.ImagePath;
                        _logger.LogDebug($"{loggerHeader} - Delete file in old path: {oldPath}");
                        if (File.Exists(oldPath))
                        {
                            File.Delete(oldPath);
                        }

                        _logger.LogDebug($"{loggerHeader} - Upload ImagePath for Id: {childrenProfile.Id}");
                        childrenProfile.ImagePath = newPath;
                        childrenProfile.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        childrenProfile.LastModified = DateTime.UtcNow;
                        unitOfWork.ChildrenProfileRepository.Update(childrenProfile);
                        await unitOfWork.SaveChanges();
                        _logger.LogDebug($"{loggerHeader} - Upload ChildrenProfileImage successfully with Id: {childrenProfile.Id}");

                        apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResponse>(childrenProfile);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                        apiResponse.IsError = true;
                        apiResponse.Message = ex.Message;
                        await unitOfWork.SaveErrorLog(ex);
                    }
                    finally
                    {
                        unitOfWork.Dispose();
                    }
                }
            }
            return apiResponse;
        }

        public async Task<ApiResponse<FileStream>> GetChildrenProfileImage(long id)
        {
            const string loggerHeader = "GetChildrenProfileImage";
            var apiResponse = new ApiResponse<FileStream>();
            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenProfileImage with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(d => d.Id == id,
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory));
                    var image = File.OpenRead(childrenProfile.ImagePath);
                    apiResponse.Data = image;
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenProfileImage successfully with Id: {childrenProfile.Id}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }
            return apiResponse;
        }

        public async Task<ApiResponse<ChildrenProfileResponse>> UploadChildrenProfileImages(long id, List<IFormFile> files)
        {
            const string loggerHeader = "UploadChildrenProfileImage";

            var apiResponse = new ApiResponse<ChildrenProfileResponse>();

            foreach (var file in files)
            {
                if (file == null || file.Length == 0)
                {
                    apiResponse.IsError = true;
                    apiResponse.Message = "File not selected";
                    return apiResponse;
                }
                else if (file.Length > 5242880)
                {
                    apiResponse.IsError = true;
                    apiResponse.Message = "File must be smaller than 5MB";
                    return apiResponse;
                }
                else if (!file.IsImage())
                {
                    apiResponse.IsError = true;
                    apiResponse.Message = "File must be an image";
                    return apiResponse;
                }
                else
                {
                    _logger.LogDebug($"{loggerHeader} - Start to Upload ChildrenProfileImage with");
                    using (var unitOfWork = new UnitOfWork(_connectionString))
                    {
                        try
                        {
                            string dir = Path.Combine("wwwroot", "ChildrenProfileImages");
                            if (!Directory.Exists(dir))
                            {
                                Directory.CreateDirectory(dir);
                            }

                            string fileName = id + "_" + DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss") + files.IndexOf(file) + ".png";

                            var newPath = Path.Combine(dir, fileName);
                            ChildrenProfileImage childrenProfileImage = new ChildrenProfileImage();

                            childrenProfileImage.ChildrenProfileId = id;
                            childrenProfileImage.ImagePath = newPath;
                            await unitOfWork.ChildrenProfileImageRepository.Add(childrenProfileImage);
                            await unitOfWork.SaveChanges();

                            _logger.LogDebug($"{loggerHeader} - Save file in new path: {newPath}");
                            using (var stream = new FileStream(newPath, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                            apiResponse.IsError = true;
                            apiResponse.Message = ex.Message;
                            await unitOfWork.SaveErrorLog(ex);
                        }
                        finally
                        {
                            unitOfWork.Dispose();
                        }
                    }
                }
            }

            return apiResponse;
        }

        public int GetAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var a = (today.Year * 100 + today.Month) * 100 + today.Day;
            var b = (dateOfBirth.Year * 100 + dateOfBirth.Month) * 100 + dateOfBirth.Day;
            return (a - b) / 10000;
        }
    }
}