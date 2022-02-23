using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.DataContracts.ViewModels;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/childrenProfiles")]//required for default versioning
    [Route("api/v{version:apiVersion}/childrenProfiles")]
    [ApiController]
    public class ChildrenProfileController : Controller
    {
        private IChildrenProfileService _childrenProfileService;

        public ChildrenProfileController(IChildrenProfileService childrenProfileService)
        {
            this._childrenProfileService = childrenProfileService;
        }

        // GET: api/childrenProfiles
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _childrenProfileService.GetChildrenProfiles(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/childrenProfiles/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _childrenProfileService.GetChildrenProfile(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/childrenProfiles
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChildrenProfileResource ChildrenProfileResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenProfileService.CreateChildrenProfile(ChildrenProfileResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/childrenProfiles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ChildrenProfileResource ChildrenProfileResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenProfileService.UpdateChildrenProfile(id, ChildrenProfileResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/childrenProfiles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _childrenProfileService.DeleteChildrenProfile(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPost]
        [Route("{id}/uploadImage")]
        public async Task<IActionResult> UploadPersonalProfileImage(long id, IFormFile file)
        {
            var apiResponse = await _childrenProfileService.UploadChildrenProfileImage(id, file);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPost]
        [Route("{id}/uploadImageBase64")]
        public async Task<IActionResult> UploadPersonalProfileAvatarBase64(long id, [FromBody] Base64File base64File)
        {
            var apiResponse = await _childrenProfileService.UploadChildrenProfileImageBase64(id, base64File.Base64);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpGet]
        [Route("{id}/getImage")]
        public async Task<IActionResult> GetPersonalProfileImage(long id)
        {
            var apiResponse = await _childrenProfileService.GetChildrenProfileImage(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : File(apiResponse.Data, "image/png");
        }
    }
}
