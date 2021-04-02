using Quartz;
using Quartz.Impl;
using System.Threading.Tasks;

namespace HttpProxy.Quartz
{
  /// <summary>
  /// 主Scheduler
  /// </summary>
  public static class MainScheduler
  {
    //调度器
    static IScheduler scheduler;
    //调度器工厂
    static ISchedulerFactory factory;

    public static async Task Init()
    {
      //1、创建一个调度器
      factory = new StdSchedulerFactory();
      scheduler = factory.GetScheduler();
      scheduler.Start();

      //2、创建一个任务
      IJobDetail mqJob = JobBuilder.Create<MQJob>().WithIdentity("用户行为", "统计").Build();
      // IJobDetail job = JobBuilder.Create<TestJob>().WithIdentity("测试", "测试").Build();

      //3、创建一个触发器
      //DateTimeOffset runTime = DateBuilder.EvenMinuteDate(DateTimeOffset.UtcNow);
      ITrigger configTrigger = TriggerBuilder.Create()
          .WithIdentity("web.config配置时间触发", "用户行为")
          // .WithCronSchedule(ConfigurationManager.AppSettings["MQQuartzCronSchedule"])     //每天中午12点触发
          .WithSimpleSchedule(x => x
            .WithIntervalInSeconds(86400)
            .RepeatForever()
          )
          .Build();
      //ITrigger trigger = TriggerBuilder.Create()
      //    .WithIdentity("1s触发", "测试")
      //    .WithCronSchedule("0/10 * * * * ?")     //10秒执行一次
      //    .Build();

      //4、将任务与触发器添加到调度器中
      scheduler.ScheduleJob(mqJob, configTrigger);
      // scheduler.ScheduleJob(job, trigger);
      //5、开始执行
      scheduler.Start();
    }
  }
}
