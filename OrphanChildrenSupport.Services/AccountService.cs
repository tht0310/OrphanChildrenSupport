using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.DataContracts.Responses;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using OrphanChildrenSupport.Models.Accounts;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Tools;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace OrphanChildrenSupport.Services
{
    public class AccountService : IAccountService
    {
        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<AccountService> _logger;
        private readonly IEmailService _emailService;
        private readonly IChangelogService _changelogService;

        public AccountService(IMapper mapper, ILogger<AccountService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IEmailService emailService, IChangelogService changelogService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _emailService = emailService;
            _changelogService = changelogService;
        }

        public async Task<ApiResponse<AccountResponse>> CreateAccount(CreateRequest createRequest)
        {
            const string loggerHeader = "CreateAccount";
            var apiResponse = new ApiResponse<AccountResponse>();
            Account account = _mapper.Map<CreateRequest, Account>(createRequest);
            _logger.LogDebug($"{loggerHeader} - Start to CreateAccount: {JsonConvert.SerializeObject(account)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var tempAccount = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Email == createRequest.Email);
                    if (tempAccount != null)
                    {
                        throw new AppException($"Email '{createRequest.Email}' is already registered");
                    }
                    else
                    {
                        account.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                        account.CreatedTime = DateTime.UtcNow;
                        account.VerifiedTime = DateTime.UtcNow;
                        account.PasswordHash = BC.HashPassword(createRequest.Password);
                        account.IsActive = true;
                        await unitOfWork.AccountRepository.Add(account);
                        await unitOfWork.SaveChanges();
                        account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == account.Id);
                        apiResponse.Data = _mapper.Map<Account, AccountResponse>(account);
                        _logger.LogDebug($"{loggerHeader} - CreateAccount successfully with Id: {account.Id}");

                        var changelogResource = new ChangelogResource();
                        changelogResource.Service = "Account";
                        changelogResource.API = $"{loggerHeader} - CreateAccount successfully with Id: {account.Id}";
                        changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                        changelogResource.CreatedTime = DateTime.UtcNow;
                        changelogResource.IsDeleted = false;
                        await _changelogService.CreateChangelog(changelogResource);
                    }
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

        public async Task<ApiResponse<AccountResponse>> UpdateAccount(long id, UpdateRequest updateRequest)
        {
            const string loggerHeader = "UpdateAccount";
            var apiResponse = new ApiResponse<AccountResponse>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == id);
                    account = _mapper.Map<UpdateRequest, Account>(updateRequest, account);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateAccount with Id: {id}");
                    account.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    if (!string.IsNullOrEmpty(updateRequest.Password))
                    {
                        account.PasswordHash = BC.HashPassword(updateRequest.Password);
                    }
                    account.LastModified = DateTime.UtcNow;
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == account.Id);
                    apiResponse.Data = _mapper.Map<Account, AccountResponse>(account);
                    _logger.LogDebug($"{loggerHeader} - UpdateAccount successfully with Id: {account.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Account";
                    changelogResource.API = $"{loggerHeader} - UpdateAccount successfully with Id: {account.Id}";
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

        public async Task<ApiResponse<AccountResponse>> UpdateRole(long id, Role role)
        {
            const string loggerHeader = "UpdateRole";
            var apiResponse = new ApiResponse<AccountResponse>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == id);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateRole with Id: {id}");
                    account.Role = role;
                    account.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    account.LastModified = DateTime.UtcNow;
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == account.Id);
                    apiResponse.Data = _mapper.Map<Account, AccountResponse>(account);
                    _logger.LogDebug($"{loggerHeader} - UpdateRole successfully with Id: {account.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Account";
                    changelogResource.API = $"{loggerHeader} - UpdateRole successfully with Id: {account.Id}";
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

        public async Task<ApiResponse<AccountResponse>> DeactivateAccount(long id)
        {
            const string loggerHeader = "DeactivateAccount";
            var apiResponse = new ApiResponse<AccountResponse>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == id);
                    _logger.LogDebug($"{loggerHeader} - Start to DeactivateAccount with Id: {id}");
                    account.IsActive = false;
                    account.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    account.LastModified = DateTime.UtcNow;
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == account.Id);
                    apiResponse.Data = _mapper.Map<Account, AccountResponse>(account);
                    _logger.LogDebug($"{loggerHeader} - DeactivateAccount successfully with Id: {account.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Account";
                    changelogResource.API = $"{loggerHeader} - DeactivateAccount successfully with Id: {account.Id}";
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

        public async Task<ApiResponse<AccountResponse>> ActivateAccount(long id)
        {
            const string loggerHeader = "ActivateAccount";
            var apiResponse = new ApiResponse<AccountResponse>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == id);
                    _logger.LogDebug($"{loggerHeader} - Start to ActivateAccount with Id: {id}");
                    account.IsActive = true;
                    account.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    account.LastModified = DateTime.UtcNow;
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == account.Id);
                    apiResponse.Data = _mapper.Map<Account, AccountResponse>(account);
                    _logger.LogDebug($"{loggerHeader} - ActivateAccount successfully with Id: {account.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Account";
                    changelogResource.API = $"{loggerHeader} - ActivateAccount successfully with Id: {account.Id}";
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

        public async Task<ApiResponse<AccountResponse>> DeleteAccount(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteAccount";
            var apiResponse = new ApiResponse<AccountResponse>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteAccount with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.AccountRepository.Remove(account);
                    }
                    else
                    {
                        account.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        account.IsDeleted = true;
                        account.LastModified = DateTime.UtcNow;
                        unitOfWork.AccountRepository.Update(account);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteAccount successfully with Id: {account.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Account";
                    changelogResource.API = $"{loggerHeader} - DeleteAccount successfully with Id: {account.Id}";
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

        public async Task<ApiResponse<AccountResponse>> GetAccount(long id)
        {
            const string loggerHeader = "GetAccount";
            var apiResponse = new ApiResponse<AccountResponse>();
            _logger.LogDebug($"{loggerHeader} - Start to GetAccount with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Id == id,
                                        include: source => source.Include(d => d.Favorites.Where(c => !c.IsDeleted)));
                    apiResponse.Data = _mapper.Map<Account, AccountResponse>(account);
                    _logger.LogDebug($"{loggerHeader} - GetAccount successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<AccountResponse>>> GetAccounts(QueryResource queryObj)
        {
            const string loggerHeader = "GetAccounts";
            var apiResponse = new ApiResponse<QueryResultResource<AccountResponse>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetAccounts");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {

                    var query = await unitOfWork.AccountRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                            && ((!queryObj.Gender.HasValue ? (d.Gender == true || d.Gender == false) : d.Gender == queryObj.Gender))
                                                                            && (!queryObj.Role.HasValue || d.Role == queryObj.Role)
                                                                            && ((String.IsNullOrEmpty(queryObj.FullName)) || (EF.Functions.Like(d.FullName, $"%{queryObj.FullName}%"))
                                                                            && ((String.IsNullOrEmpty(queryObj.Email)) || EF.Functions.Like(d.Email, $"%{queryObj.Email}%")))
                                                                            && (!queryObj.IsActive.HasValue || d.IsActive == queryObj.IsActive),
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<Account>, QueryResultResource<AccountResponse>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetAccounts successfully");
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

        public async Task<ApiResponse<AuthenticateResponse>> Authenticate(AuthenticateRequest authenticateRequest, string ipAddress)
        {
            const string loggerHeader = "Authenticate";
            var apiResponse = new ApiResponse<AuthenticateResponse>();
            _logger.LogDebug($"{loggerHeader} - Start to Authenticate with Email: {authenticateRequest.Email}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Email == authenticateRequest.Email && !d.IsDeleted);
                    if (account == null || !account.IsVerified || !BC.Verify(authenticateRequest.Password, account.PasswordHash))
                    {
                        throw new AppException("Email or password is incorrect");
                    }
                    else
                    {
                        var jwtToken = GenerateJwtToken(account);
                        var refreshToken = GenerateRefreshToken(ipAddress);
                        account.RefreshTokens.Add(refreshToken);
                        RemoveOldRefreshTokens(account);
                        unitOfWork.AccountRepository.Update(account);
                        await unitOfWork.SaveChanges();
                        apiResponse.Data = _mapper.Map<Account, AuthenticateResponse>(account);
                        apiResponse.Data.JwtToken = jwtToken;
                        apiResponse.Data.RefreshToken = refreshToken.Token;
                        _logger.LogDebug($"{loggerHeader} - Authenticate successfully with Email: {authenticateRequest.Email}");
                    }
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

        public async Task<ApiResponse<AuthenticateResponse>> RefreshToken(string token, string ipAddress)
        {
            const string loggerHeader = "RefreshToken";
            var apiResponse = new ApiResponse<AuthenticateResponse>();
            _logger.LogDebug($"{loggerHeader} - Start to RefreshToken");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var (refreshToken, account) = await GetRefreshToken(token);
                    var newRefreshToken = GenerateRefreshToken(ipAddress);
                    refreshToken.Revoked = DateTime.UtcNow;
                    refreshToken.RevokedByIp = ipAddress;
                    refreshToken.ReplacedByToken = newRefreshToken.Token;
                    account.RefreshTokens.Add(newRefreshToken);
                    RemoveOldRefreshTokens(account);
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    var jwtToken = GenerateJwtToken(account);
                    apiResponse.Data = _mapper.Map<Account, AuthenticateResponse>(account);
                    apiResponse.Data.JwtToken = jwtToken;
                    apiResponse.Data.RefreshToken = refreshToken.Token;
                    _logger.LogDebug($"{loggerHeader} - RefreshToken successfully");
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

        public async Task<ApiResponse<AuthenticateResponse>> RevokeToken(string token, string ipAddress)
        {
            const string loggerHeader = "RevokeToken";
            var apiResponse = new ApiResponse<AuthenticateResponse>();
            _logger.LogDebug($"{loggerHeader} - Start to RevokeToken");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var (refreshToken, account) = await GetRefreshToken(token);
                    refreshToken.Revoked = DateTime.UtcNow;
                    refreshToken.RevokedByIp = ipAddress;
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - RevokeToken successfully");
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

        public async Task<ApiResponse<RegisterRequest>> Register(RegisterRequest registerRequest, string origin)
        {
            const string loggerHeader = "Register";
            var apiResponse = new ApiResponse<RegisterRequest>();
            _logger.LogDebug($"{loggerHeader} - Start to Register: {JsonConvert.SerializeObject(registerRequest)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Email == registerRequest.Email);
                    if (account != null)
                    {
                        SendAlreadyRegisteredEmail(registerRequest.Email, origin);
                    }
                    else
                    {
                        account = _mapper.Map<Account>(registerRequest);
                        var isFirstAccount = unitOfWork.AccountRepository.FindAll().ToList().Count == 0;
                        account.Role = isFirstAccount ? Role.Admin : Role.User;
                        account.CreatedTime = DateTime.UtcNow;
                        account.IsActive = true;
                        account.VerificationToken = GenerateRandomTokenString();
                        account.PasswordHash = BC.HashPassword(registerRequest.Password);
                        await unitOfWork.AccountRepository.Add(account);
                        await unitOfWork.SaveChanges();
                        SendVerificationEmail(account, origin);
                        _logger.LogDebug($"{loggerHeader} - Register successfully with Email: {account.Email}");

                        var changelogResource = new ChangelogResource();
                        changelogResource.Service = "Account";
                        changelogResource.API = $"{loggerHeader} - Register successfully with Email: {account.Email}";
                        changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                        changelogResource.CreatedTime = DateTime.UtcNow;
                        changelogResource.IsDeleted = false;
                        await _changelogService.CreateChangelog(changelogResource);
                    }
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

        public async Task<ApiResponse<VerifyEmailRequest>> VerifyEmail(VerifyEmailRequest verifyEmailRequest)
        {
            const string loggerHeader = "VerifyEmail";
            var apiResponse = new ApiResponse<VerifyEmailRequest>();
            _logger.LogDebug($"{loggerHeader} - Start to VerifyEmail");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.VerificationToken == verifyEmailRequest.Token);
                    if (account == null)
                    {
                        throw new AppException("Verification failed");
                    }
                    account.VerifiedTime = DateTime.UtcNow;
                    account.VerificationToken = null;
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - VerifyEmail successfully with Email: {account.Email}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Account";
                    changelogResource.API = $"{loggerHeader} - VerifyEmail successfully with Email: {account.Email}";
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

        public async Task<ApiResponse<ForgotPasswordRequest>> ForgotPassword(ForgotPasswordRequest forgotPasswordRequest, string origin)
        {
            const string loggerHeader = "ForgotPassword";
            var apiResponse = new ApiResponse<ForgotPasswordRequest>();
            _logger.LogDebug($"{loggerHeader} - Start to ForgotPassword");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.Email == forgotPasswordRequest.Email);
                    if (account == null)
                    {
                        throw new AppException("Email has not registered");
                    }
                    else
                    {
                        account.ResetToken = GenerateRandomTokenString();
                        account.ResetTokenExpireTime = DateTime.UtcNow.AddDays(1);
                        unitOfWork.AccountRepository.Update(account);
                        await unitOfWork.SaveChanges();
                        SendPasswordResetEmail(account, origin);
                        _logger.LogDebug($"{loggerHeader} - ForgotPassword successfully");

                        var changelogResource = new ChangelogResource();
                        changelogResource.Service = "Account";
                        changelogResource.API = $"{loggerHeader} - ForgotPassword successfully with Email: {account.Email}";
                        changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                        changelogResource.CreatedTime = DateTime.UtcNow;
                        changelogResource.IsDeleted = false;
                        await _changelogService.CreateChangelog(changelogResource);
                    }
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

        public async Task<ApiResponse<ValidateResetTokenRequest>> ValidateResetToken(ValidateResetTokenRequest validateResetTokenRequest)
        {
            const string loggerHeader = "ValidateResetToken";
            var apiResponse = new ApiResponse<ValidateResetTokenRequest>();
            _logger.LogDebug($"{loggerHeader} - Start to ValidateResetToken");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.ResetToken == validateResetTokenRequest.Token && d.ResetTokenExpireTime > DateTime.UtcNow);
                    if (account == null)
                    {
                        throw new AppException("Invalid token");
                    }
                    _logger.LogDebug($"{loggerHeader} - ValidateResetToken successfully");
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

        public async Task<ApiResponse<ResetPasswordRequest>> ResetPassword(ResetPasswordRequest resetPasswordRequest)
        {
            const string loggerHeader = "ResetPassword";
            var apiResponse = new ApiResponse<ResetPasswordRequest>();
            _logger.LogDebug($"{loggerHeader} - Start to ResetPassword");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var account = await unitOfWork.AccountRepository.FindFirst(predicate: d => d.ResetToken == resetPasswordRequest.Token && d.ResetTokenExpireTime > DateTime.UtcNow);
                    if (account == null)
                    {
                        throw new AppException("Invalid token");
                    }
                    account.PasswordHash = BC.HashPassword(resetPasswordRequest.Password);
                    account.PasswordResetTime = DateTime.UtcNow;
                    account.ResetToken = null;
                    account.ResetTokenExpireTime = null;
                    unitOfWork.AccountRepository.Update(account);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - ResetPassword successfully with Email: {account.Email}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Account";
                    changelogResource.API = $"{loggerHeader} - ResetPassword successfully with Email: {account.Email}";
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

        private void RemoveOldRefreshTokens(Account account)
        {
            account.RefreshTokens.RemoveAll(x => !x.IsActive && x.Created.AddDays(2) <= DateTime.UtcNow);
        }

        private RefreshToken GenerateRefreshToken(string ipAddress)
        {
            return new RefreshToken
            {
                Token = GenerateRandomTokenString(),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }

        private string GenerateRandomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }

        private string GenerateJwtToken(Account account)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("1f093131-2cea-4f87-a32e-d1f2cfb98f30");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", account.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<(RefreshToken, Account)> GetRefreshToken(string token)
        {
            Account account = new Account();
            RefreshToken refreshToken = new Models.RefreshToken();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    account = await unitOfWork.AccountRepository.FindFirst(u => u.RefreshTokens.Any(t => t.Token == token));
                    if (account == null)
                    {
                        throw new AppException("Invalid token");
                    }
                    refreshToken = account.RefreshTokens.Single(x => x.Token == token);
                    if (!refreshToken.IsActive)
                    {
                        throw new AppException("Invalid token");
                    }
                }
                catch (Exception ex)
                {
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }
            return (refreshToken, account);
        }

        private void SendVerificationEmail(Account account, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                var verifyUrl = $"{origin}/accounts/verify-email?token={account.VerificationToken}";
                message = $@"<p>Please click the below link to verify your email address:</p>
                             <p><a href=""{verifyUrl}"">{verifyUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below token to verify your email address with the <code>/accounts/verify-email</code> api route:</p>
                             <p><code>{account.VerificationToken}</code></p>";
            }
            _emailService.Send(
                to: account.Email,
                subject: "FOR THE CHILDREN - Verify Email",
                html: $@"<h4>Verify Email</h4>
                         <p>Thanks for registering!</p>
                         {message}"
            );
        }

        private void SendAlreadyRegisteredEmail(string email, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                message = $@"<p>If you don't know your password please visit the <a href=""{origin}/account/forgot-password"">forgot password</a> page.</p>";
            }
            else
            {
                message = "<p>If you don't know your password you can reset it via the <code>/accounts/forgot-password</code> api route.</p>";
            }
            _emailService.Send(
                to: email,
                subject: "FOR THE CHILDREN - Email already registered",
                html: $@"<h4>Email already registered</h4>
                         <p>Your email <strong>{email}</strong> is already registered.</p>
                         {message}"
            );
        }

        private void SendPasswordResetEmail(Account account, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                var resetUrl = $"{origin}/accounts/reset-password?token={account.ResetToken}";
                message = $@"<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                             <p><a href=""{resetUrl}"">{resetUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below token to reset your password with the <code>/accounts/reset-password</code> api route:</p>
                             <p><code>{account.ResetToken}</code></p>";
            }
            _emailService.Send(
                to: account.Email,
                subject: "FOR THE CHILDREN - Reset Password",
                html: $@"<h4>Reset Password Email</h4>
                         {message}"
            );
        }

        public async Task<ApiResponse<List<TopDonationUser>>> GetTopDonationUsers(int limit)
        {
            const string loggerHeader = "GetTopDonationUsers";
            var apiResponse = new ApiResponse<List<TopDonationUser>>();
            var topDonationUsers = new List<TopDonationUser>();
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            _logger.LogDebug($"{loggerHeader} - Start to GetTopDonationUsers");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var accounts = await unitOfWork.AccountRepository.FindAllToList(predicate: d => d.IsDeleted == false && d.IsActive == true && d.Role == Role.User,
                                                                       include: source => source.Include(i => i.Donations.Where(c => !c.IsDeleted)));
                    if (accounts != null && accounts.Count > 0)
                    {
                        foreach (var account in accounts)
                        {
                            int count = 0;
                            var topDonationUser = new TopDonationUser();
                            topDonationUser.FullName = account.FullName;
                            topDonationUser.Email = account.Email;
                            var donations = account.Donations.ToList();
                            if (donations != null && donations.Count > 0)
                            {
                                foreach (var donation in donations)
                                {
                                    if (donation.CreatedTime <= endDate && donation.CreatedTime >= startDate)
                                    {
                                        count++;
                                    }
                                }
                                topDonationUser.Value = count;
                                topDonationUsers.Add(topDonationUser);
                            }
                        }
                    }
                    apiResponse.Data = topDonationUsers.OrderByDescending(d => d.Value).Take(limit).ToList();
                    _logger.LogDebug($"{loggerHeader} - GetTopDonationUsers successfully");
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
