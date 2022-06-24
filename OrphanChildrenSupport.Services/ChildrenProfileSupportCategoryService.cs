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
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class ChildrenProfileSupportCategoryService : IChildrenProfileSupportCategoryService
    {

        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChildrenProfileSupportCategoryService> _logger;
        private readonly IChangelogService _changelogService;

        public ChildrenProfileSupportCategoryService(IMapper mapper, ILogger<ChildrenProfileSupportCategoryService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changeLogservice)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changeLogservice;
        }

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> CreateChildrenProfileSupportCategory(ChildrenProfileSupportCategoryResource childrenChildrenProfileSupportCategoryResource)
        {
            const string loggerHeader = "CreateChildrenProfileSupportCategory";
            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();
            ChildrenProfileSupportCategory childrenChildrenProfileSupportCategory = _mapper.Map<ChildrenProfileSupportCategoryResource, ChildrenProfileSupportCategory>(childrenChildrenProfileSupportCategoryResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateChildrenProfileSupportCategory: {JsonConvert.SerializeObject(childrenChildrenProfileSupportCategory)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenChildrenProfileSupportCategory.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    childrenChildrenProfileSupportCategory.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.ChildrenProfileSupportCategoryRepository.Add(childrenChildrenProfileSupportCategory);
                    await unitOfWork.SaveChanges();
                    childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == childrenChildrenProfileSupportCategory.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResource>(childrenChildrenProfileSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - CreateChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfileSupportCategory";
                    changelogResource.API = $"{loggerHeader} - CreateChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}";
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

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> UpdateChildrenProfileSupportCategory(long id, ChildrenProfileSupportCategoryResource childrenChildrenProfileSupportCategoryResource)
        {
            const string loggerHeader = "UpdateChildrenProfileSupportCategory";
            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    childrenChildrenProfileSupportCategory = _mapper.Map<ChildrenProfileSupportCategoryResource, ChildrenProfileSupportCategory>(childrenChildrenProfileSupportCategoryResource, childrenChildrenProfileSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateChildrenProfileSupportCategory: {JsonConvert.SerializeObject(childrenChildrenProfileSupportCategory)}");
                    childrenChildrenProfileSupportCategory.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    childrenChildrenProfileSupportCategory.LastModified = DateTime.UtcNow;
                    unitOfWork.ChildrenProfileSupportCategoryRepository.Update(childrenChildrenProfileSupportCategory);
                    await unitOfWork.SaveChanges();
                    childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == childrenChildrenProfileSupportCategory.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResource>(childrenChildrenProfileSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - UpdateChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfileSupportCategory";
                    changelogResource.API = $"{loggerHeader} - UpdateChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}";
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

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> DeleteChildrenProfileSupportCategory(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChildrenProfileSupportCategory";
            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteChildrenProfileSupportCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ChildrenProfileSupportCategoryRepository.Remove(childrenChildrenProfileSupportCategory);
                    }
                    else
                    {
                        childrenChildrenProfileSupportCategory.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        childrenChildrenProfileSupportCategory.IsDeleted = true;
                        childrenChildrenProfileSupportCategory.LastModified = DateTime.UtcNow;
                        unitOfWork.ChildrenProfileSupportCategoryRepository.Update(childrenChildrenProfileSupportCategory);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfileSupportCategory";
                    changelogResource.API = $"{loggerHeader} - DeleteChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}";
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

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> GetChildrenProfileSupportCategory(long id)
        {
            const string loggerHeader = "GetChildrenProfileSupportCategory";
            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();
            _logger.LogDebug($"{loggerHeader} - Start to GetChildrenProfileSupportCategory with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResource>(childrenChildrenProfileSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfileSupportCategory successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ChildrenProfileSupportCategoryResource>>> GetChildrenProfileSupportCategories(QueryResource queryObj)
        {
            const string loggerHeader = "GetChildrenProfileSupportCategories";
            var apiResponse = new ApiResponse<QueryResultResource<ChildrenProfileSupportCategoryResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetChildrenProfileSupportCategories");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: source => source.Include(d => d.SupportCategory),
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenProfileSupportCategory>, QueryResultResource<ChildrenProfileSupportCategoryResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfileSupportCategories successfully");
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