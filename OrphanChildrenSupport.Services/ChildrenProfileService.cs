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
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class ChildrenProfileService : IChildrenProfileService
    {
        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChildrenProfileService> _logger;
        private readonly IChangelogService _changelogService;

        public ChildrenProfileService(IMapper mapper, ILogger<ChildrenProfileService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changeLogservice)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changeLogservice;
        }

        public async Task<ApiResponse<ChildrenProfileResource>> CreateChildrenProfile(ChildrenProfileResource childrenProfileResource)
        {
            const string loggerHeader = "CreateChildrenProfile";
            var apiResponse = new ApiResponse<ChildrenProfileResource>();
            ChildrenProfile childrenProfile = _mapper.Map<ChildrenProfileResource, ChildrenProfile>(childrenProfileResource);
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    _logger.LogDebug($"{loggerHeader} - Start to CreateChildrenProfile: {JsonConvert.SerializeObject(childrenProfile)}");
                    childrenProfile.Age = GetAge(childrenProfile.DOB);
                    childrenProfile.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    childrenProfile.CreatedTime = DateTime.UtcNow;
                    childrenProfile.LastModified = null;
                    childrenProfile.ModifiedBy = null;
                    await unitOfWork.ChildrenProfileRepository.Add(childrenProfile);
                    await unitOfWork.SaveChanges();
                    childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == childrenProfile.Id,
                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted))
                                                                .ThenInclude(c => c.SupportCategory)
                                                                .Include(d => d.Donations.Where(c => !c.IsDeleted))
                                                                .ThenInclude(c => c.DonationDetails));
                    apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResource>(childrenProfile);
                    _logger.LogDebug($"{loggerHeader} - CreateChildrenProfile successfully with Id: {childrenProfile.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfile";
                    changelogResource.API = $"{loggerHeader} - CreateChildrenProfile successfully with Id: {childrenProfile.Id}";
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

        public async Task<ApiResponse<ChildrenProfileResource>> UpdateChildrenProfile(long id, ChildrenProfileResource childrenProfileResource)
        {
            const string loggerHeader = "UpdateChildrenProfile";
            var apiResponse = new ApiResponse<ChildrenProfileResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == id);
                    childrenProfile = _mapper.Map<ChildrenProfileResource, ChildrenProfile>(childrenProfileResource, childrenProfile);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateChildrenProfile: {JsonConvert.SerializeObject(childrenProfile)}");
                    await unitOfWork.DeleteChildrenProfileSupportCategories(childrenProfile.Id);
                    childrenProfile.Age = GetAge(childrenProfile.DOB);
                    childrenProfile.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    childrenProfile.LastModified = DateTime.UtcNow;
                    unitOfWork.ChildrenProfileRepository.Update(childrenProfile);
                    await unitOfWork.SaveChanges();
                    childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == id,
                                            include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted))
                                                                    .ThenInclude(c => c.SupportCategory));
                    apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResource>(childrenProfile);
                    _logger.LogDebug($"{loggerHeader} - UpdateChildrenProfile successfully with Id: {id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfile";
                    changelogResource.API = $"{loggerHeader} - UpdateChildrenProfile successfully with Id: {childrenProfile.Id}";
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

        public async Task<ApiResponse<ChildrenProfileResource>> DeleteChildrenProfile(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChildrenProfile";
            var apiResponse = new ApiResponse<ChildrenProfileResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    _logger.LogDebug($"{loggerHeader} - Start to DeleteChildrenProfile with Id: {id}");
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(d => d.Id == id,
                                            include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted))
                                                                    .ThenInclude(c => c.SupportCategory));
                    if (removeFromDB)
                    {
                        unitOfWork.ChildrenProfileRepository.Remove(childrenProfile);
                    }
                    else
                    {
                        childrenProfile.IsDeleted = true;
                        childrenProfile.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        childrenProfile.LastModified = DateTime.UtcNow;
                        await unitOfWork.DeleteChildrenProfileSupportCategories(childrenProfile.Id);
                        unitOfWork.ChildrenProfileRepository.Update(childrenProfile);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteChildrenProfile successfully with Id: {id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfile";
                    changelogResource.API = $"{loggerHeader} - DeleteChildrenProfile successfully with Id: {childrenProfile.Id}";
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

        public async Task<ApiResponse<ChildrenProfileResponse>> GetChildrenProfile(long id)
        {
            const string loggerHeader = "GetChildrenProfile";
            var apiResponse = new ApiResponse<ChildrenProfileResponse>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    _logger.LogDebug($"{loggerHeader} - Start to GetChildrenProfile with Id: {id}");
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(d => d.Id == id,
                                            include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted))
                                                                    .ThenInclude(c => c.SupportCategory));
                    apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResponse>(childrenProfile);
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfile successfully with Id: {id}");
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

        public async Task<ApiResponse<QueryResultResource<ChildrenProfileResponse>>> GetChildrenProfiles(QueryResource queryObj)
        {
            const string loggerHeader = "GetChildrenProfiles";
            var apiResponse = new ApiResponse<QueryResultResource<ChildrenProfileResponse>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetChildrenProfiles");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.ChildrenProfileRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                            && ((!queryObj.Gender.HasValue ? (d.Gender == true || d.Gender == false) : d.Gender == queryObj.Gender))
                                                                            && (!queryObj.FromAge.HasValue || d.Age >= queryObj.FromAge)
                                                                            && (!queryObj.ToAge.HasValue || d.Age <= queryObj.ToAge)
                                                                            && (!queryObj.ChildrenProfileStatus.HasValue || d.Status == queryObj.ChildrenProfileStatus)
                                                                            && (!queryObj.SupportCategoryId.HasValue || d.ChildrenProfileSupportCategories.Any(s => s.SupportCategoryId == queryObj.SupportCategoryId && !s.IsDeleted))
                                                                            && ((String.IsNullOrEmpty(queryObj.FullName)) || (EF.Functions.Like(d.FullName, $"%{queryObj.FullName}%"))),
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory),
                                                                        orderBy: source => source.OrderByDescending(d => d.CreatedTime),
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenProfile>, QueryResultResource<ChildrenProfileResponse>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfiles successfully");
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

        public async Task<ApiResponse<List<SupportedChildrenStatistics>>> GetSupportedChildrenStatistics(int year)
        {
            const string loggerHeader = "GetSupportedChildrenStatistics";
            var apiResponse = new ApiResponse<List<SupportedChildrenStatistics>>();
            var statistics = new List<SupportedChildrenStatistics>();
            string[] monthNames = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            _logger.LogDebug($"{loggerHeader} - Start to GetSupportedChildrenStatistics");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfiles = await unitOfWork.ChildrenProfileRepository.FindAllToList(predicate: d => d.IsDeleted == false,
                                                                                          include: source => source.Include(i => i.Donations.Where(c => !c.IsDeleted)));

                    if (childrenProfiles != null && childrenProfiles.Count > 0)
                    {
                        for (int i = 0; i <= 11; i++)
                        {
                            int count = 0;
                            var monthlySupportedChildrenStatistics = new SupportedChildrenStatistics();
                            monthlySupportedChildrenStatistics.Month = monthNames[i];
                            var startDate = new DateTime(year, i + 1, 1);
                            var endDate = startDate.AddMonths(1).AddDays(-1);
                            foreach (var children in childrenProfiles)
                            {
                                if (children.Donations.Any(d => d.CreatedTime <= endDate && d.CreatedTime >= startDate && d.IsDeleted == false))
                                {
                                    count++;
                                }
                            }
                            monthlySupportedChildrenStatistics.Value = count;
                            statistics.Add(monthlySupportedChildrenStatistics);
                        }
                    }
                    apiResponse.Data = statistics;
                    _logger.LogDebug($"{loggerHeader} - GetSupportedChildrenStatistics successfully");
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