using HttpProxy.Models.Quartz;
using HttpProxy.Quartz;
using Quartz;
using Quartz.Impl.Matchers;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace HttpProxy.Controllers
{
  /// <summary>
  /// 定时任务
  /// </summary>
  public class QuartzController : ApiController
  {
    /// <summary>
    /// 定时任务列表
    /// </summary>
    /// <returns></returns>
    [HttpGet, Route("api/Quartz/List")]
    public List<JobInfo> List()
    {
      var scheduler = QuartzSchedulerMgr.GetScheduler();
      var groups = scheduler.GetJobGroupNames();
      var list = new List<JobInfo>();
      foreach (var groupName in groups)
      {
        foreach (var jobKey in QuartzSchedulerMgr.GetScheduler().GetJobKeys(GroupMatcher<JobKey>.GroupEquals(groupName)))
        {
          string jobName = jobKey.Name;
          string jobGroup = jobKey.Group;
          DateTimeOffset? nextFire = null;
          var triggers = QuartzSchedulerMgr.GetScheduler().GetTriggersOfJob(jobKey);
          foreach (ITrigger trigger in triggers)
          {
            nextFire = trigger.GetNextFireTimeUtc();
          }
          list.Add(new JobInfo
          {
            JobGroup = jobGroup,
            JobName = jobName,
            Triggers = triggers,
            NextFire = nextFire
          });
        }
      }
      return list;
    }

    /// <summary>
    /// 删除并停止
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    [HttpPost, Route("api/Quartz/UnscheduleJob")]
    public bool UnscheduleJob(string jobName, string jobGroupName, string triggerName, string triggerGroupName)
    {
      return QuartzSchedulerMgr.UnscheduleJob(jobName, jobGroupName, triggerName, triggerGroupName);
    }

    /// <summary>
    /// 暂停/恢复 触发器
    /// </summary>
    /// <param name="triggerName"></param>
    /// <param name="triggerGroupName"></param>
    [HttpPost, Route("api/Quartz/TriggerJob")]
    public void ToggleTrigger(string triggerName, string triggerGroupName)
    {
      QuartzSchedulerMgr.ToggleTrigger(triggerName, triggerGroupName);
    }

    /// <summary>
    /// 手动触发
    /// </summary>
    /// <param name="jobName"></param>
    /// <param name="jobGroupName"></param>
    [HttpPost, Route("api/Quartz/Execute")]
    public void Execute(string jobName, string jobGroupName)
    {
      QuartzSchedulerMgr.ManualExecute(jobName, jobGroupName);
    }
    /// <summary>
    /// 手动触发trigger
    /// </summary>
    /// <param name="triggerName"></param>
    /// <param name="triggerGroupName"></param>
    [HttpPost, Route("api/Quartz/ExecuteNow")]
    public void ExecuteNow(string triggerName, string triggerGroupName)
    {
      QuartzSchedulerMgr.ManualExecuteNow(triggerName, triggerGroupName);
    }
  }
}
