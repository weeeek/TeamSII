using HttpProxy.Models.Statis;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web.Http;

namespace HttpProxy.Controllers
{
    /// <summary>
    /// 统计
    /// </summary>
    public class StatisController : IController
  {
    /// <summary>
    /// 用户行为统计
    /// </summary>
    /// <returns></returns>
    [HttpGet,Route("api/Statis/GetUserBehaviors")]
    public List<UserBehaviorStatis> GetUserBehaviors()
    {
      return JsonConvert.DeserializeObject<List<UserBehaviorStatis>>(File.ReadAllText($"{jsonFolder}\\statis.json", Encoding.UTF8));
    }
  }
}
