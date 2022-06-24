using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models.DBSets;
using OrphanChildrenSupport.Tools;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class SupportCategoryService : ISupportCategoryService
    {

        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<SupportCategoryService> _logger;
        private readonly IChangelogService _changelogService;

        public SupportCategoryService(IMapper mapper, ILogger<SupportCategoryService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
        }

        public async Task<ApiResponse<SupportCategoryResource>> CreateSupportCategory(SupportCategoryResource supportCategoryResource)
        {
            const string loggerHeader = "CreateSupportCategory";
            var apiResponse = new ApiResponse<SupportCategoryResource>();
            SupportCategory supportCategory = _mapper.Map<SupportCategoryResource, SupportCategory>(supportCategoryResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateSupportCategory: {JsonConvert.SerializeObject(supportCategory)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    supportCategory.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    supportCategory.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.SupportCategoryRepository.Add(supportCategory);
                    await unitOfWork.SaveChanges();
                    supportCategory = await unitOfWork.SupportCategoryRepository.FindFirst(predicate: d => d.Id == supportCategory.Id);
                    apiResponse.Data = _mapper.Map<SupportCategory, SupportCategoryResource>(supportCategory);
                    _logger.LogDebug($"{loggerHeader} - CreateSupportCategory successfully with Id: {supportCategory.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "SupportCategory";
                    changelogResource.API = $"{loggerHeader} - CreateSupportCategory successfully with Id: {supportCategory.Id}";
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

        public async Task<ApiResponse<SupportCategoryResource>> UpdateSupportCategory(long id, SupportCategoryResource supportCategoryResource)
        {
            const string loggerHeader = "UpdateSupportCategory";
            var apiResponse = new ApiResponse<SupportCategoryResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var supportCategory = await unitOfWork.SupportCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    supportCategory = _mapper.Map<SupportCategoryResource, SupportCategory>(supportCategoryResource, supportCategory);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateSupportCategory: {JsonConvert.SerializeObject(supportCategory)}");
                    supportCategory.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    supportCategory.LastModified = DateTime.UtcNow;
                    unitOfWork.SupportCategoryRepository.Update(supportCategory);
                    await unitOfWork.SaveChanges();
                    supportCategory = await unitOfWork.SupportCategoryRepository.FindFirst(predicate: d => d.Id == supportCategory.Id);
                    apiResponse.Data = _mapper.Map<SupportCategory, SupportCategoryResource>(supportCategory);
                    _logger.LogDebug($"{loggerHeader} - UpdateSupportCategory successfully with Id: {supportCategory.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "SupportCategory";
                    changelogResource.API = $"{loggerHeader} - UpdateSupportCategory successfully with Id: {supportCategory.Id}";
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

        public async Task<ApiResponse<SupportCategoryResource>> DeleteSupportCategory(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteSupportCategory";
            var apiResponse = new ApiResponse<SupportCategoryResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteSupportCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var supportCategory = await unitOfWork.SupportCategoryRepository.FindFirst(predicate: d => d.Id == id,
                                                            include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)));
                    if (supportCategory.ChildrenProfileSupportCategories.Count() > 0)
                    {
                        throw new AppException($"Unsuccessful! Support Category {supportCategory.Title} is using.");
                    }
                    else
                    {
                        if (removeFromDB)
                        {
                            unitOfWork.SupportCategoryRepository.Remove(supportCategory);
                        }
                        else
                        {
                            supportCategory.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                            supportCategory.IsDeleted = true;
                            supportCategory.LastModified = DateTime.UtcNow;
                            unitOfWork.SupportCategoryRepository.Update(supportCategory);
                        }
                        await unitOfWork.SaveChanges();
                        _logger.LogDebug($"{loggerHeader} - DeleteSupportCategory successfully with Id: {supportCategory.Id}");

                        var changelogResource = new ChangelogResource();
                        changelogResource.Service = "SupportCategory";
                        changelogResource.API = $"{loggerHeader} - DeleteSupportCategory successfully with Id: {supportCategory.Id}";
                        changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                        changelogResource.CreatedTime = DateTime.UtcNow;
                        changelogResource.IsDeleted = false;
                        await _changelogService.CreateChangelog(changelogResource);
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

        public async Task<ApiResponse<SupportCategoryResource>> GetSupportCategory(long id)
        {
            const string loggerHeader = "GetSupportCategory";
            var apiResponse = new ApiResponse<SupportCategoryResource>();
            _logger.LogDebug($"{loggerHeader} - Start to GetSupportCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var supportCategory = await unitOfWork.SupportCategoryRepository.FindFirst(d => d.Id == id);

                    apiResponse.Data = _mapper.Map<SupportCategory, SupportCategoryResource>(supportCategory);
                    _logger.LogDebug($"{loggerHeader} - GetSupportCategory successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<SupportCategoryResource>>> GetSupportCategories(QueryResource queryObj)
        {
            const string loggerHeader = "GetSupportCategories";
            var apiResponse = new ApiResponse<QueryResultResource<SupportCategoryResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetSupportCategories");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {
                    var query = await unitOfWork.SupportCategoryRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<SupportCategory>, QueryResultResource<SupportCategoryResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetSupportCategories successfully");
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
    }
}