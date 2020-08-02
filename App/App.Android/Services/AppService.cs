using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using App.Services;

namespace App.Droid.Services
{
  public class AppService : IAppService
  {
    public void CloseApp()
    {
      Process.KillProcess(Android.OS.Process.MyPid());
    }
  }
}
