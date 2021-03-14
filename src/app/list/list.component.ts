import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  userList: any;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUser()
      .subscribe(result => {
        this.userList = result.value;
      })
  }

  deleteuser(id: any) {
    this.userService.deleteUser(id)
      .subscribe(res => {
        if (res) {
          this.getAllUser();
          this._snackBar.open(res.message, "Close", {
            duration: 3000,
          })
        }
      })
  }

}
