using HttpProxy.Models.DPlayer;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace HttpProxy.Controllers
{
    [EnableCors("*", "*", "*")]
    public class VideoController : ApiController
    {
        /// <summary>
        /// 读取对应json文件并序列化成对象
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet, Route("api/GetVideoOption")]
        public Options GetVideoOption(string id) {
            // 根据id读取对应的json文件
            var data = File.ReadAllText(@$"C:\inetpub\wwwroot\json\Video\{id}.json");
            return JsonConvert.DeserializeObject<Options>(data);
        }

        [HttpPost, Route("api/GetVideoOption")]
        public void Danmaku() { 
            
        }
    }
}
