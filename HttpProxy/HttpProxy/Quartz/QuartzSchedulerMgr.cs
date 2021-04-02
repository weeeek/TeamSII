using Quartz;
using Quartz.Impl;
using Quartz.Impl.Triggers;
using System;
using System.Configuration;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace HttpProxy.Quartz
{
  /// <summary>
  /// Quartz管理
  /// </summary>
  public class QuartzSchedulerMgr
  {
    private static ISchedulerFactory schedulerFactory;
    private static IScheduler scheduler;
    private static readonly string jsonFolder = ConfigurationManager.AppSettings["JsonFolder"];

    static QuartzSchedulerMgr()
    {
      schedulerFactory = new StdSchedulerFactory();
      scheduler = schedulerFactory.GetScheduler();
      scheduler.Start();
    }

    /// <summary>
    /// 获取Scheduler
    /// </summary>
    /// <returns></returns>
    public static IScheduler GetScheduler()
    {
      return scheduler;
    }

    /// <summary>
    /// 关停Scheduler，但是IsStarted依然true
    /// </summary>
    /// <param name="immediately"></param>
    public static void Shutdown(bool immediately)
    {
      var s = GetScheduler();
      if (s.IsStarted)
        s.Shutdown(immediately);
    }

    /// <summary>
    /// 创建一个任务
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="jobName"></param>
    /// <param name="intervalInSeconds"></param>
    /// <param name="repeatCount"></param>
    /// <returns></returns>
    public static DateTimeOffset CreateJob<T>(string jobName, int intervalInSeconds, int repeatCount) where T : IJob
    {

      IJobDetail job = JobBuilder.Create<T>().WithIdentity(jobName, $"{jobName}-JobGroup").Build();

      ITrigger trigger = TriggerBuilder.Create().WithIdentity(jobName, $"{jobName}-TriggerGroup").StartNow()
          .WithSimpleSchedule(x => x.WithIntervalInSeconds(intervalInSeconds).WithRepeatCount(repeatCount))
          .Build();

      return scheduler.ScheduleJob(job, trigger);
    }

    /// <summary>
    /// 下一次触发时间
    /// </summary>
    /// <param name="triggerName"></param>
    /// <param name="triggerGroupName"></param>
    /// <returns></returns>
    public static DateTimeOffset? NextTriggerTime(string triggerName, string triggerGroupName) {
      TriggerKey key = new TriggerKey(triggerName, triggerGroupName);
      return GetScheduler().GetTrigger(key).GetNextFireTimeUtc();
    }

    /// <summary>
    /// 创建一个任务
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="jobName"></param>
    /// <param name="intervalInSeconds"></param>
    /// <param name="repeatCount"></param>
    /// <param name="dataMap"></param>
    /// <returns></returns>
    public static DateTimeOffset CreateJob<T>(string jobName, int intervalInSeconds, int repeatCount,
        JobDataMap dataMap) where T : IJob
    {

      IJobDetail job = JobBuilder.Create<T>().WithIdentity(jobName, $"{jobName}-JobGroup").UsingJobData(dataMap)
          .Build();

      ITrigger trigger = TriggerBuilder.Create().WithIdentity(jobName, $"{jobName}-TriggerGroup").StartNow()
          .WithSimpleSchedule(x => x.WithIntervalInSeconds(intervalInSeconds).WithRepeatCount(repeatCount))
          .Build();

      return scheduler.ScheduleJob(job, trigger);
    }

    /// <summary>
    /// 创建一个任务
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="jobName"></param>
    /// <param name="cronTime"></param>
    /// <param name="dataMap"></param>
    /// <returns></returns>
    public static DateTimeOffset CreateJob<T>(string jobName, string cronTime, JobDataMap dataMap) where T : IJob
    {

      IJobDetail job = JobBuilder.Create<T>().WithIdentity(jobName, $"{jobName}-JobGroup").UsingJobData(dataMap)
          .Build();


      ICronTrigger trigger = new CronTriggerImpl(jobName, $"{jobName}-TriggerGroup", cronTime);


      return scheduler.ScheduleJob(job, trigger);
    }

    /// <summary>
    /// 停止执行的job，并删除此job
    /// </summary>
    /// <param name="jobName"></param>
    /// <returns></returns>
    public static bool UnscheduleJob(string jobName, string jobGroupName, string triggerName, string triggerGroupName)
    {
      JobKey existKey = JobKey.Create(jobName, jobGroupName);
      TriggerKey exisTriggerKey = new TriggerKey(triggerName, triggerGroupName);

      // 停止触发器
      scheduler.PauseTrigger(exisTriggerKey);
      // 停止任务
      scheduler.PauseJob(existKey);
      // 移除触发器，移除任务
      return scheduler.UnscheduleJob(exisTriggerKey) && scheduler.DeleteJob(existKey);

    }

    /// <summary>
    /// 是否存在相关名称的Job
    /// </summary>
    /// <param name="jobName"></param>
    /// <returns></returns>
    public static bool ExistJob(string jobName, string jobGroupName)
    {
      JobKey key = JobKey.Create(jobName, jobGroupName);
      return scheduler.CheckExists(key);
    }

    /// <summary>
    /// 暂停/继续执行
    /// </summary>
    /// <param name="jobName"></param>
    /// <param name="triggerName"></param>
    /// <param name="triggerGroupName"></param>
    /// <returns></returns>
    public static void ToggleTrigger(string triggerName, string triggerGroupName)
    {
      TriggerKey key = new TriggerKey(triggerName, triggerGroupName);
      switch (scheduler.GetTriggerState(key))
      {
        case TriggerState.Paused:
          scheduler.ResumeTrigger(key);
          break;
        case TriggerState.Normal:
          scheduler.PauseTrigger(key);
          break;
        default:
          break;
      }
    }

    /// <summary>
    /// 手动执行
    /// </summary>
    /// <param name="jobName"></param>
    /// <param name="jobGroupName"></param>
    public static void ManualExecute(string jobName, string jobGroupName)
    {
      try
      {
        JobKey key = new JobKey(jobName, jobGroupName);
        scheduler.TriggerJob(key);
        scheduler.Start();
      }
      catch (Exception ex)
      {
        File.AppendAllText($"{jsonFolder}\\error.txt", ex.Message, Encoding.UTF8);
      }
    }

    /// <summary>
    /// 手动执行trigger
    /// </summary>
    /// <param name="triggerName"></param>
    /// <param name="triggerGroupName"></param>
    public static void ManualExecuteNow(string triggerName, string triggerGroupName)
    {
      TriggerKey key = new TriggerKey(triggerName, triggerGroupName);
      scheduler.GetTrigger(key).GetTriggerBuilder().StartNow();
      // scheduler.Start();
    }
  }
}
