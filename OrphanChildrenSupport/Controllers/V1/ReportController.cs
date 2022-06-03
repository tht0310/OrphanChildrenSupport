using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/deports")]//required for default versioning
    [Route("api/v{version:apiVersion}/deports")]
    [ApiController]
    public class ReportController : Controller
    {
        private IReportService _deportService;

        public ReportController(IReportService deportService)
        {
            this._deportService = deportService;
        }

        // GET: api/deports
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _deportService.GetReports(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/deports/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _deportService.GetReport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/deports
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReportResource ReportResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _deportService.CreateReport(ReportResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/deports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ReportResource ReportResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _deportService.UpdateReport(id, ReportResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/deports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _deportService.DeleteReport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("approve/{id}")]
        public async Task<IActionResult> Approve(long id)
        {
            var apiResponse = await _deportService.Approve(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("reject/{id}")]
        public async Task<IActionResult> Reject(long id)
        {
            var apiResponse = await _deportService.Reject(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("cancel/{id}")]
        public async Task<IActionResult> Cancel(long id)
        {
            var apiResponse = await _deportService.Cancel(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
