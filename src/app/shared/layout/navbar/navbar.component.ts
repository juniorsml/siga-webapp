import { Component, OnInit,ElementRef } from '@angular/core';

@Component({
  selector: 'sga-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  host: {
    '(document:click)': 'outClick($event)',
  
})
export class NavbarComponent implements OnInit {
  logout: any;
  
  constructor(private _eref: ElementRef) { }

  public status: boolean = false;

  toggleProfileUser() {
    this.status = !this.status;
  }

  // Close When Click outSide of Component
   outClick(event) {
       if (!this._eref.nativeElement.contains(event.target)){// or some similar check
        if (this.status != false) {
          this.status = false;
        }
      }
    }
	
  toggleFullScreen() {
        var doc: any = document;
        var docEl: any = doc.documentElement;

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
    };


  ngOnInit() {
  }

}
