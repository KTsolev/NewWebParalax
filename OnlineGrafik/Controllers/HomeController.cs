using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace OnlineGrafik.Controllers
{
    public class HomeController : Controller
    {
        [BindableAttribute(true, BindingDirection.TwoWay)]
        public DateTime SelectedDate { get; set; }
        public ActionResult Index()
        {
            return View();
        }

    }
}
