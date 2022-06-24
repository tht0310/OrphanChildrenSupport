using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.Services.Models
{
    public class Account : EngineEntity
    {
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string PasswordHash { get; set; }
        public Role Role { get; set; }
        public string VerificationToken { get; set; }
        public DateTime? VerifiedTime { get; set; }
        public bool IsVerified => VerifiedTime.HasValue || PasswordResetTime.HasValue;
        public string ResetToken { get; set; }
        public DateTime? ResetTokenExpireTime { get; set; }
        public DateTime? PasswordResetTime { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; }
        public bool OwnsToken(string token)
        {
            return this.RefreshTokens?.Find(x => x.Token == token) != null;
        }
        public bool IsActive { get; set; }
        public ICollection<Favorite> Favorites { get; set; }

        public ICollection<Notification> Notifications { get; set; }

        public ICollection<Donation> Donations { get; set; }
    }

}