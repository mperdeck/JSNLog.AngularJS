using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading;

namespace JSNLog.AngularJS.Demo.Controllers
{
    public class WaitController : ApiController
    {
        // GET api/values/5
        public string Get(int ms)
        {
            if (ms < 0)
            {
                throw new Exception("ms is smaller than 0");
            }

            Thread.Sleep(ms);
            return String.Format("Slept {0} ms", ms);
        }
    }
}