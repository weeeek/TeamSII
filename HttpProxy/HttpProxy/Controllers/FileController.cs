using HttpProxy.Enums;
using HttpProxy.Models;
using HttpProxy.Models.Upload;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace HttpProxy.Controllers
{
  public class FileController : ApiController
  {
    public static string UploadFolder = ConfigurationManager.AppSettings["UploadFolder"];
    private string GetJsonFile(string type)
    {
      return $"{UploadFolder}\\{type}.json";
    }

    [HttpGet, Route("api/EmojiUploadFileConcat")]
    public void EmojiUploadFileConcat()
    {
      var path = $"{UploadFolder}\\{UploadType.Emoji}";
      var folder = new DirectoryInfo(path);
      //                                                           覆盖
      using (StreamWriter sw = new StreamWriter(GetJsonFile("Emoji"), false, Encoding.UTF8))
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
    [HttpPost, Route("api/UploadFile")]
    public void UploadFile()
    {
      string path;
      //获取参数信息
      var forms = HttpContext.Current.Request.Form;      //定义传统request对象
      FileUploadRequest request = new FileUploadRequest()
      {
        Online = Convert.ToBoolean(forms["Online"]),
        Type = forms["Type"],
        Key = forms["Key"],
        IdolName = forms["IdolName"],
        Url = forms["Url"],
        Weibo = forms["Weibo"]
      };

      // 非网络资源先上传文件
      if (request.Online)
      {
        path = request.Url;
      }
      else
      {
        var folderPath = $"C:\\inetpub\\wwwroot\\static\\import\\{request.Type}";
        // 上传存储
        HttpPostedFile file = HttpContext.Current.Request.Files[0];
        string type = file.FileName.Split('.')[1];
        path = $"{folderPath}\\{request.IdolName}{request.Key}{DateTime.Now.ToString("yyyyMMddhhmmss")}.{type}";
        file.SaveAs(path);
        path = $"http://47.97.248.244/static/{request.Type}/{request.IdolName}{request.Key}.{type}";
      }

      //                                                                   追加
      using (StreamWriter sw = new StreamWriter(GetJsonFile(request.Type), true, Encoding.UTF8))
      {
        switch (request.Type)
        {
          case "Painting":
            sw.WriteLine(JsonConvert.SerializeObject(new UploadTypeJsonPainting()
            {
              author = "",
              url = path,
              weibo = request.Weibo
            }));
            break;
          case "Photo":
            sw.WriteLine(JsonConvert.SerializeObject(new UploadTypeJsonPhoto()
            {
              title = request.Key,
              img = path,
              from = request.IdolName
            }));
            break;
          case "Emoji":
            sw.WriteLine(path);
            break;
          default:
            break;
        }
      }
    }
  }
}
