using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/donations")]//required for default versioning
    [Route("api/v{version:apiVersion}/donations")]
    [ApiController]
    public class DonationController : Controller
    {
        private IDonationService _donationService;

        public DonationController(IDonationService donationService)
        {
            this._donationService = donationService;
        }

        // GET: api/donations
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _donationService.GetDonations(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/donations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _donationService.GetDonation(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/donations
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DonationResource DonationResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _donationService.CreateDonation(DonationResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/donations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] DonationResource DonationResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _donationService.UpdateDonation(id, DonationResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/donations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _donationService.DeleteDonation(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("approve/{id}")]
        public async Task<IActionResult> Approve(long id)
        {
            var apiResponse = await _donationService.ApproveDonation(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("reject/{id}")]
        public async Task<IActionResult> Reject(long id)
        {
            var apiResponse = await _donationService.RejectDonation(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("cancel/{id}")]
        public async Task<IActionResult> Cancel(long id)
        {
            var apiResponse = await _donationService.CancelDonation(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpGet]
        [Route("getStatistics")]
        public async Task<IActionResult> Statistic()
        {
            var apiResponse = await _donationService.GetDonationStatusStatistics();
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
