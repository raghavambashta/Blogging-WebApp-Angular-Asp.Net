import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../Services/blog.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  confirmClicked = false;
  cancelClicked = false;

  blogList: any[] = [];

  constructor(
    private toastr: ToastrService,
    private blog: BlogService,
    private router: Router
  ) {
    this.blog.getBlogList().subscribe((data) => {
      this.blogList = data;
      console.log(this.blogList);
    });
  }

  DeleteBlog(id: number) {
    // if (confirm('Are you sure to delete this blog?')) {
    this.blog.deleteBlog(id).subscribe(() => {
      this.toastr.success('Blog Deleted Successfully!');
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
    //}
  }

  ViewBlog(id: number) {
    this.router.navigate(['viewblog', id]);
  }

  EditBlog(id: number) {
    this.router.navigate(['editblog', id]);
  }

  ngOnInit(): void {}
}
