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
    public class ReportFieldCategoryService : IReportFieldCategoryService
    {
        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ReportFieldCategoryService> _logger;
        private readonly IChangelogService _changelogService;

        public ReportFieldCategoryService(IMapper mapper, ILogger<ReportFieldCategoryService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
        }

        public async Task<ApiResponse<ReportFieldCategoryResource>> CreateReportFieldCategory(ReportFieldCategoryResource reportFieldCategoryResource)
        {
            const string loggerHeader = "CreateReportFieldCategory";
            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();
            ReportFieldCategory reportFieldCategory = _mapper.Map<ReportFieldCategoryResource, ReportFieldCategory>(reportFieldCategoryResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateReportFieldCategory: {JsonConvert.SerializeObject(reportFieldCategory)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    reportFieldCategory.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    reportFieldCategory.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.ReportFieldCategoryRepository.Add(reportFieldCategory);
                    await unitOfWork.SaveChanges();
                    reportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == reportFieldCategory.Id);
                    apiResponse.Data = _mapper.Map<ReportFieldCategory, ReportFieldCategoryResource>(reportFieldCategory);
                    _logger.LogDebug($"{loggerHeader} - CreateReportFieldCategory successfully with Id: {reportFieldCategory.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportFieldCategory";
                    changelogResource.API = $"{loggerHeader} - CreateReportFieldCategory successfully with Id: {reportFieldCategory.Id}";
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

        public async Task<ApiResponse<ReportFieldCategoryResource>> UpdateReportFieldCategory(long id, ReportFieldCategoryResource reportFieldCategoryResource)
        {
            const string loggerHeader = "UpdateReportFieldCategory";
            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    reportFieldCategory = _mapper.Map<ReportFieldCategoryResource, ReportFieldCategory>(reportFieldCategoryResource, reportFieldCategory);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateReportFieldCategory: {JsonConvert.SerializeObject(reportFieldCategory)}");
                    reportFieldCategory.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    reportFieldCategory.LastModified = DateTime.UtcNow;
                    unitOfWork.ReportFieldCategoryRepository.Update(reportFieldCategory);
                    await unitOfWork.SaveChanges();
                    reportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == reportFieldCategory.Id);
                    apiResponse.Data = _mapper.Map<ReportFieldCategory, ReportFieldCategoryResource>(reportFieldCategory);
                    _logger.LogDebug($"{loggerHeader} - UpdateReportFieldCategory successfully with Id: {reportFieldCategory.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportFieldCategory";
                    changelogResource.API = $"{loggerHeader} - UpdateReportFieldCategory successfully with Id: {reportFieldCategory.Id}";
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

        public async Task<ApiResponse<ReportFieldCategoryResource>> DeleteReportFieldCategory(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteReportFieldCategory";
            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteReportFieldCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(d => d.Id == id,
                                                                    include: source => source.Include(d => d.ReportDetails.Where(c => !c.IsDeleted)));
                    if (reportFieldCategory.ReportDetails.Count() > 0)
                    {
                        throw new AppException($"Unsuccessful! Report Field Category {reportFieldCategory.Title} is using.");
                    }
                    else
                    {
                        if (removeFromDB)
                        {
                            unitOfWork.ReportFieldCategoryRepository.Remove(reportFieldCategory);
                        }
                        else
                        {
                            reportFieldCategory.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                            reportFieldCategory.IsDeleted = true;
                            reportFieldCategory.LastModified = DateTime.UtcNow;
                            unitOfWork.ReportFieldCategoryRepository.Update(reportFieldCategory);
                        }
                        await unitOfWork.SaveChanges();
                        _logger.LogDebug($"{loggerHeader} - DeleteReportFieldCategory successfully with Id: {reportFieldCategory.Id}");

                        var changelogResource = new ChangelogResource();
                        changelogResource.Service = "ReportFieldCategory";
                        changelogResource.API = $"{loggerHeader} - DeleteReportFieldCategory successfully with Id: {reportFieldCategory.Id}";
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

        public async Task<ApiResponse<ReportFieldCategoryResource>> GetReportFieldCategory(long id)
        {
            const string loggerHeader = "GetReportFieldCategory";
            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();
            _logger.LogDebug($"{loggerHeader} - Start to get ReportFieldCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ReportFieldCategory, ReportFieldCategoryResource>(reportFieldCategory);
                    _logger.LogDebug($"{loggerHeader} - GetReportFieldCategory successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ReportFieldCategoryResource>>> GetReportFieldCategories(QueryResource queryObj)
        {
            const string loggerHeader = "GetReportFieldCategories";
            var apiResponse = new ApiResponse<QueryResultResource<ReportFieldCategoryResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetReportFieldCategories");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {
                    var query = await unitOfWork.ReportFieldCategoryRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                                        && ((String.IsNullOrEmpty(queryObj.Title)) || (EF.Functions.Like(d.Title, $"%{queryObj.Title}%"))),
                                                                        include: null,
                                                                        orderBy: source => source.OrderByDescending(d => d.CreatedTime),
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ReportFieldCategory>, QueryResultResource<ReportFieldCategoryResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetReportFieldCategories successfully");
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