using System;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using HttpProxy.Models;
using HttpProxy.Utils;
using Newtonsoft.Json;

namespace HttpProxy.Controllers
{
		/// <summary>
		/// 请求代理
		/// </summary>
		[EnableCorsAttribute("*", "*", "*")]
		public class WebProxyController : ApiController
		{
				/// <summary>
				/// 获取歌词
				/// </summary>
				/// <param name="id">songid</param>
				/// <param name="mid">mid</param>
				/// <returns></returns>
				[HttpGet, Route("api/QQlyric")]
				public HttpResponseMessage QQLyricWebProxy(string id, string mid)
				{
					var a = DateTime.Now.Ticks;
					// string uri = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg?nobase64=1&musicid=" + id + "&-=jsonp1&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
					string uri = $"https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?pcachetime={DateTime.Now.GetTimeStamp()}&songmid={mid}&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
					HttpClient client = new HttpClient();
					client.DefaultRequestHeaders.Add("accept", "application/json, text/javascript, */*; q=0.01");
					client.DefaultRequestHeaders.Add("accept-encoding", "gzip, deflate, br");
					client.DefaultRequestHeaders.Add("accept-language", "zh-CN,zh;q=0.9");
					client.DefaultRequestHeaders.Add("cookie", $"pgv_pvi=3084777472; pgv_si=s6042716160; pgv_info=ssid=s7984892020; pgv_pvid=396558220; ts_uid=3836534641; userAction=1; yqq_stat=0; ts_last=y.qq.com/n/yqq/song/{mid}.html");
					// client.DefaultRequestHeaders.Add("origin", "https://y.qq.com");
					client.DefaultRequestHeaders.Add("referer", $"https://y.qq.com/n/yqq/song/{mid}.html");
					client.DefaultRequestHeaders.Add("sec-fetch-mode", "cors");
					client.DefaultRequestHeaders.Add("sec-fetch-site", "same-site");
					// client.DefaultRequestHeaders.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");

					return client.GetAsync(new Uri(uri)).Result.EnsureSuccessStatusCode();
				}

				/// <summary>
				/// 获取Vkey
				/// </summary>
				/// <returns></returns>
				[HttpPost, Route("api/QQAudioUrl"), EnableCors("*", "*", "*")]
				public HttpResponseMessage QQAudioUrl(QQAudioUrlRequest request)
				{
					string uri = $"https://u.y.qq.com/cgi-bin/musicu.fcg";
					HttpClient client = new HttpClient();
					client.DefaultRequestHeaders.Add("accept", "application/json");
					client.DefaultRequestHeaders.Add("accept-encoding", "gzip, deflate, br");
					client.DefaultRequestHeaders.Add("accept-language", "zh-CN,zh;q=0.9");
					// client.DefaultRequestHeaders.Add("cookie", $"pgv_pvi=3084777472; pgv_si=s6042716160; pgv_info=ssid=s7984892020; pgv_pvid=396558220; ts_uid=3836534641; userAction=1; yqq_stat=0; ts_last=y.qq.com/n/yqq/song/{mid}.html");
					// client.DefaultRequestHeaders.Add("referer", $"https://y.qq.com/n/yqq/song/{mid}.html");
					client.DefaultRequestHeaders.Add("sec-fetch-dest", "empty");
					client.DefaultRequestHeaders.Add("sec-fetch-mode", "cors");
					client.DefaultRequestHeaders.Add("sec-fetch-site", "same-site");
					HttpContent content = new StringContent(JsonConvert.SerializeObject(new QQAudioUrlPostModel(request.guid, request.mids)));
					content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
					return client.PostAsync(new Uri(uri), content).Result.EnsureSuccessStatusCode();
				}
		}
}
