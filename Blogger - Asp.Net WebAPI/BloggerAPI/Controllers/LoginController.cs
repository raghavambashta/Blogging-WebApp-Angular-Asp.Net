using BloggerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
namespace BloggerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        BloggerContext db = new BloggerContext();

        [HttpPost]
        [Route("")]
        public User ApproveUser([FromBody] Login login)
        {
            User account = null;
            var accountfound = db.Users.Where(u => u.Email == login.Email && u.Password == login.Password).SingleOrDefault();
            if (accountfound != null)
            {
                account = accountfound;
            }
            else
            {
                account = null;
            }
            return account;
        }

    }
}
