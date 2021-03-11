using HttpProxy.Enums;

namespace HttpProxy.Models.Statis
{
  /// <summary>
  /// 统计用户行为
  /// </summary>
  public class UserBehaviorStatis
  {
    /// <summary>
    /// 操作类型
    /// </summary>
    public mqType Type { get; set; }

    /// <summary>
    /// 计数
    /// </summary>
    public int Count { get; set; }
  }
}
