using AutoMapper;
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
    public class ReportDetailService : IReportDetailService
    {

        private string _connectionString;
        
       
        
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ReportDetailService> _logger;

        public ReportDetailService(IMapper mapper, ILogger<ReportDetailService> logger, IConfiguration config,
             IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            
            
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ReportDetailResource>> CreateReportDetail(ReportDetailResource reportDetailResource)
        {
            const string loggerHeader = "CreateReportDetail";

            var apiResponse = new ApiResponse<ReportDetailResource>();
            ReportDetail reportDetail = _mapper.Map<ReportDetailResource, ReportDetail>(reportDetailResource);

            _logger.LogDebug($"{loggerHeader} - Start to add ReportDetail: {JsonConvert.SerializeObject(reportDetail)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    reportDetail.CreatedBy = _httpContextHelper.GetCurrentUser();
                    reportDetail.CreatedTime = DateTime.UtcNow;
                    reportDetail.ModifiedBy = null;
                    await unitOfWork.ReportDetailRepository.Add(reportDetail);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new ReportDetail successfully with Id: {reportDetail.Id}");
                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
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
                    _logger.LogDebug($"{loggerHeader} - Start to update ReportDetail: {JsonConvert.SerializeObject(reportDetail)}");
                    reportDetail.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    reportDetail.LastModified = DateTime.UtcNow;
                    unitOfWork.ReportDetailRepository.Update(reportDetail);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update ReportDetail successfully with Id: {reportDetail.Id}");

                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
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

            _logger.LogDebug($"{loggerHeader} - Start to delete ReportDetail with Id: {id}");
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
                        reportDetail.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        reportDetail.IsDeleted = true;
                        reportDetail.LastModified = DateTime.UtcNow;
                        unitOfWork.ReportDetailRepository.Update(reportDetail);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete ReportDetail successfully with Id: {reportDetail.Id}");
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

            _logger.LogDebug($"{loggerHeader} - Start to get ReportDetail with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - Get ReportDetail successfully with Id: {apiResponse.Data.Id}");
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

            _logger.LogDebug($"{loggerHeader} - Start to get ReportDetails with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.ReportDetailRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                                                ,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ReportDetail>, QueryResultResource<ReportDetailResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get ReportDetails successfully");
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

        public async Task<ApiResponse<ReportDetailResource>> Approve(long id)
        {
            const string loggerHeader = "ApproveReportDetail";

            var apiResponse = new ApiResponse<ReportDetailResource>();

            _logger.LogDebug($"{loggerHeader} - Start to finish ReportDetail with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    reportDetail.ReportDetailStatus = ReportDetailStatus.Approved;

                    unitOfWork.ReportDetailRepository.Update(reportDetail);
                    await unitOfWork.SaveChanges();
                    reportDetail = await unitOfWork.ReportDetailRepository.FindFirst(predicate: d => d.Id == reportDetail.Id);
                    apiResponse.Data = _mapper.Map<ReportDetail, ReportDetailResource>(reportDetail);
                    _logger.LogDebug($"{loggerHeader} - Get ReportDetail successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<ReportDetailResource>> Reject(long id)
        {
            const string loggerHeader = "ApproveReportDetail";

            var apiResponse = new ApiResponse<ReportDetailResource>();

            _logger.LogDebug($"{loggerHeader} - Start to finish ReportDetail with Id: {id}");

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
                    _logger.LogDebug($"{loggerHeader} - Get ReportDetail successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<ReportDetailResource>> Cancel(long id)
        {
            const string loggerHeader = "RejectReportDetail";

            var apiResponse = new ApiResponse<ReportDetailResource>();

            _logger.LogDebug($"{loggerHeader} - Start to cancel ReportDetail with Id: {id}");

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
                    _logger.LogDebug($"{loggerHeader} - Get ReportDetail successfully with Id: {apiResponse.Data.Id}");
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