using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/donationDetails")]//required for default versioning
    [Route("api/v{version:apiVersion}/donationDetails")]
    [ApiController]
    public class DonationDetailController : Controller
    {
        private IDonationDetailService _donationDetailService;

        public DonationDetailController(IDonationDetailService donationDetailService)
        {
            this._donationDetailService = donationDetailService;
        }

        // GET: api/donationDetails
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _donationDetailService.GetDonationDetails(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/donationDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _donationDetailService.GetDonationDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/donationDetails
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DonationDetailResource DonationDetailResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _donationDetailService.CreateDonationDetail(DonationDetailResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/donationDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] DonationDetailResource DonationDetailResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _donationDetailService.UpdateDonationDetail(id, DonationDetailResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/donationDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _donationDetailService.DeleteDonationDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("finish/{id}")]
        public async Task<IActionResult> Finish(long id)
        {
            var apiResponse = await _donationDetailService.Finish(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("cancel/{id}")]
        public async Task<IActionResult> Cancel(long id)
        {
            var apiResponse = await _donationDetailService.Cancel(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
