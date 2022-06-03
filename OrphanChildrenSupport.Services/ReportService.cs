using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.HttpClientFactory.Libraries;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Tools.Encryptions;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using Microsoft.EntityFrameworkCore;
using OrphanChildrenSupport.Services.Models.DBSets;

namespace OrphanChildrenSupport.Services
{
    public class ReportService : IReportService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ReportService> _logger;

        public ReportService(IMapper mapper, ILogger<ReportService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:ReportAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ReportResource>> CreateReport(ReportResource reportResource)
        {
            const string loggerHeader = "CreateReport";

            var apiResponse = new ApiResponse<ReportResource>();
            Report report = _mapper.Map<ReportResource, Report>(reportResource);

            _logger.LogDebug($"{loggerHeader} - Start to add Report: {JsonConvert.SerializeObject(report)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    report.CreatedBy = _httpContextHelper.GetCurrentUser();
                    report.CreatedTime = DateTime.UtcNow;
                    report.ApproverId = null;
                    report.ModifiedBy = null;
                    
                    await unitOfWork.ReportRepository.Add(report);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new Report successfully with Id: {report.Id}");
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == report.Id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
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
                    _logger.LogDebug($"{loggerHeader} - Start to update Report: {JsonConvert.SerializeObject(report)}");
                    report.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    report.LastModified = DateTime.UtcNow;
                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update Report successfully with Id: {report.Id}");

                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
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

            _logger.LogDebug($"{loggerHeader} - Start to delete Report with Id: {id}");
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
                        report.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        report.IsDeleted = true;
                        report.LastModified = DateTime.UtcNow;
                        unitOfWork.ReportRepository.Update(report);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete Report successfully with Id: {report.Id}");
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

            _logger.LogDebug($"{loggerHeader} - Start to get Report with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - Get Report successfully with Id: {apiResponse.Data.Id}");
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

            _logger.LogDebug($"{loggerHeader} - Start to get Reports with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.ReportRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<Report>, QueryResultResource<ReportResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get Reports successfully");
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

        public async Task<ApiResponse<ReportResource>> Approve(long id)
        {
            const string loggerHeader = "ApproveReport";

            var apiResponse = new ApiResponse<ReportResource>();

            _logger.LogDebug($"{loggerHeader} - Start to approve Report with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id);
                    report.ReportStatus = ReportStatus.Approved;
                    report.ApproverId = 0;
                    var reportDetails = await unitOfWork.ReportDetailRepository.FindAll().Where(d => d.ReportId == id && d.IsDeleted == false).ToListAsync();
                    foreach (var reportDetail in reportDetails)
                    {
                        reportDetail.ReportDetailStatus = ReportDetailStatus.Approved;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }

                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - Get Report successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<ReportResource>> Reject(long id)
        {
            const string loggerHeader = "RejectReport";

            var apiResponse = new ApiResponse<ReportResource>();

            _logger.LogDebug($"{loggerHeader} - Start to reject Report with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id);
                    report.ReportStatus = ReportStatus.Rejected;
                    report.ApproverId = 0;
                    var reportDetails = await unitOfWork.ReportDetailRepository.FindAll().Where(d => d.Id == id && d.IsDeleted == false).ToListAsync();
                    foreach (var reportDetail in reportDetails)
                    {
                        reportDetail.ReportDetailStatus = ReportDetailStatus.Rejected;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }

                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - Get Report successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<ReportResource>> Cancel(long id)
        {
            const string loggerHeader = "RejectReport";

            var apiResponse = new ApiResponse<ReportResource>();

            _logger.LogDebug($"{loggerHeader} - Start to reject Report with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id);
                    report.ReportStatus = ReportStatus.Rejected;
                    report.ApproverId = 0;
                    var reportDetails = await unitOfWork.ReportDetailRepository.FindAll().Where(d => d.Id == id && d.IsDeleted == false).ToListAsync();
                    foreach (var reportDetail in reportDetails)
                    {
                        reportDetail.ReportDetailStatus = ReportDetailStatus.Rejected;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }

                    unitOfWork.ReportRepository.Update(report);
                    await unitOfWork.SaveChanges();
                    report = await unitOfWork.ReportRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: null);
                    apiResponse.Data = _mapper.Map<Report, ReportResource>(report);
                    _logger.LogDebug($"{loggerHeader} - Get Report successfully with Id: {apiResponse.Data.Id}");
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