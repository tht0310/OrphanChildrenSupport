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
using OrphanChildrenSupport.Tools.Encryptions;
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
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<DonationDetailService> _logger;

        public DonationDetailService(IMapper mapper, ILogger<DonationDetailService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:DonationDetailAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<DonationDetailResource>> CreateDonationDetail(DonationDetailResource donationDetailResource)
        {
            const string loggerHeader = "CreateDonationDetail";

            var apiResponse = new ApiResponse<DonationDetailResource>();
            DonationDetail donationDetail = _mapper.Map<DonationDetailResource, DonationDetail>(donationDetailResource);

            _logger.LogDebug($"{loggerHeader} - Start to add DonationDetail: {JsonConvert.SerializeObject(donationDetail)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    donationDetail.CreatedBy = _httpContextHelper.GetCurrentUser();
                    donationDetail.CreatedTime = DateTime.UtcNow;
                    donationDetail.ModifiedBy = null;
                    await unitOfWork.DonationDetailRepository.Add(donationDetail);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new DonationDetail successfully with Id: {donationDetail.Id}");
                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
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
                    _logger.LogDebug($"{loggerHeader} - Start to update DonationDetail: {JsonConvert.SerializeObject(donationDetail)}");
                    donationDetail.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    donationDetail.LastModified = DateTime.UtcNow;
                    unitOfWork.DonationDetailRepository.Update(donationDetail);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update DonationDetail successfully with Id: {donationDetail.Id}");

                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
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

            _logger.LogDebug($"{loggerHeader} - Start to delete DonationDetail with Id: {id}");
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
                        donationDetail.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        donationDetail.IsDeleted = true;
                        donationDetail.LastModified = DateTime.UtcNow;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete DonationDetail successfully with Id: {donationDetail.Id}");
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

            _logger.LogDebug($"{loggerHeader} - Start to get DonationDetail with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - Get DonationDetail successfully with Id: {apiResponse.Data.Id}");
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

            _logger.LogDebug($"{loggerHeader} - Start to get DonationDetails with");

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
                    _logger.LogDebug($"{loggerHeader} - Get DonationDetails successfully");
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

        public async Task<ApiResponse<DonationDetailResource>> Finish(long id)
        {
            const string loggerHeader = "ApproveDonationDetail";

            var apiResponse = new ApiResponse<DonationDetailResource>();

            _logger.LogDebug($"{loggerHeader} - Start to finish DonationDetail with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == id);
                    donationDetail.DonationDetailStatus = DonationDetailStatus.Finished;

                    unitOfWork.DonationDetailRepository.Update(donationDetail);
                    await unitOfWork.SaveChanges();
                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - Get DonationDetail successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<DonationDetailResource>> Cancel(long id)
        {
            const string loggerHeader = "RejectDonationDetail";

            var apiResponse = new ApiResponse<DonationDetailResource>();

            _logger.LogDebug($"{loggerHeader} - Start to cancel DonationDetail with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == id);
                    donationDetail.DonationDetailStatus = DonationDetailStatus.Cancelled;

                    unitOfWork.DonationDetailRepository.Update(donationDetail);
                    await unitOfWork.SaveChanges();
                    donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(predicate: d => d.Id == donationDetail.Id);
                    apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
                    _logger.LogDebug($"{loggerHeader} - Get DonationDetail successfully with Id: {apiResponse.Data.Id}");
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
                _logger.LogDebug($"{loggerHeader} - Start to Upload DonationDetailImage with");
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
                        _logger.LogDebug($"{loggerHeader} - Save file in new path: {newPath}");
                        using (var stream = new FileStream(newPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(d => d.Id == id);
                        var oldPath = donationDetail.ImagePath;
                        _logger.LogDebug($"{loggerHeader} - Delete file in old path: {oldPath}");
                        if (File.Exists(oldPath))
                        {
                            File.Delete(oldPath);
                        }

                        _logger.LogDebug($"{loggerHeader} - Upload ImagePath for Id: {donationDetail.Id}");
                        donationDetail.ImagePath = newPath;
                        donationDetail.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        donationDetail.LastModified = DateTime.UtcNow;
                        unitOfWork.DonationDetailRepository.Update(donationDetail);
                        await unitOfWork.SaveChanges();
                        _logger.LogDebug($"{loggerHeader} - Upload DonationDetailImage successfully with Id: {donationDetail.Id}");

                        apiResponse.Data = _mapper.Map<DonationDetail, DonationDetailResource>(donationDetail);
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

        public async Task<ApiResponse<FileStream>> GetDonationDetailImage(long id)
        {
            const string loggerHeader = "GetDonationDetailImage";
            var apiResponse = new ApiResponse<FileStream>();
            _logger.LogDebug($"{loggerHeader} - Start to get DonationDetailImage with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var donationDetail = await unitOfWork.DonationDetailRepository.FindFirst(d => d.Id == id);
                    var image = File.OpenRead(donationDetail.ImagePath);
                    apiResponse.Data = image;
                    _logger.LogDebug($"{loggerHeader} - Get DonationDetailImage successfully with Id: {donationDetail.Id}");
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