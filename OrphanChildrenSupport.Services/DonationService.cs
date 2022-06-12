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

        public DonationService(IMapper mapper, ILogger<DonationService> logger, IConfiguration config,
             IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            
            
            
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<DonationResource>> CreateDonation(DonationResource donationResource)
        {
            const string loggerHeader = "CreateDonation";

            var apiResponse = new ApiResponse<DonationResource>();
            Donation donation = _mapper.Map<DonationResource, Donation>(donationResource);

            _logger.LogDebug($"{loggerHeader} - Start to add Donation: {JsonConvert.SerializeObject(donation)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    donation.CreatedBy = _httpContextHelper.GetCurrentUser();
                    donation.CreatedTime = DateTime.UtcNow;
                    donation.ModifiedBy = null;
                    await unitOfWork.DonationRepository.Add(donation);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new Donation successfully with Id: {donation.Id}");
                    donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == donation.Id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
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
                    _logger.LogDebug($"{loggerHeader} - Start to update Donation: {JsonConvert.SerializeObject(donation)}");
                    donation.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    donation.LastModified = DateTime.UtcNow;
                    unitOfWork.DonationRepository.Update(donation);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update Donation successfully with Id: {donation.Id}");

                    donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
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

            _logger.LogDebug($"{loggerHeader} - Start to delete Donation with Id: {id}");
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
                        donation.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        donation.IsDeleted = true;
                        donation.LastModified = DateTime.UtcNow;
                        unitOfWork.DonationRepository.Update(donation);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete Donation successfully with Id: {donation.Id}");
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

            _logger.LogDebug($"{loggerHeader} - Start to get Donation with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - Get Donation successfully with Id: {apiResponse.Data.Id}");
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

                    var query = await unitOfWork.DonationRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)),
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
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

        public async Task<ApiResponse<DonationResource>> Approve(long id)
        {
            const string loggerHeader = "ApproveDonation";

            var apiResponse = new ApiResponse<DonationResource>();

            _logger.LogDebug($"{loggerHeader} - Start to approve Donation with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id);
                    donation.DonationStatus = DonationStatus.Processing;
                    var donationDetails = await unitOfWork.DonationDetailRepository.FindAll().Where(d => d.Id == id && d.IsDeleted == false).ToListAsync();
                    foreach (var donationDetail in donationDetails)
                    {
                        donationDetail.DonationDetailStatus = DonationDetailStatus.Processing;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                    }

                    unitOfWork.DonationRepository.Update(donation);
                    await unitOfWork.SaveChanges();
                    donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - Get Donation successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<DonationResource>> Reject(long id)
        {
            const string loggerHeader = "RejectDonation";

            var apiResponse = new ApiResponse<DonationResource>();

            _logger.LogDebug($"{loggerHeader} - Start to reject Donation with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id);
                    donation.DonationStatus = DonationStatus.Rejected;
                    var donationDetails = await unitOfWork.DonationDetailRepository.FindAll().Where(d => d.DonationId == id && d.IsDeleted == false).ToListAsync();
                    foreach (var donationDetail in donationDetails)
                    {
                        donationDetail.DonationDetailStatus = DonationDetailStatus.Rejected;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                    }

                    unitOfWork.DonationRepository.Update(donation);
                    await unitOfWork.SaveChanges();
                    donation = await unitOfWork.DonationRepository.FindFirst(predicate: d => d.Id == id,
                                                                        include: source => source.Include(d => d.DonationDetails.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Donation, DonationResource>(donation);
                    _logger.LogDebug($"{loggerHeader} - Get Donation successfully with Id: {apiResponse.Data.Id}");
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