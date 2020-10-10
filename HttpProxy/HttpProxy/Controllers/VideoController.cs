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
  [EnableCorsAttribute("*", "*", "*")]
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
    public List<object[]> GetDanmaku(string id, int max)
    {
      try
      {
        var danmaku = File.ReadAllLines(@"C:\inetpub\wwwroot\json\Danmaku\" + id + ".json", System.Text.Encoding.UTF8).ToList();
        var result = new List<object[]>();
        danmaku.ForEach(x =>
        {
          result.Add(JsonConvert.DeserializeObject<object[]>(x));
        });
        return result;
      }
      catch (Exception ex)
      {
        return new List<object[]>();
      }
    }

    [HttpPost, Route("api/danmakuv3")]
    public bool SendDanmaku(DanmakuRequest request)
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
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }
  }
}
