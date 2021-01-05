using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpProxy.Models
{
  public class QQAudioUrlRequest
  {
    public string guid { get; set; }
    public string[] mids { get; set; }
  }
  public class QQAudioUrlPostModel
  {
    public QQAudioUrlPostModel(string guid, string[] mid)
    {
      req_0 = new Req(guid, mid);
    }
    public Req req_0 { get; set; }
    public Comm comm = new Comm();
  }

  public class VkeyComm
  {
    public int uin = 0;
    public string format = "json";
    public int ct = 24;
    public int cv = 0;
  }

  public class Param
  {
    public Param(string guid, string[] mid)
    {
      this.guid = guid;
      this.songmid = mid;
    }
    public string guid { get; set; }
    public string[] songmid { get; set; }
    public List<string> songtype = new List<string>();
    public string uin = "0";
    public int loginflag = 0;
    public string platform = "23";
    public string h5to = "speed";
  }

  public class Comm
  {
    public int g_tk = 5381;
    public int uin = 0;
    public string format = "json";
    public string platform = "h5";
    public int ct = 23;
    public int cv = 0;
  }

  public class Req
  {
    public Req(string guid, string[] mid)
    {
      param = new Param(guid, mid);
    }
    public string module = "vkey.GetVkeyServer";
    public string method = "CgiGetVkey";
    public Param param { get; set; }
  }


  public class QQVkeyPostModel
  {
    public QQVkeyPostModel(string guid, string[] songmids) {
      this.data = new QQVkeyDataModel(guid, songmids);
    }
    public string sign = "zza7rrstg933vbezgje16df07565064936c5e971bc4ab222ec";
    public QQVkeyDataModel data { get; set; }
    public int g_tk = 5381;
    public int loginUin = 0;
    public int hostUin = 0;
    public string format = "json";
    public string inCharset = "utf8";
    public string outCharset = "utf-8";
    public int notice = 0;
    public string platform = "yqq.com";
    public int needNewCode = 0;
  }

  public class QQVkeyDataModel
  {
    public QQVkeyDataModel(string guid, string[] songmid) {
      this.req_0 = new QQVkeyReq0(guid, songmid);
      this.req = new QQVkeyReq(guid);
    }
    public QQVkeyReq req { get; set; } 
    public QQVkeyReq0 req_0  { get; set; }
    public VkeyComm comm = new VkeyComm();
  }

  public class QQVkeyReq {
    public QQVkeyReq(string guid) {
      this.param = new QQVkeyParam(guid);
    }
    public string module = "CDN.SrfCdnDispatchServer";
    public string method = "GetCdnDispatch";
    public QQVkeyParam param { get; set; }
  }

  public class QQVkeyReq0
  {
    public QQVkeyReq0(string guid, string[] songmid)
    {
      this.param = new QQVkeyParam0(guid, songmid);
    }
    public string module = "vkey.GetVkeyServer";
    public string method = "CgiGetVkey";
    public QQVkeyParam0 param { get; set; }
  }

  public class QQVkeyParam {
    public QQVkeyParam(string guid) {
      this.guid = guid;
    }
    public string guid { get; set; }
    public int calltype = 0;
    public string userip = "0";
  }

  public class QQVkeyParam0
  {
    public QQVkeyParam0(string guid, string[] songmid)
    {
      this.guid = guid;
      this.songmid = songmid;
    }
    public string guid { get; set; }
    public string[] songmid { get; set; }
    public int[] songtype = new int[] { 0 };
    public string uin = "0";
    public int loginflag = 1;
    public string platform = "20";
  }
}
