using System.Web.Http;

namespace HttpProxy
{
    public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API 配置和服务
      // config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
      config.EnableCors();
      // Web API 路由
      config.MapHttpAttributeRoutes();

      //var formatter = GlobalConfiguration.Configuration.Formatters.Where(f => f is MediaTypeFormatter).FirstOrDefault();
      //if (!formatter.SupportedMediaTypes.Any(m => m.MediaType == "multipart/form-data"))
      //  formatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("multipart/form-data"));

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
