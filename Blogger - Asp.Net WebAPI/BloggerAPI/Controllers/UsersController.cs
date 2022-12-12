using BloggerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BloggerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        BloggerContext db = new BloggerContext();

        //List All
        [HttpGet]
        [Route("listusers")]
        public IActionResult GetUsers()
        {
            var data = from user in db.Users
                       select new
                       {
                           Id = user.Id,
                           UserName = user.UserName,
                           Email = user.Email,
                           Password = user.Password
                       };
            return Ok(data);
        }

        //Get
        [HttpGet("get/{name}")]
        public async Task<IActionResult> GetUserByName(string name)
        {
            var user = await db.Users.FirstOrDefaultAsync(a => a.UserName == name);
            return Ok(user);
        }

        //Add
        //[HttpPost("add")]
        //[HttpPost("post")]

        //public async Task<IActionResult> AddUser(Rauser user)
        //{
        //  await db.Rausers.AddAsync(user);
        //await db.SaveChangesAsync();
        // return Ok(user);
        //}

        public static String Encode(String value)
        {
            StringBuilder builder = new StringBuilder();

            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    builder.Append(b.ToString("x2"));
            }

            return builder.ToString();
        }

        [HttpPost]
        [Route("add")]
        public IActionResult PostCred(User user)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string pass = user.Password;
                    string encode = Encode(pass);

                    user.Password = encode;
                    db.Users.Add(user);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException.Message);
                }
            }
            return Created("Record Successfully Added", user);
        }

        [HttpDelete]
        [Route("del/{id}")]
        public IActionResult DeleteCred(int id)
        {
            var data = db.Users.Find(id);
            db.Users.Remove(data);
            db.SaveChanges();
            return Ok();
        }
    }
}
