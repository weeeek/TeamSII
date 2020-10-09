using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpProxy.Utils
{
    public static class DateTimeHelper
    {
        /// <summary>
        /// 获取时间戳
        /// </summary>
        /// <returns></returns>
        public static string GetTimeStamp(this DateTime time)
        {
            TimeSpan ts = time - new DateTime(1970, 1, 1, 0, 0, 0);
            return Convert.ToInt64(ts.TotalSeconds).ToString();
        }
    }
}