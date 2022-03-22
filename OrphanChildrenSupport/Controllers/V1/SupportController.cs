using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/supports")]//required for default versioning
    [Route("api/v{version:apiVersion}/supports")]
    [ApiController]
    public class SupportController : Controller
    {
        private ISupportService _supportService;

        public SupportController(ISupportService supportService)
        {
            this._supportService = supportService;
        }

        // GET: api/supports
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _supportService.GetSupports(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/supports/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _supportService.GetSupport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/supports
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SupportResource SupportResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _supportService.CreateSupport(SupportResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/supports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] SupportResource SupportResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _supportService.UpdateSupport(id, SupportResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/supports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _supportService.DeleteSupport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
