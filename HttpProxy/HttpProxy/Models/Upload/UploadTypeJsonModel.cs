using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpProxy.Models.Upload
{
    public class UploadTypeJsonPhoto
    {
        public string title { get; set; }
        public string img { get; set; }
        public string from { get; set; }
    }

  public class UploadTypeJsonPainting {
        public string author { get; set; }
        public string url { get; set; }
        public string weibo { get; set; }
    }
}
