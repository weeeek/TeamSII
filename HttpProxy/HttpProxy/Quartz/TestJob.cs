using Quartz;
using System;
using System.IO;

namespace HttpProxy.Quartz
{
    /// <summary>
    /// 消息队列定时任务
    /// </summary>
    public class TestJob : IJob
  {
    public void Execute(IJobExecutionContext context)
    {
        //向c:\Quartz.txt写入当前时间并换行
        File.AppendAllText(@"C:\Users\dell\Desktop\新建文本文档.txt", DateTime.Now + Environment.NewLine);
    }
  }
}
