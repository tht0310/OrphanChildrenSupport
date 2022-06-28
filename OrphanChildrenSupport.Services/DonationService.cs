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
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class DonationService : IDonationService
    {
        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<DonationService> _logger;
        private IChangelogService _changelogService;
        private INotificationService _notificationService;

        public DonationService(IMapper mapper, ILogger<DonationService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService, INotificationService notificationService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
            _notificationService = notificationService;
        }

        public async Task<ApiResponse<DonationResource>> CreateDonation(DonationResource donationResource)
        {
            const string loggerHeader = "CreateDonation";
            var apiResponse = new ApiResponse<DonationResource>();
            Donation donation = _mapper.Map<DonationResource, Donation>(donationResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateDonation: {JsonConvert.SerializeObject(donation)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    donation.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    donation.CreatedTime = DateTime.UtcNow;
                    donation.ModifiedBy = null;
                    await unitOfWork.DonationRepository.Add(donation);
                    await unitOfWork.SaveChanges();
                    donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == donation.Id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - CreateDonation successfully with Id: {donation.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Donation";
                    changelogResource.API = $"{loggerHeader} - CreateDonation successfully with Id: {donation.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = donation.AccountId;
                    notificationResource.Content = $"{loggerHeader} - CreateDonation successfully with Id: {donation.Id}";
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

        public async Task<ApiResponse<DonationResource>> UpdateDonation(long id, DonationResource donationResource)
        {
            const string loggerHeader = "UpdateDonation";
            var apiResponse = new ApiResponse<DonationResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id);
                    donation = _mapper.Map<DonationResource, Donation>(donationResource, donation);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateDonation: {JsonConvert.SerializeObject(donation)}");
                    await unitOfWork.DeleteDonationDetails(donation.Id);
                    donation.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    donation.LastModified = DateTime.UtcNow;
                    unitOfWork.DonationRepository.Update(donation);
                    await unitOfWork.SaveChanges();
                    donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - UpdateDonation successfully with Id: {donation.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Donation";
                    changelogResource.API = $"{loggerHeader} - UpdateDonation successfully with Id: {donation.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = donation.AccountId;
                    notificationResource.Content = $"{loggerHeader} - UpdateDonation successfully with Id: {donation.Id}";
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

        public async Task<ApiResponse<DonationResource>> DeleteDonation(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteDonation";
            var apiResponse = new ApiResponse<DonationResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteDonation with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.DonationRepository.Remove(donation);
                    }
                    else
                    {
                        donation.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        donation.IsDeleted = true;
                        donation.LastModified = DateTime.UtcNow;
                        await unitOfWork.DeleteDonationDetails(donation.Id);
                        unitOfWork.DonationRepository.Update(donation);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteDonation successfully with Id: {donation.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Donation";
                    changelogResource.API = $"{loggerHeader} - DeleteDonation successfully with Id: {donation.Id}";
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

        public async Task<ApiResponse<DonationResource>> GetDonation(long id)
        {
            const string loggerHeader = "GetDonation";
            var apiResponse = new ApiResponse<DonationResource>();
            _logger.LogDebug($"{loggerHeader} - Start to GetDonation with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    if (IsFinished(donation))
                    {
                        donation.Status = DonationStatus.Finished;
                        unitOfWork.DonationRepository.Update(donation);
                    }
                    await unitOfWork.SaveChanges();
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - GetDonation successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<DonationResource>>> GetDonations(QueryResource queryObj)
        {
            const string loggerHeader = "GetDonations";
            var apiResponse = new ApiResponse<QueryResultResource<DonationResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to get Donations with");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.DonationRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                            && (!queryObj.AccountId.HasValue || d.AccountId == queryObj.AccountId)
                                                                            && (!queryObj.ChildrenProfileId.HasValue || d.ChildrenProfileId == queryObj.ChildrenProfileId)
                                                                            && (!queryObj.DonationStatus.HasValue || d.Status == queryObj.DonationStatus)
                                                                            && ((String.IsNullOrEmpty(queryObj.FullName)) || (EF.Functions.Like(d.ChildrenProfile.FullName, $"%{queryObj.FullName}%"))),
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)),
                                                                        orderBy: source => source.OrderByDescending(d => d.CreatedTime),
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    foreach (var donation in query.Items)
                    {
                        if (IsFinished(donation))
                        {
                            donation.Status = DonationStatus.Finished;
                            unitOfWork.DonationRepository.Update(donation);
                        }
                        await unitOfWork.SaveChanges();
                    }
                    apiResponse.Data = _mapper.Map<QueryResult<Donation>, QueryResultResource<DonationResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get Donations successfully");
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

        public async Task<ApiResponse<DonationResource>> ApproveDonation(long id)
        {
            const string loggerHeader = "ApproveDonation";
            var apiResponse = new ApiResponse<DonationResource>();
            _logger.LogDebug($"{loggerHeader} - Start to ApproveDonation with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    donation.Status = DonationStatus.Processing;
                    var donationDetails = donation.DonationDetails;
                    foreach (var donationDetail in donationDetails)
                    {
                        donationDetail.Status = DonationDetailStatus.Processing;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                    }
                    unitOfWork.DonationRepository.Update(donation);
                    await unitOfWork.SaveChanges();
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - ApproveDonation successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Donation";
                    changelogResource.API = $"{loggerHeader} - ApproveDonation successfully with Id: {donation.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = donation.AccountId;
                    notificationResource.Content = $"Your donation DN{donation.Id + 10000} was approved";
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

        public async Task<ApiResponse<DonationResource>> RejectDonation(long id)
        {
            const string loggerHeader = "RejectDonation";
            var apiResponse = new ApiResponse<DonationResource>();
            _logger.LogDebug($"{loggerHeader} - Start to RejectDonation with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    donation.Status = DonationStatus.Rejected;
                    var donationDetails = donation.DonationDetails;
                    foreach (var donationDetail in donationDetails)
                    {
                        donationDetail.Status = DonationDetailStatus.Rejected;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                    }
                    unitOfWork.DonationRepository.Update(donation);
                    await unitOfWork.SaveChanges();
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - RejectDonation successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Donation";
                    changelogResource.API = $"{loggerHeader} - RejectDonation successfully with Id: {donation.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = donation.AccountId;
                    notificationResource.Content = $"Your donation DN{donation.Id + 10000} was rejected";
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

        public async Task<ApiResponse<DonationResource>> CancelDonation(long id)
        {
            const string loggerHeader = "CancelDonation";
            var apiResponse = new ApiResponse<DonationResource>();
            _logger.LogDebug($"{loggerHeader} - Start to CancelDonation with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    donation.Status = DonationStatus.Cancelled;
                    var donationDetails = donation.DonationDetails;
                    foreach (var donationDetail in donationDetails)
                    {
                        if(donationDetail.Status != DonationDetailStatus.Finished || donationDetail.Status != DonationDetailStatus.Rejected)
                        {
                            donationDetail.Status = DonationDetailStatus.Cancelled;
                            unitOfWork.DonationDetailRepository.Update(donationDetail);
                        }
                    }
                    unitOfWork.DonationRepository.Update(donation);
                    await unitOfWork.SaveChanges();
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - CancelDonation successfully with Id: {apiResponse.Data.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Donation";
                    changelogResource.API = $"{loggerHeader} - CancelDonation successfully with Id: {donation.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

                    var notificationResource = new NotificationResource();
                    notificationResource.AccountId = donation.AccountId;
                    notificationResource.Content = $"Your donation DN{donation.Id + 10000} was cancelled";
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

        public async Task<ApiResponse<List<StatusStatistics>>> GetDonationStatusStatistics()
        {
            const string loggerHeader = "GetDonationStatusStatistics";
            var apiResponse = new ApiResponse<List<StatusStatistics>>();
            var statistics = new List<StatusStatistics>();
            _logger.LogDebug($"{loggerHeader} - Start to GetDonationStatusStatistics");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donations = await unitOfWork.DonationRepository.FindAllToList(d => !d.IsDeleted);
                    if (donations != null && donations.Count > 0)
                    {

                        var waiting = new StatusStatistics();
                        var waitingDonations = donations.Where(d => d.Status == DonationStatus.WaitingForApproval).ToList();
                        waiting.Status = DonationStatus.WaitingForApproval.ToString();
                        waiting.Percentage = (waitingDonations != null && waitingDonations.Count() > 0) ? Math.Round((double)waitingDonations.Count() / donations.Count, 2) * 100 : 0;
                        statistics.Add(waiting);

                        var processing = new StatusStatistics();
                        var processingDonations = donations.Where(d => d.Status == DonationStatus.Processing).ToList(); ;
                        processing.Status = DonationStatus.Processing.ToString();
                        processing.Percentage = (processingDonations != null && processingDonations.Count() > 0) ? Math.Round((double)processingDonations.Count() / donations.Count, 2) * 100 : 0;
                        statistics.Add(processing);

                        var cancelled = new StatusStatistics();
                        var cancelledDonations = donations.Where(d => d.Status == DonationStatus.Cancelled).ToList(); ;
                        cancelled.Status = DonationStatus.Cancelled.ToString();
                        cancelled.Percentage = (cancelledDonations != null && cancelledDonations.Count() > 0) ? Math.Round((double)cancelledDonations.Count() / donations.Count, 2) * 100 : 0;
                        statistics.Add(cancelled);

                        var approved = new StatusStatistics();
                        var approvedDonations = donations.Where(d => d.Status == DonationStatus.Finished).ToList(); ;
                        approved.Status = DonationStatus.Finished.ToString();
                        approved.Percentage = (approvedDonations != null && approvedDonations.Count() > 0) ? Math.Round((double)approvedDonations.Count() / donations.Count, 2) * 100 : 0;
                        statistics.Add(approved);

                        var rejected = new StatusStatistics();
                        var rejectedDonations = donations.Where(d => d.Status == DonationStatus.Rejected).ToList(); ;
                        rejected.Status = DonationStatus.Rejected.ToString();
                        rejected.Percentage = (rejectedDonations != null && rejectedDonations.Count() > 0) ? Math.Round((double)rejectedDonations.Count() / donations.Count, 2) * 100 : 0;
                        statistics.Add(rejected);
                    }
                    apiResponse.Data = statistics;
                    _logger.LogDebug($"{loggerHeader} - GetDonationStatusStatistics successfully");
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

        public bool IsFinished(Donation donation)
        {
            if (donation.Status == DonationStatus.Finished)
            {
                return true;
            }
            else if (donation.Status == DonationStatus.Rejected
                || donation.Status == DonationStatus.Cancelled
                || donation.Status == DonationStatus.WaitingForApproval)
            {
                return false;
            }
            else
            {
                foreach (var donationDetail in donation.DonationDetails)
                {
                    if (donationDetail.Status == DonationDetailStatus.WaitingForApproval
                        || donationDetail.Status == DonationDetailStatus.Processing)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    }
}