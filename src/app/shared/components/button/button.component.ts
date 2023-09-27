import { Component, Output,Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Output() newEvent = new EventEmitter();
  @Input() text?: string; 
  @Input() type? : string;
  @Input() disabled = false;

  onClick(e : Event):void {
    e.preventDefault();
    e.stopPropagation();
  this.newEvent.emit();
  this.disabled = true ; 
  setTimeout(() => {
    this.disabled = false;
  },2000 )
  }
}
