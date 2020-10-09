using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpProxy.Models
{
    public class QQAudioUrlRequest { 
        public string guid { get; set; }
        public string[] mids { get; set; }
    }
    public class QQAudioUrlPostModel
    {
        public QQAudioUrlPostModel(string guid,string[] mid) {
            req_0 = new Req(guid, mid);
        }
        public Req req_0 { get; set; }
        public Comm comm = new Comm();
    }

    public class Param {
        public Param(string guid, string[] mid) {
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

    public class Comm {
        public int g_tk = 5381;
        public int uin = 0;
        public string format = "json";
        public string platform = "h5";
        public int ct = 23;
        public int cv = 0;
    }

    public class Req {
        public Req(string guid, string[] mid) {
            param = new Param(guid, mid);
        }
        public string module = "vkey.GetVkeyServer";
        public string method = "CgiGetVkey";
        public Param param { get; set; }
    }
}