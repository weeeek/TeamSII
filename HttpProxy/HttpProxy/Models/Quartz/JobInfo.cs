using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpProxy.Models.Quartz
{
  /// <summary>
  /// 定时任务信息
  /// </summary>
  public class JobInfo
  {
    /// <summary>
    /// 名称
    /// </summary>
    public string JobName { get; set; }
    /// <summary>
    /// 组名
    /// </summary>
    public string JobGroup { get; set; }
    /// <summary>
    /// 触发器
    /// </summary>
    public IList<ITrigger> Triggers { get; set; }
    /// <summary>
    /// 下次触发事件
    /// </summary>
    public DateTimeOffset? NextFire { get; set; }
  }
}
