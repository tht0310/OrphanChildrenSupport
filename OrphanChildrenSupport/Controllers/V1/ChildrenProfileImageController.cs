using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/childrenProfileImages")]//required for default versioning
    [Route("api/v{version:apiVersion}/childrenProfileImages")]
    [ApiController]
    public class ChildrenProfileImageController : Controller
    {
        private IChildrenProfileImageService _childrenProfileImageService;

        public ChildrenProfileImageController(IChildrenProfileImageService childrenProfileImageService)
        {
            this._childrenProfileImageService = childrenProfileImageService;
        }

        // GET: api/childrenProfileImages
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _childrenProfileImageService.GetChildrenProfileImages(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/childrenProfileImages/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _childrenProfileImageService.GetChildrenProfileImage(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/childrenProfileImages
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChildrenProfileImageResource ChildrenProfileImageResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenProfileImageService.CreateChildrenProfileImage(ChildrenProfileImageResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/childrenProfileImages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ChildrenProfileImageResource ChildrenProfileImageResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenProfileImageService.UpdateChildrenProfileImage(id, ChildrenProfileImageResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/childrenProfileImages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _childrenProfileImageService.DeleteChildrenProfileImage(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpGet]
        [Route("viewImage/{id}")]
        public async Task<IActionResult> ViewChildrenProfileImage(long id)
        {
            var apiResponse = await _childrenProfileImageService.ViewChildrenProfileImage(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : File(apiResponse.Data, "image/png");
        }

        [HttpGet]
        [Route("getImagesByChildrenProfileId/{id}")]
        public async Task<IActionResult> GetImagesByChildrenProfileId(long id)
        {
            var apiResponse = await _childrenProfileImageService.GetImagesByChildrenProfileId(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPost]
        [Route("uploadImagesByChildrenProfileId/{id}")]
        public async Task<IActionResult> UploadImagesByChildrenProfileId(long id, List<IFormFile> files)
        {
            var apiResponse = await _childrenProfileImageService.UploadImagesByChildrenProfileId(id, files);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
