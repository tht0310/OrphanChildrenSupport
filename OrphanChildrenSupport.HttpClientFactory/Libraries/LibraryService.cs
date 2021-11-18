using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.HttpClientFactory.Libraries
{
    public class LibraryService
    {
        private HttpClient _httpClient;

        public LibraryService(HttpClient client)
        {
            _httpClient = client;
        }

        public async Task<UploadFileResponse> UploadFile(List<IFormFile> files, string folderid, string type)
        {
            MultipartFormDataContent multiContent = new MultipartFormDataContent();
            foreach (var file in files)
            {
                byte[] data;
                using (var br = new BinaryReader(file.OpenReadStream()))
                {
                    data = br.ReadBytes((int)file.OpenReadStream().Length);
                }
                ByteArrayContent bytes = new ByteArrayContent(data);
                multiContent.Add(bytes, "files", file.FileName);
            }
            multiContent.Add(new StringContent(folderid), "folderid");
            multiContent.Add(new StringContent(type), "type");

            var response = await _httpClient.PostAsync("api/workflow/UploadFile", multiContent);
            try
            {
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<UploadFileResponse>(responseString);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Response> CreateFiles(CreateFileModel model)
        {
            var json = JsonConvert.SerializeObject(model);
            var stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("api/workflow/CreateFiles", stringContent);
            try
            {
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<Response>(responseString);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public async Task<Response> Share(List<PersonalProfile> personalProfiles, long fileId)
        //{

        //    MultipartFormDataContent multiContent = new MultipartFormDataContent();
        //    var messageSendModelUsers = new List<MessageSendModelUser>();
        //    foreach (var personalProfile in personalProfiles)
        //    {
        //        messageSendModelUsers.Add(new MessageSendModelUser
        //        {
        //            value = personalProfile.AccountName,
        //            name = personalProfile.FullName,
        //            flag = "user"
        //        });
        //    }
        //    multiContent.Add(new StringContent(JsonConvert.SerializeObject(messageSendModelUsers)), "listUser");
        //    multiContent.Add(new StringContent("-" + fileId + "-"), "listFile");
        //    multiContent.Add(new StringContent("-"), "listFolder");
        //    multiContent.Add(new StringContent("0"), "type");
        //    multiContent.Add(new StringContent("0"), "pin");
        //    multiContent.Add(new StringContent("0"), "default");
        //    multiContent.Add(new StringContent("true"), "allowDownload");

        //    var response = await _httpClient.PostAsync("api/workflow/Share", multiContent);
        //    try
        //    {
        //        response.EnsureSuccessStatusCode();
        //        var responseString = await response.Content.ReadAsStringAsync();

        //        return JsonConvert.DeserializeObject<Response>(responseString);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        public async Task<Base64Response> GetBase64Image(long id)
        {
            var response = await _httpClient.GetAsync("api/workflow/GetBase64/" + id);
            try
            {
                response.EnsureSuccessStatusCode();
                var responseString = await response.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<Base64Response>(responseString);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
