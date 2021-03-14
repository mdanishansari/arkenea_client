import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userId: any;
  user: any;
  userForm: any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.route.params.subscribe(data => {
      this.userId = data['id'];
    })
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.userService.getUserbyId(this.userId)
      .subscribe(res => {
        if (res) {
          this.user = res.value[0];
          console.log(this.user)
          this.userForm.controls['firstname'].setValue(this.user.firstname);
          this.userForm.controls['lastname'].setValue(this.user.lastname);
          this.userForm.controls['email'].setValue(this.user.email);
          this.userForm.controls['phone'].setValue(this.user.phone);
        }
      })
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
    this.udpateUser(this.userId, obj)
  }

  udpateUser(id: any, obj: any) {
    this.userService.updateUser(id, obj)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['']);
        }
      })
  }

}
