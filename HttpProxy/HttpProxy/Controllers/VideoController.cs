using HttpProxy.Models.DPlayer;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace HttpProxy.Controllers
{
    public class VideoController : ApiController
	{
		/// <summary>
		/// 读取对应json文件并序列化成对象
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet, Route("api/GetVideoOption")]
		public string GetVideoOption(string id)
		{
			// 根据id读取对应的json文件
			var data = File.ReadAllText(@"C:\inetpub\wwwroot\json\Video\" + id + ".json", System.Text.Encoding.UTF8);
			return data;
		}

    [HttpGet, Route("api/danmakuv3")]
    public Response<List<object[]>> GetDanmaku(string id, int max)
    {
      try
      {
        var danmaku = File.ReadAllLines(@"C:\inetpub\wwwroot\json\Danmaku\" + id + ".json", System.Text.Encoding.UTF8).ToList().Where(s => !string.IsNullOrEmpty(s)).ToList();
        var result = new List<object[]>();
        danmaku.ForEach(x =>
        {
          result.Add(JsonConvert.DeserializeObject<object[]>(x));
        });
        return new Response<List<object[]>>(result);
      }
      catch (Exception ex)
      {
        return new Response<List<object[]>>(null);
      }
    }

    [HttpPost, Route("api/danmakuv3")]
    public Response<bool> SendDanmaku(DanmakuRequest request)
    {
      try
      {
        var path = @"C:\inetpub\wwwroot\json\Danmaku\" + request.id + ".json";
        if (!File.Exists(path))
        {
          using (FileStream fs = new FileStream(path, FileMode.CreateNew, FileAccess.ReadWrite))
          {
            using (StreamWriter sw = new StreamWriter(fs))
            {
              sw.WriteLine(string.Format("[{0}, {1}, {2}, \"{3}\", \"{4}\"]", request.time, request.type, request.color, "site", request.text));// 直接追加文件末尾，换行
              sw.Flush();
              sw.Close();
            }
            fs.Close();
          }
        }
        else
        {
          using (StreamWriter sw = new StreamWriter(path, true, System.Text.Encoding.UTF8))
          {
            sw.WriteLine(string.Format("[{0}, {1}, {2}, \"{3}\", \"{4}\"]", request.time, request.type, request.color, "site", request.text));// 直接追加文件末尾，换行 
          }
        }
        return new Response<bool>(true);
      }
      catch (Exception ex)
      {
        return new Response<bool>(false);
      }
    }
  }
}
