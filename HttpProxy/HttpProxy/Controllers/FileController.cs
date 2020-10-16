using HttpProxy.Enums;
using HttpProxy.Models;
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

    [HttpPost, Route("api/Upload")]
    public void Upload(HttpPostedFile file)
    {
      var folderPath = $"{UploadFolder}\\Painting";
      string type = file.ContentType;
      // string name = DateTime.Now.ToString("yyyyMMddhhmmss") + "_" + file.FileName;
      var path = HostingEnvironment.MapPath($"{folderPath}\\{1}{2}.{type}");
      file.SaveAs(path);
    }

    /// <summary>
     /// 文件上传
     /// </summary>
     /// <param name="request"></param>
    [HttpPost, Route("api/UploadFile")]
    public void UploadFile(FileUploadRequest request)
    {
      // 上传存储
      HttpPostedFile file = HttpContext.Current.Request.Files[0];
      string type = file.ContentType;
      string path = System.Web.Hosting.HostingEnvironment.MapPath($"{ConfigurationManager.AppSettings["UploadFolder"]}\\{request.Type}\\{request.Key}.{type}");
      file.SaveAs(path);
    }

    /// <summary>
    /// 文件上传
    /// </summary>
    /// <param name="request"></param>
    [HttpPost, Route("api/FileUpload")]
    public void FileUpload(FileUploadRequest request)
    {
      try
      {
        string path;
        // 非网络资源先上传文件
        if (request.Online)
        {
          path = request.Url;
        }
        else
        {
          var folderPath = $"{UploadFolder}\\{request.Type}";
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
            case "Painting":
              sw.WriteLine(string.Format("{\"author\": \"{0}\",\"url\": \"{1}\",\"weibo\": \"{2}\"}", "", path, request.Weibo));
              break;
            case "Photo":
              sw.WriteLine(string.Format("{\"title\": \"{0}\",\"img\": \"{1}\", \"from\": \"{2}\"}", request.Key, path, request.IdolName));
              break;
            case "Emoji":
              sw.WriteLine(path);
              break;
            default:
              break;
          }
        }
      }
      catch (Exception ex) {
        throw ex;
      }
    }
  }
}
