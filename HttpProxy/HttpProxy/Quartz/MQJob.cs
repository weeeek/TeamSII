using HttpProxy.Enums;
using HttpProxy.Models.Statis;
using Newtonsoft.Json;
using Quartz;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Messaging;
using System.Text;

namespace HttpProxy.Quartz
{
    /// <summary>
    /// 消息队列定时任务
    /// </summary>
    public class MQJob : IJob
  {
    private const string MSMQPath = ".\\private$\\48";
    private MessageQueue mq;
    XmlMessageFormatter formatter = new XmlMessageFormatter(new Type[] { typeof(string) });
    private readonly string jsonFolder = ConfigurationManager.AppSettings["JsonFolder"];

    public MQJob()
    {
      if (MessageQueue.Exists(MSMQPath))
      {
        mq = new MessageQueue(MSMQPath);
      }
      else
      {
        mq = MessageQueue.Create(MSMQPath);
      }
    }

    public void Execute(IJobExecutionContext context)
    {
      try
      {

        var path = $"{jsonFolder}\\statis.json";
        // 统计数据json读成对象，计算后再json写回源文件
        List<UserBehaviorStatis> statis = JsonConvert.DeserializeObject<List<UserBehaviorStatis>>(File.ReadAllText(path, Encoding.UTF8));

        // Get a cursor into the messages in the queue.
        MessageEnumerator myEnumerator = mq.GetMessageEnumerator2();
        // Specify that the messages's priority should be read.
        mq.MessageReadPropertyFilter.Priority = true;

        while (myEnumerator.MoveNext())
        {
          Message msg = myEnumerator.Current;
          msg.Formatter = formatter;
          string str = msg.Body.ToString();
          File.AppendAllText($"{jsonFolder}\\mq.txt", str + "\r\n", Encoding.UTF8);
          mqType type = (mqType)Enum.Parse(typeof(mqType), str.Substring(0, 1));
          string body = str.Substring(2);
          statis.Find(s => s.Type == type).Count++;
          myEnumerator.RemoveCurrent();
          myEnumerator.Reset();
        }

        File.WriteAllText(path, JsonConvert.SerializeObject(statis));
      }
      catch (Exception ex)
      {
        File.AppendAllText($"{jsonFolder}\\log.txt", ex.Message + "\r\n", Encoding.UTF8);
      }
      finally
      {
        File.AppendAllText($"{jsonFolder}\\log.txt", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "执行完毕\r\n", Encoding.UTF8);
      }
    }
  }
}
