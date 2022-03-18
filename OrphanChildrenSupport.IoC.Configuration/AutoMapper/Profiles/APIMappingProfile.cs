using AutoMapper;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Models.Accounts;
using OrphanChildrenSupport.Services.Models.DBSets;

namespace OrphanChildrenSupport.IoC.Configuration.AutoMapper.Profiles
{
    public class APIMappingProfile : Profile
    {
        public APIMappingProfile()
        {
            CreateMap<PersonalProfile, PersonalProfileResource>().ReverseMap();
            CreateMap<ChildrenProfile, ChildrenProfileResource>().ReverseMap();
            CreateMap<SupportCategory, SupportCategoryResource>().ReverseMap();
            CreateMap<ChildrenSupportCategory, ChildrenSupportCategoryResource>().ReverseMap();
            CreateMap<Account, RegisterRequest>().ReverseMap();
            CreateMap<Account, AuthenticateResponse>().ReverseMap();
            CreateMap<Account, AccountResponse>().ReverseMap();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
        }
    }
}
