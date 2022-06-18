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
                    childrenProfile.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    childrenProfile.CreatedTime = DateTime.UtcNow;
                    childrenProfile.LastModified = null;
                    childrenProfile.ModifiedBy = null;
                    await unitOfWork.ChildrenProfileRepository.Add(childrenProfile);
                    await unitOfWork.SaveChanges();
                    childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == childrenProfile.Id,
                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted))
                                                                .ThenInclude(c => c.SupportCategory));
                    apiResponse.Data = _mapper.Map<ChildrenProfile, ChildrenProfileResource>(childrenProfile);
                    _logger.LogDebug($"{loggerHeader} - CreateChildrenProfile successfully with Id: {childrenProfile.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfile";
                    changelogResource.API = $"{loggerHeader} - CreateChildrenProfile successfully with Id: {childrenProfile.Id}";
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

        public async Task<ApiResponse<ChildrenProfileResource>> UpdateChildrenProfile(long id, ChildrenProfileResource childrenProfileResource)
        {
            const string loggerHeader = "UpdateChildrenProfile";
            var apiResponse = new ApiResponse<ChildrenProfileResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfile = await unitOfWork.ChildrenProfileRepository.FindFirst(predicate: d => d.Id == id,
                                            include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted))
                                                                    .ThenInclude(c => c.SupportCategory));
                    childrenProfile = _mapper.Map<ChildrenProfileResource, ChildrenProfile>(childrenProfileResource, childrenProfile);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateChildrenProfile: {JsonConvert.SerializeObject(childrenProfile)}");
                    await unitOfWork.DeleteChildrenProfileSupportCategories(childrenProfile.Id);
                    childrenProfile.Age = GetAge(childrenProfile.DOB);
                    childrenProfile.ModifiedBy = _httpContextHelper.GetCurrentAccount();
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
                        childrenProfile.ModifiedBy = _httpContextHelper.GetCurrentAccount();
                        childrenProfile.LastModified = DateTime.UtcNow;
                        await unitOfWork.DeleteChildrenProfileSupportCategories(childrenProfile.Id);
                        unitOfWork.ChildrenProfileRepository.Update(childrenProfile);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteChildrenProfile successfully with Id: {id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "ChildrenProfile";
                    changelogResource.API = $"{loggerHeader} - DeleteChildrenProfile successfully with Id: {childrenProfile.Id}";
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
                                                                            && (!queryObj.SupportCategoryId.HasValue || d.ChildrenProfileSupportCategories.Any(s => s.SupportCategoryId == queryObj.SupportCategoryId))
                                                                            && ((String.IsNullOrEmpty(queryObj.FullName)) || (EF.Functions.Like(d.FullName, $"%{queryObj.FullName}%"))),
                                                                        include: source => source.Include(d => d.ChildrenProfileSupportCategories.Where(c => !c.IsDeleted)).ThenInclude(c => c.SupportCategory),
                                                                        orderBy: null,
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

        public async Task<ApiResponse<List<ChildrenProfileStatisticsResponse>>> GetChildrenProfileStatistics(int year)
        {
            const string loggerHeader = "GetChildrenProfileStatistics";
            var apiResponse = new ApiResponse<List<ChildrenProfileStatisticsResponse>>();
            var childrenProfileStatisticsResponse = new ChildrenProfileStatisticsResponse();
            _logger.LogDebug($"{loggerHeader} - Start to GetChildrenProfileStatistics");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    //var childrenProfiles = await unitOfWork.ChildrenProfileRepository.FindAll().Where(d => d.IsDeleted == false && d.Status == ChildrenProfileStatus.Supported).ToListAsync();
                    //for (int i = 1; i <= 12; i++)
                    //{
                    //    var monthlyChildrenProfiles = childrenProfiles.Where(d => d.Donations.Any(x => (x.CreatedTime > DateTime.Parse("01" + i + year)) && (x.CreatedTime < DateTime.Parse("01" + (i + 1) + year))));
                    //    childrenProfileStatisticsResponse.Month = i;
                    //    childrenProfileStatisticsResponse.Value = monthlyChildrenProfiles.Count();
                    //    apiResponse.Data.Add(childrenProfileStatisticsResponse);
                    //}
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfileStatistics successfully");
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