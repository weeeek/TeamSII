using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using App.Services;
using Foundation;
using UIKit;

namespace App.iOS.Services
{
  public class AppService : IAppService
  {
    public void CloseApp()
    {
      Thread.CurrentThread.Abort();
    }
  }
}
