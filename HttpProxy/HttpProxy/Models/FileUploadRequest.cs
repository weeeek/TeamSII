using HttpProxy.Enums;
using System.Web;

namespace HttpProxy.Models
{
  public class FileUploadRequest
  {
    /// <summary>
    /// 类型
    /// </summary>
    public string Type { get; set; }
    /// <summary>
    /// 关键字
    /// </summary>
    public string Key { get; set; }
    /// <summary>
    /// 人名
    /// </summary>
    public string IdolName { get; set; }
    /// <summary>
    /// 网络资源
    /// </summary>
    public string Url { get; set; }
    /// <summary>
    /// 微博地址，可不填
    /// </summary>
    public string Weibo { get; set; }
    /// <summary>
    /// 为网络资源
    /// </summary>
    public bool Online { get; set; }
  }
}
