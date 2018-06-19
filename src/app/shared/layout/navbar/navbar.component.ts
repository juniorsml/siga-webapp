import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'sga-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  host: {
    '(document:click)': 'outClick($event)'
  }
})
export class NavbarComponent implements OnInit {

  logout: any;
  public isMap: boolean;

  constructor(private _eref: ElementRef, public router: Router) {
    const currentUrl = this.router.url;
    if (this.isMap = currentUrl.indexOf('map') > -1) {
        this.isMap = true;
    } else if (this.isMap = currentUrl.indexOf('history') > -1) {
        this.isMap = true;
    } else if (this.isMap = currentUrl.indexOf('places') > -1) {
        this.isMap = true;
    }
    this.router
      .events
      .filter(event => event instanceof NavigationStart)
      .subscribe((e: NavigationStart) => {
        if (this.isMap = e.url.indexOf('map') > -1) {
            this.isMap = true;
        } else if (this.isMap = currentUrl.indexOf('history') > -1) {
            this.isMap = true;
        } else if (this.isMap = e.url.indexOf('places') > -1) {
            this.isMap = true;
        }
     });

  }

  public status = false;

  toggleProfileUser() {
    this.status = !this.status;
  }

  // Close When Click outSide of Component
   outClick(event) {
       if (!this._eref.nativeElement.contains(event.target)) {// or some similar check
        if (this.status != false) {
          this.status = false;
        }
      }
    }

  toggleFullScreen() {
        const doc: any = document;
        const docEl: any = doc.documentElement;

        if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement) {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        } else {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            }
        }

        if (doc.fullscreenElement || doc.webkitFullscreenElement) {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            }
        } else {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            }
        }
    }
  ngOnInit() {


  }

}
