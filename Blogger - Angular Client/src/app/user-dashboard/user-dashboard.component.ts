import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListusersService } from '../Services/listusers.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  confirmClicked = false;
  cancelClicked = false;

  userlist: any[] = [];
  constructor(
    private toastr: ToastrService,
    private listusers: ListusersService,
    private user: UserService,
    private router: Router
  ) {
    this.listusers.getUserList().subscribe((data) => {
      this.userlist = data;
      console.log(this.userlist);
    });
  }

  ngOnInit(): void {}
  DeleteUser(id: number) {
    this.user.deleteUser(id).subscribe(() => {
      this.toastr.success('User Deleted Successfully!');
      setTimeout(() => {
        location.reload();
      }, 3000);
    });
  }
}
