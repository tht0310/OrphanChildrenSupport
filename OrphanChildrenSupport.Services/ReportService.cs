using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.DataContracts.Responses;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models.DBSets;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class ReportService : IReportService
    {

        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ReportService> _logger;
        private IChangelogService _changelogService;
        private INotificationService _notificationService;

        public ReportService(IMapper mapper, ILogger<ReportService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService, INotificationService notificationService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
            _notificationService = notificationService;
        }

        public async Task<ApiResponse<ReportResource>> CreateReport(ReportResource reportResource)
        {
            const string loggerHeader = "CreateReport";
            var apiResponse = new ApiResponse<ReportResource>();
            Report report = _mapper.Map<ReportResource, Report>(reportResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateReport: {JsonConvert.SerializeObject(report)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    report.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    report.CreatedTime = DateTime.UtcNow;
                    report.ModifiedBy = null;
                    await unitOfWork.ReportRepository.Add(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == report.Id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - CreateReport successfully with Id: {report.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Report";
                    changelogResource.API = $"{loggerHeader} - CreateReport successfully with Id: {report.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - CreateReport successfully with Id: {report.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
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

        public async Task<ApiResponse<ReportResource>> UpdateReport(long id, ReportResource reportResource)
        {
            const string loggerHeader = "UpdateReport";
            var apiResponse = new ApiResponse<ReportResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id);
                    report = _mapper.Map<ReportResource, Report>(reportResource, report);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateReport: {JsonConvert.SerializeObject(report)}");
                    await unitOfWork.DeleteReportDetails(report.Id);
                    report.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    report.LastModified = DateTime.UtcNow;
                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - UpdateReport successfully with Id: {report.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Report";
                    changelogResource.API = $"{loggerHeader} - UpdateReport successfully with Id: {report.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - UpdateReport successfully with Id: {report.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
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

        public async Task<ApiResponse<ReportResource>> DeleteReport(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteReport";
            var apiResponse = new ApiResponse<ReportResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteReport with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ReportRepository.Remove(report);
                    }
                    else
                    {
                        report.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        report.IsDeleted = true;
                        report.LastModified = DateTime.UtcNow;
                        await unitOfWork.DeleteReportDetails(report.Id);
                        unitOfWork.ReportRepository.Update(report);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteReport successfully with Id: {report.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Report";
                    changelogResource.API = $"{loggerHeader} - DeleteReport successfully with Id: {report.Id}";
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

        public async Task<ApiResponse<ReportResource>> GetReport(long id)
        {
            const string loggerHeader = "GetReport";
            var apiResponse = new ApiResponse<ReportResource>();
            _logger.LogDebug($"{loggerHeader} - Start to GetReport with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                       include: source => source.Include(d => d.ReportDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - GetReport successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ReportResource>>> GetReports(QueryResource queryObj)
        {
            const string loggerHeader = "GetReports";
            var apiResponse = new ApiResponse<QueryResultResource<ReportResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetReports");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.ReportRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                            && (!queryObj.AccountId.HasValue || d.AccountId == queryObj.AccountId)
                                                                            && (!queryObj.ReportStatus.HasValue || d.Status == queryObj.ReportStatus)
                                                                            && ((String.IsNullOrEmpty(queryObj.FullName)) || (EF.Functions.Like(d.ChildrenProfile.FullName, $"%{queryObj.FullName}%"))),
                                                                        include: source => source.Include(d => d.ReportDetails.Where(c => !c.IsDeleted)),
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<Report>, QueryResultResource<ReportResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetReports successfully");
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

        public async Task<ApiResponse<ReportResource>> ApproveReport(long id)
        {
            const string loggerHeader = "ApproveReport";
            var apiResponse = new ApiResponse<ReportResource>();
            _logger.LogDebug($"{loggerHeader} - Start to ApproveReport with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id);
                    report.Status = ReportStatus.Processing;
                    var reportDetails = await unitOfWork.ReportDetailRepository.FindAll().Where(d => d.ReportId == id && d.IsDeleted == false).ToListAsync();
                    foreach (var reportDetail in reportDetails)
                    {
                        reportDetail.Status = ReportDetailStatus.Processing;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }
                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - ApproveReport successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Report";
                    changelogResource.API = $"{loggerHeader} - ApproveReport successfully with Id: {report.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - ApproveReport successfully with Id: {report.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
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

        public async Task<ApiResponse<ReportResource>> RejectReport(long id)
        {
            const string loggerHeader = "RejectReport";

            var apiResponse = new ApiResponse<ReportResource>();

            _logger.LogDebug($"{loggerHeader} - Start to RejectReport with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id);
                    report.Status = ReportStatus.Rejected;
                    var reportDetails = await unitOfWork.ReportDetailRepository.FindAll().Where(d => d.Id == id && d.IsDeleted == false).ToListAsync();
                    foreach (var reportDetail in reportDetails)
                    {
                        reportDetail.Status = ReportDetailStatus.Rejected;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }
                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - RejectReport successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Report";
                    changelogResource.API = $"{loggerHeader} - RejectReport successfully with Id: {report.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - RejectReport successfully with Id: {report.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
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

        public async Task<ApiResponse<ReportResource>> CancelReport(long id)
        {
            const string loggerHeader = "CancelReport";
            var apiResponse = new ApiResponse<ReportResource>();
            _logger.LogDebug($"{loggerHeader} - Start to CancelReport with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id);
                    report.Status = ReportStatus.Rejected;
                    var reportDetails = await unitOfWork.ReportDetailRepository.FindAll().Where(d => d.Id == id && d.IsDeleted == false).ToListAsync();
                    foreach (var reportDetail in reportDetails)
                    {
                        reportDetail.Status = ReportDetailStatus.Rejected;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }
                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - CancelReport successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Report";
                    changelogResource.API = $"{loggerHeader} - CancelReport successfully with Id: {report.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = report.AccountId;
                    notificationResource.Content = $"{loggerHeader} - CancelReport successfully with Id: {report.Id}";
                    notificationResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
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

        public async Task<ApiResponse<List<ReportStatusStatisticsResponse>>> GetReportStatusStatistics()
        {
            const string loggerHeader = "GetReportStatusStatistics";
            var apiResponse = new ApiResponse<List<ReportStatusStatisticsResponse>>();
            var reportStatusStatisticResponse = new ReportStatusStatisticsResponse();
            _logger.LogDebug($"{loggerHeader} - Start to GetReportStatusStatistics");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reports = await unitOfWork.ReportRepository.FindAll().Where(d => d.IsDeleted == false).ToListAsync();
                    if (reports != null && reports.Count > 0)
                    {
                        var approvedReports = reports.Where(d => d.Status == ReportStatus.Approved);
                        reportStatusStatisticResponse.ReportStatus = ReportStatus.Approved;
                        reportStatusStatisticResponse.Percentage = (approvedReports != null && approvedReports.Count() > 0) ? Math.Round((double)approvedReports.Count() / reports.Count, 2) * 100 : 0;
                        apiResponse.Data.Add(reportStatusStatisticResponse);

                        var waitingReports = reports.Where(d => d.Status == ReportStatus.WaitingForApproval);
                        reportStatusStatisticResponse.ReportStatus = ReportStatus.WaitingForApproval;
                        reportStatusStatisticResponse.Percentage = (waitingReports != null && waitingReports.Count() > 0) ? Math.Round((double)waitingReports.Count() / reports.Count, 2) * 100 : 0;
                        apiResponse.Data.Add(reportStatusStatisticResponse);

                        var rejectedReports = reports.Where(d => d.Status == ReportStatus.Rejected);
                        reportStatusStatisticResponse.ReportStatus = ReportStatus.Rejected;
                        reportStatusStatisticResponse.Percentage = (rejectedReports != null && rejectedReports.Count() > 0) ? Math.Round((double)rejectedReports.Count() / reports.Count, 2) * 100 : 0;
                        apiResponse.Data.Add(reportStatusStatisticResponse);

                        var cancelledReports = reports.Where(d => d.Status == ReportStatus.Cancelled);
                        reportStatusStatisticResponse.ReportStatus = ReportStatus.Cancelled;
                        reportStatusStatisticResponse.Percentage = (cancelledReports != null && cancelledReports.Count() > 0) ? Math.Round((double)cancelledReports.Count() / reports.Count, 2) * 100 : 0;
                        apiResponse.Data.Add(reportStatusStatisticResponse);
                    }

                    _logger.LogDebug($"{loggerHeader} - GetReportStatusStatistics successfully");
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