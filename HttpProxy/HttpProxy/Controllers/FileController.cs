using HttpProxy.Enums;
using HttpProxy.Models;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace HttpProxy.Controllers
{
  public class FileController : ApiController
  {
    public static string UploadFolder = ConfigurationManager.AppSettings["UploadFolder"];
    private string GetJsonFile(UploadType type)
    {
      return $"{UploadFolder}\\{type}.json";
    }

    [HttpGet, Route("api/EmojiUploadFileConcat"), EnableCors("*", "*", "*")]
    public void EmojiUploadFileConcat()
    {
      var path = $"{UploadFolder}\\{UploadType.Emoji}";
      var folder = new DirectoryInfo(path);
      //                                                           覆盖
      using (StreamWriter sw = new StreamWriter(GetJsonFile(UploadType.Emoji), false, Encoding.UTF8))
      {
        foreach (var file in folder.GetFiles())
        {
          sw.WriteLine($"\"{file.Name}\",");
        }
      }
    }

    /// <summary>
    /// 文件上传
    /// </summary>
    /// <param name="request"></param>
    [HttpPost, Route("api/UploadFile"), EnableCors("*", "*", "*")]
    public void UploadFile(FileUploadRequest request)
    {
      var folderPath = $"{UploadFolder}\\{request.Type}";
      string path;
      // 非网络资源先上传文件
      if (request.Online)
      {
        path = request.Url;
      }
      else
      {
        // 上传存储
        HttpPostedFile file = HttpContext.Current.Request.Files[0];
        string type = file.ContentType;
        // string name = DateTime.Now.ToString("yyyyMMddhhmmss") + "_" + file.FileName;
        path = HostingEnvironment.MapPath($"{folderPath}\\{request.IdolName}{request.Key}.{type}");
        file.SaveAs(path);
      }

      //                                                                   追加
      using (StreamWriter sw = new StreamWriter(GetJsonFile(request.Type), true, Encoding.UTF8))
      {
        switch (request.Type)
        {
          case UploadType.Painting:
            sw.WriteLine(string.Format("{\"author\": \"{0}\",\"url\": \"{1}\",\"weibo\": \"{2}\"}", "", path, request.Weibo));
            break;
          case UploadType.Photo:
            sw.WriteLine(string.Format("{\"title\": \"{0}\",\"img\": \"{1}\", \"from\": \"{2}\"}", request.Key, path, request.IdolName));
            break;
          case UploadType.Emoji:
            sw.WriteLine(path);
            break;
          default:
            break;
        }
      }
    }
  }
}
