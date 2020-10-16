using System.Web.Http;
using WebActivatorEx;
using HttpProxy;
using Swashbuckle.Application;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace HttpProxy
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "TeamSII资源中心服务器");
                    c.IncludeXmlComments(string.Format("{0}/bin/HttpProxy.xml", System.AppDomain.CurrentDomain.BaseDirectory));
                })
                .EnableSwaggerUi(c => { });
        }
    }
}
