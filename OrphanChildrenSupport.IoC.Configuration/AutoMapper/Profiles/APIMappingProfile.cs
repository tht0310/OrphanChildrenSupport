using AutoMapper;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Models.Accounts;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;

namespace OrphanChildrenSupport.IoC.Configuration.AutoMapper.Profiles
{
    public class APIMappingProfile : Profile
    {
        public APIMappingProfile()
        {
            CreateMap<ChildrenProfile, ChildrenProfileResource>().ReverseMap();
            CreateMap<ChildrenProfile, ChildrenProfileResponse>().ReverseMap();
            CreateMap<SupportCategory, SupportCategoryResource>().ReverseMap();
            CreateMap<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResource>().ReverseMap();
            CreateMap<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResponse>().ReverseMap();
            CreateMap<Donation, DonationResource>().ReverseMap();
            CreateMap<DonationDetail, DonationDetailResource>().ReverseMap();
            CreateMap<ChildrenProfileImage, ChildrenProfileImageResource>().ReverseMap();
            CreateMap<Favorite, FavoriteResource>().ReverseMap();
            CreateMap<Report, ReportResource>().ReverseMap();
            CreateMap<ReportDetail, ReportDetailResource>().ReverseMap();
            CreateMap<ReportFieldCategory, ReportFieldCategoryResource>().ReverseMap();
            CreateMap<Notification, NotificationResource>().ReverseMap();
            CreateMap<Changelog, ChangelogResource>().ReverseMap();
            CreateMap<Account, RegisterRequest>().ReverseMap();
            CreateMap<Account, AuthenticateResponse>().ReverseMap();
            CreateMap<Account, AccountResponse>().ReverseMap();
            CreateMap<Account, UpdateRequest>().ReverseMap();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
        }
    }
}
