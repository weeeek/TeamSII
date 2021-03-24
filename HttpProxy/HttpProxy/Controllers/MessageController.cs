using HttpProxy.Models.MSMQ;
using System;
using System.Collections.Generic;
using System.Messaging;
using System.Threading.Tasks;
using System.Web.Http;

namespace HttpProxy.Controllers
{
  public class MessageController : IController
  {
    private const string MSMQPath = ".\\private$\\48";
    private MessageQueue mq;
    XmlMessageFormatter formatter = new XmlMessageFormatter(new Type[] { typeof(string) });

    public MessageController()
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

    /// <summary>
    /// 消息队列，发送
    /// </summary>
    /// <param name="msg"></param>
    [HttpPost, Route("api/MSMQ/Send")]
    public void Send(SendRequest request)
    {
      mq.Send(request.msg);
    }

    /// <summary>
    /// 消息队列，接收
    /// </summary>
    /// <returns></returns>
    [HttpGet, Route("api/MSMQ/Recieve")]
    public string Recieve()
    {
      //从队列中接收消息，如果队列中没有，就会阻塞线程一直等。
      Message myMessage = mq.Receive();
      // myQueue.Peek();--接收后不消息从队列中移除
      myMessage.Formatter = formatter;
      return myMessage.Body.ToString();
    }

    /// <summary>
    /// 清空
    /// </summary>
    [HttpGet, Route("api/MSMQ/Clean")]
    public void Clean()
    {
      mq.Purge();
    }

    /// <summary>
    /// 获取所有消息的静态快照。
    /// </summary>
    /// <returns></returns>
    [HttpGet, Route("api/MSMQ/GetAll")]
    public List<string> GetAllMessage()
    {
      var result = new List<string>();
      Message[] allMessage = mq.GetAllMessages();
      for (int i = 0; i < allMessage.Length; i++)
      {
        allMessage[i].Formatter = formatter;
        result.Add(allMessage[i].Body.ToString());
      }
      return result;
    }
  }
}
