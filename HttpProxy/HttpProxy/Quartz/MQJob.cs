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
using System.Threading.Tasks;

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
        var path = $"{jsonFolder}\\statis.json";
        // 统计数据json读成对象，计算后再json写回源文件
        List<UserBehaviorStatis> statis = JsonConvert.DeserializeObject<List<UserBehaviorStatis>>(File.ReadAllText(path, Encoding.UTF8));

        // 读取消息队列所有消息，并处理
        Message[] allMessage = mq.GetAllMessages();
        for (int i = 0; i < allMessage.Length; i++)
        {
          allMessage[i].Formatter = formatter;
          string str = allMessage[i].Body.ToString();
          mqType type = (mqType)Enum.Parse(typeof(mqType),str.Substring(0,1));
          string body = str.Substring(2);
          statis.Find(s => s.Type == type).Count++;
        }

        File.WriteAllText(path, JsonConvert.SerializeObject(statis));
    }
  }
}
