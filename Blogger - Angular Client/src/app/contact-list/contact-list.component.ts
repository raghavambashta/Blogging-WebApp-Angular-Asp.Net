import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../Models/Contact';
import { ListContactService } from '../Services/listcontact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contactList: any[] = [];

  constructor(
    private listcontact: ListContactService,
    private toastr: ToastrService
  ) {
    this.listcontact.getContactList().subscribe((data) => {
      this.contactList = data;
      console.log(this.contactList);
    });
  }

  ngOnInit(): void {}

  DeleteContact(id: number) {
    this.listcontact.deleteContact(id).subscribe(() => {
      //alert('Record Deleted');
      this.toastr.success('Deleted Successfully!');
      setTimeout(() => {
        location.reload();
      }, 3000);
    });
  }
}
