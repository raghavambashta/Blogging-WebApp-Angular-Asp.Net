using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BloggerAPI.Models;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BloggerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        BloggerContext db = new BloggerContext();

        //List All
        [HttpGet]
        [Route("list")]
        public IActionResult GetBlogs()
        {
            var data = from post in db.Posts
                       select new
                       {
                           Id = post.Id,
                           Title = post.Title,
                           Description = post.Description,
                           Author = post.Author,
                           PostedOn = post.PostedOn
                       };

            return Ok(data);
        }

        ////Get
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            Post blog = await db.Posts.FirstOrDefaultAsync(a => a.Id == id);

            string str = blog.PostedOn;
            char[] spearator = { ' ' };
            String[] strList = str.Split(spearator);
            String[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"
                        ,"Sep", "Oct", "Nov", "Dec"};

            int monthNumber = 0;

            string s1 = strList[1];
            s1 = s1.Remove(s1.Length - 1, 1);
            System.Diagnostics.Debug.WriteLine(s1);
            for (int i = 0; i < months.Length; i++)
            {
                string s2 = months[i];
                //System.Diagnostics.Debug.WriteLine(s2);
                if (String.Equals(s1, s2))
                {
                    monthNumber = i + 1;
                }
            }
            string monthNum = monthNumber.ToString();

            if (monthNumber < 10)
            {
                monthNum = "0" + monthNum;
            }

            string date = strList[2] + "-" + monthNum + "-" + strList[0];

            blog.PostedOn = date;

            return Ok(blog);
        }

        [HttpPost]
        [Route("add")]
        public IActionResult PostBlog(Post post)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string str = post.PostedOn;
                    char[] spearator = { '-' };
                    String[] strList = str.Split(spearator);
                    String[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"
                        ,"Sep", "Oct", "Nov", "Dec"};
                    int n = int.Parse(strList[1]);
                    strList[1] = months[n - 1];
                    string date = strList[2] + " " + strList[1] + ", " + strList[0];
                    post.PostedOn = date;

                    db.Posts.Add(post);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException.Message);
                }
            }
            return Created("Record Successfully Added", post);
        }

        [HttpDelete]
        [Route("del/{id}")]
        public IActionResult DeleteBlog(int id)
        {
            Post data = db.Posts.Find(id);
            db.Posts.Remove(data);
            db.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("edit/{id}")]
        public IActionResult PutDept(int id, Post post)
        {
            if (ModelState.IsValid)
            {
                string str = post.PostedOn;
                char[] spearator = { '-' };
                String[] strList = str.Split(spearator);
                String[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"
                        ,"Sep", "Oct", "Nov", "Dec"};
                int n = int.Parse(strList[1]);
                strList[1] = months[n - 1];
                string date = strList[2] + " " + strList[1] + ", " + strList[0];
                post.PostedOn = date;

                Post opost = db.Posts.Find(id);
                opost.Title = post.Title;
                opost.Description = post.Description;
                opost.Author = post.Author;
                opost.PostedOn = post.PostedOn;

                db.SaveChanges();
                return Ok();
            }
            return BadRequest("Unable to edit record");
        }
    }
}
