using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace JSNLog.AngularJS.Demo
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{ms}",
                defaults: new { ms = RouteParameter.Optional }
            );
        }
    }
}
