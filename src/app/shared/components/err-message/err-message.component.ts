import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectErr } from 'src/app/store/selectors/err.selector';

@Component({
  selector: 'app-err-message',
  templateUrl: './err-message.component.html',
  styleUrls: ['./err-message.component.css']
})
export class ErrMessageComponent {
  // get error message from Error store.
  err  = this.store.select(selectErr)
  constructor(private store : Store<{err : string}>){
  }


}
