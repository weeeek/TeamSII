using HttpProxy.Enums;

namespace HttpProxy.Models
{
  public class FileUploadRequest
  {
    /// <summary>
    /// 为网络资源
    /// </summary>
    public bool Online { get; set; } = false;
    /// <summary>
    /// 类型
    /// </summary>
    public UploadType Type { get; set; }
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
  }
}
