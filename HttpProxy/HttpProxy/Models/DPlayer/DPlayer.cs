using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace HttpProxy.Models.DPlayer
{
    public class Options
    {
        public Video video { get; set; }
        // public SubTitle subtitle { get; set; }
        public Danmaku danmaku { get; set; }
        public List<HighLight> highlight { get; set; }
    }

    public class Video
    {
        public string url { get; set; }
        public string pic { get; set; }
        public string thumbnails { get; set; }
        public string type { get; set; }
    }
    public class SubTitle { 
        public string url { get; set; }
        public string type { get; set; }
        public string fontSize { get; set; }
        public string bottom { get; set; }
        public string color { get; set; }
    }

    public class Danmaku {
        public string id { get; set; }
        public string api { get; set; }
        public string token { get; set; }
        public int maximum { get; set; } = 1000;
        public string[] addition { get; set; }
        public string user { get; set; }
        public string bottom { get; set; }
        public bool unlimited { get; set; } = true;
    }

    public class HighLight {
        public int time { get; set; }
        public string text { get; set; }
    }

  public class DanmakuRequest {
        public string author { get; set; }
        public int color { get; set; }
        public string id { get; set; }
        public string text { get; set; }
        public double time { get; set; }
        public string token { get; set; }
        public int type { get; set; }
    }
}
