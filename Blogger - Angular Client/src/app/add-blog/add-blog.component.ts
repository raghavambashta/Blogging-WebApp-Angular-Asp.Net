import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../Models/Blog';
import { BlogService } from '../Services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  genreList!: genre[];
  selectedItems!: string[];
  genre!: string;

  addBlogForm!: FormGroup;
  blog: Blog = {
    Title: '',
    Description: '',
    Author: '',
    PostedOn: '',
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getGenre();
    this.selectedItems = new Array<string>();

    this.addBlogForm = new FormGroup({
      Title: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      PostedOn: new FormControl('', [Validators.required]),
    });
  }

  getGenre() {
    this.genreList = [
      { name: 'Coding' },
      { name: 'Web Dev' },
      { name: 'Mobile Dev' },
      { name: 'Blockchain' },
      { name: 'AI/ML' },
      { name: 'Crypto' },
    ];
  }

  onChange(e: any, name: string) {
    if (e.target.checked) {
      console.log(name + ' checked');
      this.selectedItems.push(name);
    } else {
      console.log(name + ' unchecked');
      this.selectedItems = this.selectedItems.filter((m) => m != name);
    }

    this.genre = this.selectedItems.join(', ');
    console.log(this.selectedItems);
    console.log(this.genre);
  }

  postBlog(blog: Blog) {
    blog.Author = this.genre;
    console.log(this.blog);
    this.blog = blog;
    this.blogService.addBlog(this.blog).subscribe(() => {
      this.toastr.success('Blog Posted!');
      this.router.navigate(['/userhome']);
    });
  }
}
class genre {
  name!: string;
}
