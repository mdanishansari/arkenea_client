import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  userId: any;
  user: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.route.params.subscribe(data => {
      this.userId = data['id'];
    })
  }

  ngOnInit(): void {
    this.userService.getUserbyId(this.userId)
      .subscribe(res => {
        if (res) {
          this.user = res.value[0];
        }
      })
  }

}
