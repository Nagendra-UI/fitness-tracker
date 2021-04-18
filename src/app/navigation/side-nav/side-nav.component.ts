import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  opened: boolean = false
  mediaSub: Subscription;
  mode = "side"
  constructor(public mediaObserver: MediaObserver) {

  }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((data: MediaChange[]) => {
      if (data[0].mqAlias == 'xs') {
        this.mode = 'over'
      } else {
        this.mode = 'side'
      }
    })
  }

  openSideNav(event: boolean) {
    this.opened = event
  }

  open() {
    this.opened = false
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.mediaSub.unsubscribe()
  }
}
