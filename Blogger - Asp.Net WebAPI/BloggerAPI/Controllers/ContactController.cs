using BloggerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace BloggerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        BloggerContext db = new BloggerContext();

        [HttpGet]
        [Route("list")]
        public IActionResult GetContact()
        {
            var data = from contact in db.Contacts
                       select new
                       {
                           Id = contact.Id,
                           Name = contact.Name,
                           Email = contact.Email,
                           Phone = contact.Phone,
                           Gender = contact.Gender,
                           Subject = contact.Subject,
                           Message = contact.Message
                       };
            return Ok(data);
        }


        [HttpPost]
        [Route("add")]
        public IActionResult PostCred(Contact contact)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Contacts.Add(contact);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException.Message);
                }
            }
            return Created("Record Successfully Added", contact);
        }


        [HttpDelete]
        [Route("del/{id}")]
        public IActionResult DeleteCred(int id)
        {
            var data = db.Contacts.Find(id);
            db.Contacts.Remove(data);
            db.SaveChanges();
            return Ok();
        }

    }
}
