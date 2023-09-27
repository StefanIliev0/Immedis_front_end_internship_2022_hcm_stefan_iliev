import {
    animate,
    query,
    sequence,
    state,
    style,
    transition,
    trigger
  } from "@angular/animations";
  
  export const DropDownAnimation =   trigger('dropDownMenu', [
    state('open', style({ height: "*", overflow: "hidden" })),
    state('close', style({ height: 0, overflow: "hidden" })),
    transition('open => close', [
      animate('0.4s')
    ]),
    transition('close => open', [
      animate('0.4s')
    ]),
  ]);
