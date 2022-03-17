using OrphanChildrenSupport.Services.Models;
using System;
using System.Text.Json.Serialization;

namespace OrphanChildrenSupport.Models.Accounts
{
    public class AuthenticateResponse : EngineEntity
    {
        public string FullName { get; set; }
        public bool Gender { get; set; }
        public DateTime DOB { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DetailAddress { get; set; }
        public string PublicAddress { get; set; }
        public string Role { get; set; }
        public bool IsVerified { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }
    }
}