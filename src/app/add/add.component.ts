import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMatFormFieldDuplicatedHintError } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userForm: FormGroup;
  file: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  submitUser() {
    if (!this.userForm.valid) {
      return
    }
    const firstname = this.userForm.value.firstname;
    const lastname = this.userForm.value.lastname;
    const email = this.userForm.value.email;
    const phone = this.userForm.value.phone;
    const obj = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone
    }
    this.adduser(obj)
  }

  onChnage(event: any) {
    console.log(event)
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  adduser(obj: any) {
    const formData = new FormData;
    formData.append('userimg', this.file)
    formData.append('firstname', this.userForm.value.firstname)
    formData.append('lastname', this.userForm.value.lastname)
    formData.append('email', this.userForm.value.email)
    formData.append('phone', this.userForm.value.phone)
    this.userService.adduser(formData)
      .subscribe(res => {
        if (res) {
          this._snackBar.open(res.message, "Close", {
            duration: 3000,
          })
          this.router.navigate(['']);
        }
      })
  }

}
