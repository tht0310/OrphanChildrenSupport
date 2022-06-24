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
using OrphanChildrenSupport.Services.Models.DBSets;
using OrphanChildrenSupport.Tools.FileExtensions;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.IO;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class DonationDetailService : IDonationDetailService
    {

        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<DonationDetailService> _logger;
        private readonly IChangelogService _changelogService;
        private INotificationService _notificationService;

        public DonationDetailService(IMapper mapper, ILogger<DonationDetailService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changeLogservice, INotificationService notificationService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changeLogservice;
            _notificationService = notificationService;
        }

        public async Task<ApiResponse<DonationDetailResource>> CreateDonationDetail(DonationDetailResource donationDetailResource)
        {
            const string loggerHeader = "CreateDonationDetail";
            var apiResponse = new ApiResponse<DonationDetailResource>();
            DonationDetail donationDetail = _mapper.Map<DonationDetailResource, DonationDetail>(donationDetailResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateDonationDetail: {JsonConvert.SerializeObject(donationDetail)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    donationDetail.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    donationDetail.CreatedTime = DateTime.UtcNow;
                    donationDetail.ModifiedBy = null;
                    await unitOfWork.DonationDetailRepository.Add(donationDetail);
                    await unitOfWork.SaveChanges();
                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - CreateDonationDetail successfully with Id: {donationDetail.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "DonationDetail";
                    changelogResource.API = $"{loggerHeader} - CreateDonationDetail successfully with Id: {donationDetail.Id}";
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

        public async Task<ApiResponse<DonationDetailResource>> UpdateDonationDetail(long id, DonationDetailResource donationDetailResource)
        {
            const string loggerHeader = "UpdateDonationDetail";
            var apiResponse = new ApiResponse<DonationDetailResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == id);
                    donationDetail = _mapper.Map<DonationDetailResource, DonationDetail>(donationDetailResource, donationDetail);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateDonationDetail: {JsonConvert.SerializeObject(donationDetail)}");
                    donationDetail.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    donationDetail.LastModified = DateTime.UtcNow;
                    unitOfWork.DonationDetailRepository.Update(donationDetail);
                    await unitOfWork.SaveChanges();
                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - UpdateDonationDetail successfully with Id: {donationDetail.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "DonationDetail";
                    changelogResource.API = $"{loggerHeader} - UpdateDonationDetail successfully with Id: {donationDetail.Id}";
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

        public async Task<ApiResponse<DonationDetailResource>> DeleteDonationDetail(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteDonationDetail";
            var apiResponse = new ApiResponse<DonationDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteDonationDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.DonationDetailRepository.Remove(donationDetail);
                    }
                    else
                    {
                        donationDetail.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        donationDetail.IsDeleted = true;
                        donationDetail.LastModified = DateTime.UtcNow;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteDonationDetail successfully with Id: {donationDetail.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "DonationDetail";
                    changelogResource.API = $"{loggerHeader} - DeleteDonationDetail successfully with Id: {donationDetail.Id}";
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

        public async Task<ApiResponse<DonationDetailResource>> GetDonationDetail(long id)
        {
            const string loggerHeader = "GetDonationDetail";
            var apiResponse = new ApiResponse<DonationDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to GetDonationDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - GetDonationDetail successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<DonationDetailResource>>> GetDonationDetails(QueryResource queryObj)
        {
            const string loggerHeader = "GetDonationDetails";
            var apiResponse = new ApiResponse<QueryResultResource<DonationDetailResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetDonationDetails");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.DonationDetailRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                                                ,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<DonationDetail>, QueryResultResource<DonationDetailResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetDonationDetails successfully");
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

        public async Task<ApiResponse<DonationDetailResource>> FinishDonationDetail(long id)
        {
            const string loggerHeader = "FinishDonationDetail";
            var apiResponse = new ApiResponse<DonationDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to FinishDonationDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == id);
                    donationDetail.Status = DonationDetailStatus.Approved;
                    unitOfWork.DonationDetailRepository.Update(donationDetail);
                    await unitOfWork.SaveChanges();
                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - FinishDonationDetail successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "DonationDetail";
                    changelogResource.API = $"{loggerHeader} - FinishDonationDetail successfully with Id: {apiResponse.Data.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = donationDetail.Donation.AccountId;
                    notificationResource.Content = $"{loggerHeader} - FinishDonationDetail successfully with Id: {donationDetail.Id}";
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

        public async Task<ApiResponse<DonationDetailResource>> CancelDonationDetail(long id)
        {
            const string loggerHeader = "CancelDonationDetail";
            var apiResponse = new ApiResponse<DonationDetailResource>();
            _logger.LogDebug($"{loggerHeader} - Start to CancelDonationDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == id);
                    donationDetail.Status = DonationDetailStatus.Cancelled;
                    unitOfWork.DonationDetailRepository.Update(donationDetail);
                    await unitOfWork.SaveChanges();
                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - CancelDonationDetail successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "DonationDetail";
                    changelogResource.API = $"{loggerHeader} - CancelDonationDetail successfully with Id: {apiResponse.Data.Id}";
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

        public async Task<ApiResponse<DonationDetailResource>> UploadDonationDetailImage(long id, IFormFile file)
        {
            const string loggerHeader = "UploadDonationDetailImage";
            var apiResponse = new ApiResponse<DonationDetailResource>();
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
                _logger.LogDebug($"{loggerHeader} - Start to UploadDonationDetailImage with");
                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        string dir = Path.Combine("wwwroot", "DonationDetailImages");
                        if (!Directory.Exists(dir))
                        {
                            Directory.CreateDirectory(dir);
                        }
                        string fileName = id + "_" + DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss") + ".png";
                        var newPath = Path.Combine(dir, fileName);
                        _logger.LogDebug($"{loggerHeader} - Save file by new path: {newPath}");
                        using (var stream = new FileStream(newPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(d => d.Id == id);
                        var oldPath = donationDetail.ImagePath;
                        _logger.LogDebug($"{loggerHeader} - Delete file by old path: {oldPath}");
                        if (File.Exists(oldPath))
                        {
                            File.Delete(oldPath);
                        }
                        _logger.LogDebug($"{loggerHeader} - UploadDonationDetailImage with Id: {donationDetail.Id}");
                        donationDetail.ImagePath = newPath;
                        donationDetail.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        donationDetail.LastModified = DateTime.UtcNow;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                        await unitOfWork.SaveChanges();
                        apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                        _logger.LogDebug($"{loggerHeader} - UploadDonationDetailImage successfully with Id: {donationDetail.Id}");

                        var changelogResource = new ChangelogResource();
                        changelogResource.Service = "DonationDetail";
                        changelogResource.API = $"{loggerHeader} - UploadDonationDetailImage successfully with Id: {apiResponse.Data.Id}";
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
            return apiResponse;
        }

        public async Task<ApiResponse<FileStream>> ViewDonationDetailImage(long id)
        {
            const string loggerHeader = "GetDonationDetailImage";
            var apiResponse = new ApiResponse<FileStream>();
            _logger.LogDebug($"{loggerHeader} - Start to GetDonationDetailImage with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(d => d.Id == id);
                    var image = File.OpenRead(donationDetail.ImagePath);
                    apiResponse.Data = image;
                    _logger.LogDebug($"{loggerHeader} - GetDonationDetailImage successfully with Id: {donationDetail.Id}");
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