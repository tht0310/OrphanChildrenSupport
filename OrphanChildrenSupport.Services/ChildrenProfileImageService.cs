using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Tools.FileExtensions;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class ChildrenProfileImageService : IChildrenProfileImageService
    {
        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChildrenProfileImageService> _logger;
        private readonly IChangelogService _changelogService;

        public ChildrenProfileImageService(IMapper mapper, ILogger<ChildrenProfileImageService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
        }

        public async Task<ApiResponse<ChildrenProfileImageResource>> CreateChildrenProfileImage(ChildrenProfileImageResource childrenProfileImageResource)
        {
            const string loggerHeader = "CreateChildrenProfileImage";
            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();
            ChildrenProfileImage childrenProfileImage = _mapper.Map<ChildrenProfileImageResource, ChildrenProfileImage>(childrenProfileImageResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateChildrenProfileImage: {JsonConvert.SerializeObject(childrenProfileImage)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenProfileImage.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    childrenProfileImage.CreatedTime = DateTime.UtcNow;
                    childrenProfileImage.ModifiedBy = null;
                    await unitOfWork.ChildrenProfileImageRepository.Add(childrenProfileImage);
                    await unitOfWork.SaveChanges();
                    childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == childrenProfileImage.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileImage, ChildrenProfileImageResource>(childrenProfileImage);
                    _logger.LogDebug($"{loggerHeader} - CreateChildrenProfileImage successfully with Id: {childrenProfileImage.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfileImage";
                    changelogResource.API = $"{loggerHeader} - CreateChildrenProfileImage successfully with Id: {childrenProfileImage.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);
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

        public async Task<ApiResponse<ChildrenProfileImageResource>> UpdateChildrenProfileImage(long id, ChildrenProfileImageResource childrenProfileImageResource)
        {
            const string loggerHeader = "UpdateChildrenProfileImage";
            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == id);
                    childrenProfileImage = _mapper.Map<ChildrenProfileImageResource, ChildrenProfileImage>(childrenProfileImageResource, childrenProfileImage);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateChildrenProfileImage: {JsonConvert.SerializeObject(childrenProfileImage)}");
                    childrenProfileImage.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    childrenProfileImage.LastModified = DateTime.UtcNow;
                    unitOfWork.ChildrenProfileImageRepository.Update(childrenProfileImage);
                    await unitOfWork.SaveChanges();
                    childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == childrenProfileImage.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileImage, ChildrenProfileImageResource>(childrenProfileImage);
                    _logger.LogDebug($"{loggerHeader} - UpdateChildrenProfileImage successfully with Id: {childrenProfileImage.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfileImage";
                    changelogResource.API = $"{loggerHeader} - UpdateChildrenProfileImage successfully with Id: {childrenProfileImage.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);
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

        public async Task<ApiResponse<ChildrenProfileImageResource>> DeleteChildrenProfileImage(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChildrenProfileImage";
            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteChildrenProfileImage with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ChildrenProfileImageRepository.Remove(childrenProfileImage);
                    }
                    else
                    {
                        childrenProfileImage.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        childrenProfileImage.IsDeleted = true;
                        childrenProfileImage.LastModified = DateTime.UtcNow;
                        unitOfWork.ChildrenProfileImageRepository.Update(childrenProfileImage);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteChildrenProfileImage successfully with Id: {childrenProfileImage.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfileImage";
                    changelogResource.API = $"{loggerHeader} - DeleteChildrenProfileImage successfully with Id: {childrenProfileImage.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);
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

        public async Task<ApiResponse<ChildrenProfileImageResource>> GetChildrenProfileImage(long id)
        {
            const string loggerHeader = "GetChildrenProfileImage";
            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();
            _logger.LogDebug($"{loggerHeader} - Start to get GetChildrenProfileImage with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileImage, ChildrenProfileImageResource>(childrenProfileImage);
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfileImage successfully with Id: {id}");
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

        public async Task<ApiResponse<QueryResultResource<ChildrenProfileImageResource>>> GetChildrenProfileImages(QueryResource queryObj)
        {
            const string loggerHeader = "GetChildrenProfileImages";
            var apiResponse = new ApiResponse<QueryResultResource<ChildrenProfileImageResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetChildrenProfileImages");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {

                    var query = await unitOfWork.ChildrenProfileImageRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenProfileImage>, QueryResultResource<ChildrenProfileImageResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfileImages successfully");
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

        public async Task<ApiResponse<FileStream>> ViewChildrenProfileImage(long id)
        {
            const string loggerHeader = "ViewChildrenProfileImage";
            var apiResponse = new ApiResponse<FileStream>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    _logger.LogDebug($"{loggerHeader} - Start to ViewChildrenProfileImage with Id: {id}");
                    var childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(d => d.Id == id && d.IsDeleted == false);
                    if (childrenProfileImage != null)
                    {
                        var image = File.OpenRead(childrenProfileImage.ImagePath);
                        apiResponse.Data = image;
                        _logger.LogDebug($"{loggerHeader} - ViewChildrenProfileImage successfully with Id: {id}");
                    } else
                    {
                        apiResponse.Data = File.OpenRead("wwwroot\\dist\\d637647145ebc0a2037f6eea9ca6c989.png");
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
            return apiResponse;
        }

        public async Task<ApiResponse<QueryResultResource<ChildrenProfileImageResource>>> GetImagesByChildrenProfileId(long id)
        {
            const string loggerHeader = "GetImagesByChildrenProfileId";
            var apiResponse = new ApiResponse<QueryResultResource<ChildrenProfileImageResource>>();
            _logger.LogDebug($"{loggerHeader} - Start to GetImagesByChildrenProfileId with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    _logger.LogDebug($"{loggerHeader} - Start to GetImagesByChildrenProfileId with Id: {id}");
                    var query = await unitOfWork.ChildrenProfileImageRepository.FindAll(d => d.ChildrenProfileId == id && d.IsDeleted == false);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenProfileImage>, QueryResultResource<ChildrenProfileImageResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetImagesByChildrenProfileId successfully with Id: {id}");
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

        public async Task<ApiResponse<ChildrenProfileResponse>> UploadImagesByChildrenProfileId(long id, List<IFormFile> files)
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
                    _logger.LogDebug($"{loggerHeader} - Start to UploadChildrenProfileImage");
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
                            using (var stream = new FileStream(newPath, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }

                            var changelogResource = new ChangelogResource();
                            changelogResource.Service = "ChildrenProfileImage";
                            changelogResource.API = $"{loggerHeader} - UploadChildrenProfileImage successfully with Id: {childrenProfileImage.Id}";
                            changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                            changelogResource.CreatedTime = DateTime.UtcNow;
                            changelogResource.IsDeleted = false;
                            await _changelogService.CreateChangelog(changelogResource);
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

    }
}