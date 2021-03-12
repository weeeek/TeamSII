using HttpProxy.Models;
using HttpProxy.Models.Upload;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace HttpProxy.Controllers
{
  /// <summary>
  /// 文件上传
  /// </summary>
  public class FileController : Controller
  {
    /// <summary>
    /// 上传文件夹，Web.config中配置
    /// </summary>
    public static string UploadFolder = ConfigurationManager.AppSettings["UploadFolder"];
    private string GetJsonFile(string type)
    {
      return $"{UploadFolder}\\{type}.json";
    }

    /// <summary>
    /// 文件上传
    /// </summary>
    [HttpPost]
    public JsonResult Upload(FileUploadRequest model)
    {
      var files = Request.Files;

      string path = "";
      string type = "";
      string fileName = "";
      var folderPath = $"C:\\inetpub\\wwwroot\\static\\import\\{model.Type}";
      HttpPostedFileBase file;
      switch (files.Count)
      {
        case 1:
          file = files[0];
          type = file.FileName.Substring(file.FileName.LastIndexOf('.'));
          fileName = $"{model.IdolName}{model.Key}.{type}";
          path = $"{folderPath}\\{fileName}";
          file.SaveAs(path);              //将上传的东西保存
          using (StreamWriter sw = new StreamWriter(GetJsonFile(model.Type), true, Encoding.UTF8))
          {
            switch (model.Type)
            {
              case "Painting":
                sw.WriteLine(JsonConvert.SerializeObject(new UploadTypeJsonPainting()
                {
                  author = "",
                  url = path,
                  weibo = model.Weibo
                }));
                break;
              case "Photo":
                sw.WriteLine(JsonConvert.SerializeObject(new UploadTypeJsonPhoto()
                {
                  title = model.Key,
                  img = path,
                  from = model.IdolName
                }));
                break;
              case "Emoji":
                sw.WriteLine(fileName);
                break;
              default:
                break;
            }
          }
          return Json(true);
        default:
          for (int i = 0; i < files.Count; i++)
          {
            file = files[i];
            path = $"{folderPath}\\{model.IdolName}{model.Key}{i}.{file.FileName.Substring(file.FileName.LastIndexOf('.'))}";
            file.SaveAs(path);              //将上传的东西保存
          }
          return Json(true);
      }
    }
  }
}
