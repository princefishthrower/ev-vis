using System.Collections.Generic;
using System.IO;
using ev_vis.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;

namespace ev_vis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UpdateController
    {
        [HttpGet]
        public IEnumerable<UpdateModel> Get()
        {
            var physicalProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory());
            using (var reader = new StreamReader(Path.Combine(physicalProvider.Root, "App_Data", "updates.json")))
            {
                var content = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<List<UpdateModel>>(content);
            }
        }
    }
}
