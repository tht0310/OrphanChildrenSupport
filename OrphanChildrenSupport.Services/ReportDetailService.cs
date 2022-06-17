using AutoMapper;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class ReportDetailService : IReportDetailService
    {

        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ReportDetailService> _logger;
        private readonly IChangelogService _changelogService;
        private INotificationService _notificationService;

        public ReportDetailService(IMapper mapper, ILogger<ReportDetailService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService, INotificationService notificationService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
            _notificationService = notificationService;
        }

        public async Task<ApiResponse<ReportDetailResource>> CreateReportDetail(ReportDetailResource reportDetailResource)
        {
            const string loggerHeader = "CreateReportDetail";
            var apiResponse = new ApiResponse<ReportDetailResource>();
            ReportDetail reportDetail = _mapper.Map<ReportDetailResource, ReportDetail>(reportDetailResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateReportDetail: {JsonConvert.SerializeObject(reportDetail)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    reportDetail.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    reportDetail.CreatedTime = DateTime.UtcNow;
                    reportDetail.ModifiedBy = null;
                    await unitOfWork.ReportDetailRepository.Add(reportDetail);
                    await unitOfWork.SaveChanges();
                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - CreateReportDetail successfully with Id: {reportDetail.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportDetail";
                    changelogResource.API = $"{loggerHeader} - CreateReportDetail successfully with Id: {reportDetail.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
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

        public async Task<ApiResponse<ReportDetailResource>> UpdateReportDetail(long id, ReportDetailResource reportDetailResource)
        {
            const string loggerHeader = "UpdateReportDetail";
            var apiResponse = new ApiResponse<ReportDetailResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    reportDetail = _mapper.Map<ReportDetailResource, ReportDetail>(reportDetailResource, reportDetail);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateReportDetail: {JsonConvert.SerializeObject(reportDetail)}");
                    reportDetail.ModifiedBy = _httpContextHelper.GetCurrentAccount();
                    reportDetail.LastModified = DateTime.UtcNow;
                    unitOfWork.ReportDetailRepository.Update(reportDetail);
                    await unitOfWork.SaveChanges();
                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - UpdateReportDetail successfully with Id: {reportDetail.Id}");


                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportDetail";
                    changelogResource.API = $"{loggerHeader} - UpdateReportDetail successfully with Id: {reportDetail.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
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

        public async Task<ApiResponse<ReportDetailResource>> DeleteReportDetail(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteReportDetail";
            var apiResponse = new ApiResponse<ReportDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteReportDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ReportDetailRepository.Remove(reportDetail);
                    }
                    else
                    {
                        reportDetail.ModifiedBy = _httpContextHelper.GetCurrentAccount();
                        reportDetail.IsDeleted = true;
                        reportDetail.LastModified = DateTime.UtcNow;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteReportDetail successfully with Id: {reportDetail.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportDetail";
                    changelogResource.API = $"{loggerHeader} - DeleteReportDetail successfully with Id: {reportDetail.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
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

        public async Task<ApiResponse<ReportDetailResource>> GetReportDetail(long id)
        {
            const string loggerHeader = "GetReportDetail";
            var apiResponse = new ApiResponse<ReportDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start toGetReportDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - GetReportDetail successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ReportDetailResource>>> GetReportDetails(QueryResource queryObj)
        {
            const string loggerHeader = "GetReportDetails";
            var apiResponse = new ApiResponse<QueryResultResource<ReportDetailResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to get ReportDetails");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.ReportDetailRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ReportDetail>, QueryResultResource<ReportDetailResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetReportDetails successfully");
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

        public async Task<ApiResponse<ReportDetailResource>> ApproveReportDetail(long id)
        {
            const string loggerHeader = "ApproveReportDetail";
            var apiResponse = new ApiResponse<ReportDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to ApproveReportDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    reportDetail.ReportDetailStatus = ReportDetailStatus.Approved;
                    unitOfWork.ReportDetailRepository.Update(reportDetail);

                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == reportDetail.Report.ChildrenProfileId);
                    switch (reportDetail.ReportFieldCategory.Title)
                    {
                        case "FullName":
                            childrenProfile.FullName = reportDetail.ReportInformation;
                            break;
                        case "Gender":
                            if (reportDetail.ReportInformation == "Nam")
                            {
                                childrenProfile.Gender = true;
                            } else
                            {
                                childrenProfile.Gender = false;
                            }
                            break;
                        case "DOB":
                            childrenProfile.DOB = DateTime.Parse(reportDetail.ReportInformation);
                            childrenProfile.Age = GetAge(childrenProfile.DOB);
                            break;
                        case "GuardianPhoneNumber":
                            childrenProfile.GuardianPhoneNumber = reportDetail.ReportInformation;
                            break;
                        case "GuardianName":
                            childrenProfile.GuardianName = reportDetail.ReportInformation;
                            break;
                        case "DetailAddress":
                            childrenProfile.DetailAddress = reportDetail.ReportInformation;
                            break;
                        case "PublicAddress":
                            childrenProfile.PublicAddress = reportDetail.ReportInformation;
                            break;
                        case "Circumstance":
                            childrenProfile.Circumstance = reportDetail.ReportInformation;
                            break;
                    }
                    unitOfWork.ChildrenProfileRepository.Update(childrenProfile);
                    await unitOfWork.SaveChanges();
                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - ApproveReportDetail successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportDetail";
                    changelogResource.API = $"{loggerHeader} - ApproveReportDetail successfully with Id: {reportDetail.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = reportDetail.Report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - ApproveReportDetail successfully with Id: {reportDetail.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    notificationResource.CreatedTime = DateTime.UtcNow;
                    notificationResource.IsDeleted = false;
                    await _notificationService.CreateNotification(notificationResource);
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

        public async Task<ApiResponse<ReportDetailResource>> RejectReportDetail(long id)
        {
            const string loggerHeader = "RejectReportDetail";
            var apiResponse = new ApiResponse<ReportDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to RejectReportDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    reportDetail.ReportDetailStatus = ReportDetailStatus.Rejected;
                    unitOfWork.ReportDetailRepository.Update(reportDetail);
                    await unitOfWork.SaveChanges();
                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - RejectReportDetail successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportDetail";
                    changelogResource.API = $"{loggerHeader} - RejectReportDetail successfully with Id: {reportDetail.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = reportDetail.Report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - ApproveReportDetail successfully with Id: {reportDetail.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    notificationResource.CreatedTime = DateTime.UtcNow;
                    notificationResource.IsDeleted = false;
                    await _notificationService.CreateNotification(notificationResource);
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

        public async Task<ApiResponse<ReportDetailResource>> CancelReportDetail(long id)
        {
            const string loggerHeader = "CancelReportDetail";
            var apiResponse = new ApiResponse<ReportDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to CancelReportDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    reportDetail.ReportDetailStatus = ReportDetailStatus.Cancelled;
                    unitOfWork.ReportDetailRepository.Update(reportDetail);
                    await unitOfWork.SaveChanges();
                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - CancelReportDetail successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ReportDetail";
                    changelogResource.API = $"{loggerHeader} - CancelReportDetail successfully with Id: {reportDetail.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = reportDetail.Report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - CancelReportDetail successfully with Id: {reportDetail.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    notificationResource.CreatedTime = DateTime.UtcNow;
                    notificationResource.IsDeleted = false;
                    await _notificationService.CreateNotification(notificationResource);
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

        public int GetAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var a = (today.Year * 100 + today.Month) * 100 + today.Day;
            var b = (dateOfBirth.Year * 100 + dateOfBirth.Month) * 100 + dateOfBirth.Day;
            return (a - b) / 10000;
        }
    }
}