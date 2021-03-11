using System.Configuration;
using System.Web.Http;

namespace HttpProxy.Controllers
{
  public class IController : ApiController
  {
    public readonly string jsonFolder = ConfigurationManager.AppSettings["JsonFolder"];
  }
}
