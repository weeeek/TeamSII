using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpProxy.Models.DPlayer
{
    public class Options
    {
        public bool autoplay { get; set; } = false;
        public string theme { get; set; } = "#ffffff";
        public bool loop { get; set; } = false;
        public string lang { get; set; } = "zh-cn";
        public bool screenshot { get; set; } = false;
        public bool hotkey { get; set; } = false;
        public bool airplay { get; set; } = false;
        public string preload { get; set; } = "auto";
        public string logo { get; set; }
        public float volume { get; set; } = 0.5f;
        public bool mutex { get; set; } = true;
        public Video video { get; set; }
        public SubTitle subtitle { get; set; }
        public Danmaku danmaku { get; set; }
        public HighLight[] highlight { get; set; }
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
}
