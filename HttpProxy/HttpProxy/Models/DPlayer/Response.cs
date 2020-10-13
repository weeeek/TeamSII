using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HttpProxy.Models.DPlayer
{
  public class Response<T>
  {
    public Response(T obj) {
      data = obj;
    }
    public int code { get; set; } = 0;
    public T data { get; set; }
  }
}
