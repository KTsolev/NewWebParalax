using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineGrafik.Models
{
    public class PatientsModel 
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string FamilyName { get; set; }
        public string Email { get; set; }
        public PatientsHourModel Hour { get; set; }
    }
}
