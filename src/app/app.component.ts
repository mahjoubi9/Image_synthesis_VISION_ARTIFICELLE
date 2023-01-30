import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  keyselection = new KeyboardEvent('keydown', {
    code: '123',
    //keyCode: 345,
    key: 'a',
  });
  selectedKey = this.keyselection;
  selectedColor: any;


  @HostListener('window:keyup.w', ['$event'])
  w(e: KeyboardEvent) {
    console.log('w captured', e);
    this.changekey(e);
  }



  @HostListener('window:keyup.Shift.w', ['$event'])
  sw(e: KeyboardEvent) {
    console.log('shift w captured', e);
    this.changekey(e);
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(e: KeyboardEvent) {
    console.log('key up', e);
    this.changekey(e);
  }


  changekey(e: KeyboardEvent) {
    console.log('change position', e);
    this.selectedKey=e;
  }

}
