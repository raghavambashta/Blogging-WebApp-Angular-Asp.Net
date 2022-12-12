import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../Models/Blog';
import { BlogService } from '../Services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  id!: number;
  blog: any;

  updateBlogForm!: FormGroup;

  genreList!: genre[];
  selectedItems!: string[];
  genre!: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getGenre();
    this.selectedItems = new Array<string>();

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.blogService.getBlogById(this.id).subscribe((data) => {
        this.updateBlogForm = new FormGroup({
          Title: new FormControl(data['title'], Validators.required),
          Description: new FormControl(
            data['description'],
            Validators.required
          ),
          Author: new FormControl(data['author']),
          PostedOn: new FormControl(data['postedOn'], Validators.required),
        });

        console.log(this.blog);
      });
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
  EditBlog() {
    if (confirm('Are you sure to Edit this blog?')) {
      //manually setting value of form control author
      this.updateBlogForm.controls['Author'].setValue(this.genre);
      this.blogService
        .editBlog(this.id, this.updateBlogForm.value)
        .subscribe((data: any) => {
          console.log('updated');
          this.toastr.success('Blog Updated Successfully');
          this.router.navigate(['/userhome']);
        });
    }
  }
}

class genre {
  name!: string;
}
