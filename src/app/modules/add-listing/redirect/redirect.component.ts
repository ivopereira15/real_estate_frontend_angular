import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // setTimeout(function () {
    //  this.router.navigate(['/login']);
    // }, 3000);
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000);
  }

}