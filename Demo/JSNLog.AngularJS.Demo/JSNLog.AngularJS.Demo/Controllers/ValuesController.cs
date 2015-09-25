using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JSNLog.AngularJS.Demo.Controllers
{
    public class WaitController : ApiController
    {
        // GET api/values/5
        public string Get(int ms)
        {
            return "value";
        }
    }
}