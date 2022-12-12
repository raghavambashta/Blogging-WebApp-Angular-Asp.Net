using System;
using System.Collections.Generic;

#nullable disable

namespace BloggerAPI.Models
{
    public partial class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
