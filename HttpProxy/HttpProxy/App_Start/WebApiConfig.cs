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

      config.Formatters.XmlFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("multipart/form-data"));

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
