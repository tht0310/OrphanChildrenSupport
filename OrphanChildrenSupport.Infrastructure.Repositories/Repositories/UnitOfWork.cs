using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OrphanChildrenSupport.Infrastructure.Data;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Reflection;
using System.Threading.Tasks;
using WorkFlow.API.DataContracts.Constants;

namespace OrphanChildrenSupport.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly OrphanChildrenSupportDbContext _context;
        private readonly ILogger _logger;
        private string _connectionString;

        #region DBSet Repotiory
        private IAsyncRepository<ChildrenProfile> _childrenProfileRepository;
        private IAsyncRepository<SupportCategory> _supportCategoryRepository;
        private IAsyncRepository<ChildrenProfileSupportCategory> _childrenProfileSupportCategoryRepository;
        private IAsyncRepository<Donation> _donationRepository;
        private IAsyncRepository<DonationDetail> _donationDetailRepository;
        private IAsyncRepository<ChildrenProfileImage> _childrenProfileImageRepository;
        private IAsyncRepository<Favorite> _favoriteRepository;
        private IAsyncRepository<Report> _reportRepository;
        private IAsyncRepository<ReportDetail> _reportDetailRepository;
        private IAsyncRepository<ReportFieldCategory> _reportFieldCategoryRepository;
        private IAsyncRepository<Notification> _notificationRepository;
        private IAsyncRepository<Changelog> _changelogRepository;
        private IAsyncRepository<Account> _accountRepository;

        public IAsyncRepository<ChildrenProfile> ChildrenProfileRepository => _childrenProfileRepository ?? (_childrenProfileRepository = new EfRepository<ChildrenProfile>(_context));
        public IAsyncRepository<SupportCategory> SupportCategoryRepository => _supportCategoryRepository ?? (_supportCategoryRepository = new EfRepository<SupportCategory>(_context));
        public IAsyncRepository<ChildrenProfileSupportCategory> ChildrenProfileSupportCategoryRepository => _childrenProfileSupportCategoryRepository ?? (_childrenProfileSupportCategoryRepository = new EfRepository<ChildrenProfileSupportCategory>(_context));
        public IAsyncRepository<Donation> DonationRepository => _donationRepository ?? (_donationRepository = new EfRepository<Donation>(_context));
        public IAsyncRepository<DonationDetail> DonationDetailRepository => _donationDetailRepository ?? (_donationDetailRepository = new EfRepository<DonationDetail>(_context));
        public IAsyncRepository<ChildrenProfileImage> ChildrenProfileImageRepository => _childrenProfileImageRepository ?? (_childrenProfileImageRepository = new EfRepository<ChildrenProfileImage>(_context));
        public IAsyncRepository<Favorite> FavoriteRepository => _favoriteRepository ?? (_favoriteRepository = new EfRepository<Favorite>(_context));
        public IAsyncRepository<Report> ReportRepository => _reportRepository ?? (_reportRepository = new EfRepository<Report>(_context));
        public IAsyncRepository<ReportDetail> ReportDetailRepository => _reportDetailRepository ?? (_reportDetailRepository = new EfRepository<ReportDetail>(_context));
        public IAsyncRepository<ReportFieldCategory> ReportFieldCategoryRepository => _reportFieldCategoryRepository ?? (_reportFieldCategoryRepository = new EfRepository<ReportFieldCategory>(_context));
        public IAsyncRepository<Notification> NotificationRepository => _notificationRepository ?? (_notificationRepository = new EfRepository<Notification>(_context));
        public IAsyncRepository<Changelog> ChangelogRepository => _changelogRepository ?? (_changelogRepository = new EfRepository<Changelog>(_context));
        public IAsyncRepository<Account> AccountRepository => _accountRepository ?? (_accountRepository = new EfRepository<Account>(_context));
        #endregion

        public UnitOfWork(string connectionString)
        {
            _connectionString = connectionString;
            var optionsBuilder = new DbContextOptionsBuilder<OrphanChildrenSupportDbContext>();
            optionsBuilder.UseSqlServer(connectionString);
            _context = new OrphanChildrenSupportDbContext(optionsBuilder.Options);
            var loggerFactory = new LoggerFactory();
            _logger = loggerFactory.CreateLogger<UnitOfWork>();
        }

        public async Task SaveChanges()
        {
            const string loggerHeader = "UnitOfWork";
            using (var dbContextTransaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    await _context.SaveChangesAsync();
                    await dbContextTransaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    await dbContextTransaction.RollbackAsync();
                    await SaveErrorLog(ex);
                    throw;
                }
            }
        }

        public async Task ExecuteCommonStoreProcedure(string spName, SqlParameter[] sqlParameters)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                using (SqlCommand comm = new SqlCommand("SET ARITHABORT ON", conn))
                {
                    comm.ExecuteNonQuery();
                }
                SqlCommand cmd = new SqlCommand(spName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;

                foreach (var para in sqlParameters)
                {
                    cmd.Parameters.Add(para);
                }

                // execute the command
                using (var rdr = await cmd.ExecuteReaderAsync())
                { }

                conn.Dispose();
            }
        }

        public async Task DeleteChildrenProfileSupportCategories(long childrenProfileId)
        {
            string spName = StoreProcedureConstants.SP_DeleteChildrenProfileSuportCategories;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                using (SqlCommand comm = new SqlCommand("SET ARITHABORT ON", conn))
                {
                    comm.ExecuteNonQuery();
                }
                SqlCommand cmd = new SqlCommand(spName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;

                cmd.Parameters.Add(new SqlParameter("@ChildrenProfileId", childrenProfileId));

                // execute the command
                await cmd.ExecuteReaderAsync();

                await conn.DisposeAsync();
            }
        }

        public async Task DeleteReportDetails(long reportId)
        {
            string spName = StoreProcedureConstants.SP_DeleteReportDetails;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                using (SqlCommand comm = new SqlCommand("SET ARITHABORT ON", conn))
                {
                    comm.ExecuteNonQuery();
                }
                SqlCommand cmd = new SqlCommand(spName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;

                cmd.Parameters.Add(new SqlParameter("@ReportId", reportId));

                // execute the command
                await cmd.ExecuteReaderAsync();

                await conn.DisposeAsync();
            }
        }

        public async Task DeleteDonationDetails(long donationId)
        {
            string spName = StoreProcedureConstants.SP_DeleteDonationDetails;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                using (SqlCommand comm = new SqlCommand("SET ARITHABORT ON", conn))
                {
                    comm.ExecuteNonQuery();
                }
                SqlCommand cmd = new SqlCommand(spName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;

                cmd.Parameters.Add(new SqlParameter("@DonationId", donationId));

                // execute the command
                await cmd.ExecuteReaderAsync();

                await conn.DisposeAsync();
            }
        }

        public async Task DeleteFavorites(long accountId)
        {
            string spName = StoreProcedureConstants.SP_DeleteFavorites;
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                using (SqlCommand comm = new SqlCommand("SET ARITHABORT ON", conn))
                {
                    comm.ExecuteNonQuery();
                }
                SqlCommand cmd = new SqlCommand(spName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandTimeout = 0;

                cmd.Parameters.Add(new SqlParameter("@AccountId", accountId));

                // execute the command
                await cmd.ExecuteReaderAsync();

                await conn.DisposeAsync();
            }
        }

        public async Task SaveErrorLog(Exception ex)
        {
            try
            {
                int code = 0;
                var w32ex = ex as Win32Exception;
                if (w32ex == null)
                {
                    w32ex = ex.InnerException as Win32Exception;
                }
                if (w32ex != null)
                {
                    code = w32ex.ErrorCode;
                }

                var ErrorLog = new ErrorLog
                {
                    Time = DateTime.UtcNow,
                    Number = code.ToString(),
                    Name = ex.GetType().Name,
                    Description = ex.Message,
                    IsDeleted = false
                };

                var commandText = @"INSERT ErrorLog (Name, Number, Time, Description, IsDeleted)
                                    VALUES (@Name, @Number, @Time, @Description, I@sDeleted)";

                SqlParameter[] parameters = new[]{
                    new SqlParameter("@Name", ErrorLog.Name),
                    new SqlParameter("@Number", ErrorLog.Number),
                    new SqlParameter("@Time", ErrorLog.Time),
                    new SqlParameter("@Description", ErrorLog.Description),
                    new SqlParameter("@IsDeleted", ErrorLog.IsDeleted),
                };
                await _context.Database.ExecuteSqlRawAsync(commandText, parameters);
            }
            catch { }
        }

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }

        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr.IsNull(column.ColumnName) ? null : dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

        #region IDisposable Support  
        private bool _disposedValue = false;

        protected virtual async Task Dispose(bool disposing)
        {
            if (_disposedValue) return;

            if (disposing)
            {
                await _context.DisposeAsync();
            }

            _disposedValue = true;
        }

        public void Dispose()
        {
            Dispose(true).Wait();
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
