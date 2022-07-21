import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent {
  title = 'uros-zukancic-asseco-intern-app';
  opened = false;
  @Input() showMsg: boolean = false;  // <-- default when `[showMsg]` is not bound in parent


}
