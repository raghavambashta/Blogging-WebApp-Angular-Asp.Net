import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contact } from '../Models/Contact';
import { ContactService } from '../Services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contact: Contact = {
    Name: '',
    Email: '',
    Phone: '',
    Gender: '',
    Subject: '',
    Message: '',
  };

  contactform!: FormGroup;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contactform = new FormGroup({
      Name: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      Gender: new FormControl(''),
      Subject: new FormControl(''),
      Message: new FormControl('', [Validators.required]),
    });
  }

  contactSubmitted(contact: Contact) {
    console.log(this.contact);
    this.contact = contact;
    this.contact.Subject = 'issue';
    console.log(contact);
    this.contactService.add(this.contact).subscribe(() => {
      this.toastr.success('Submitted!');
      this.router.navigate(['/contactlist']);
    });
  }
}
