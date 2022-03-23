using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/supportDetails")]//required for default versioning
    [Route("api/v{version:apiVersion}/supportDetails")]
    [ApiController]
    public class SupportDetailController : Controller
    {
        private ISupportDetailService _supportDetailService;

        public SupportDetailController(ISupportDetailService supportDetailService)
        {
            this._supportDetailService = supportDetailService;
        }

        // GET: api/supportDetails
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _supportDetailService.GetSupportDetails(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/supportDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _supportDetailService.GetSupportDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/supportDetails
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SupportDetailResource SupportDetailResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _supportDetailService.CreateSupportDetail(SupportDetailResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/supportDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] SupportDetailResource SupportDetailResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _supportDetailService.UpdateSupportDetail(id, SupportDetailResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/supportDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _supportDetailService.DeleteSupportDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
