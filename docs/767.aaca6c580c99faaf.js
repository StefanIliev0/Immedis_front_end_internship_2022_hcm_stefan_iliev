"use strict";(self.webpackChunkcurrent_directory=self.webpackChunkcurrent_directory||[]).push([[767],{5767:(C,b,c)=>{c.r(b),c.d(b,{AuthModule:()=>S});var l=c(6814),h=c(1312),a=c(5861),m=c(7394),_=c(4423),e=c(6689),u=c(7715),g=c(3830),r=c(95),d=c(2490),v=c(8482);function y(n,i){1&n&&(e.TgZ(0,"p",12),e._uU(1," Email is required! "),e.qZA())}function x(n,i){1&n&&(e.TgZ(0,"p",12),e._uU(1," Email must be valid Email! "),e.qZA())}function M(n,i){if(1&n&&(e.ynx(0),e.YNc(1,y,2,0,"p",11),e.YNc(2,x,2,0,"p",11),e.BQk()),2&n){e.oxw();const s=e.MAs(8);e.xp6(1),e.Q6J("ngIf",null==s.errors?null:s.errors.required),e.xp6(1),e.Q6J("ngIf",!(null==s.errors||!s.errors.email))}}function P(n,i){1&n&&(e.TgZ(0,"p",12),e._uU(1," Password is required! "),e.qZA())}function Z(n,i){1&n&&(e.TgZ(0,"p",12),e._uU(1," Password must be a least 4 characters! "),e.qZA())}function A(n,i){if(1&n&&(e.ynx(0),e.YNc(1,P,2,0,"p",11),e.YNc(2,Z,2,0,"p",11),e.BQk()),2&n){e.oxw();const s=e.MAs(13);e.xp6(1),e.Q6J("ngIf",null==s.errors?null:s.errors.required),e.xp6(1),e.Q6J("ngIf",!(null==s.errors||!s.errors.minlength))}}let T=(()=>{var n;class i{constructor(t,o,p){this.service=t,this.store=o,this.router=p,this.subscr$=new m.w0}login(t){var o=this;return(0,a.Z)(function*(){t.invalid?o.service.addErr("Sorry , but something in your fields isn't right."):o.subscr$=o.service.loginUser(t.value.email,t.value.password).subscribe(p=>{const f=p.user;o.store.dispatch(_.X.add({user:f}));const{isHavePermisions:w,pathString:B,companyName:k}=o.service.generatePath(f.permissions);o.router.navigate(f.isNewEmpl?["auth/change_password"]:w?[B]:[`${k}/employee/${f._id}/information`])})})()}ngOnDestroy(){this.subscr$.unsubscribe()}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(u.e),e.Y36(g.yh),e.Y36(h.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-login"]],decls:17,vars:4,consts:[[1,"container"],[1,"login-form",3,"ngSubmit"],["form","ngForm"],["for","username"],["type","email","name","email","placeholder","Your email...","id","email","ngModel","","required","","email",""],["username","ngModel"],[4,"ngIf"],["for","password"],["type","password","name","password","id","password-register","placeholder","Your password...","ngModel","","required","","minlength","4"],["password","ngModel"],[3,"text","type","newEvent"],["class","error",4,"ngIf"],[1,"error"]],template:function(t,o){if(1&t){const p=e.EpF();e.TgZ(0,"div",0)(1,"form",1,2),e.NdJ("ngSubmit",function(){e.CHM(p);const w=e.MAs(2);return e.KtG(o.login(w))}),e.TgZ(3,"h1"),e._uU(4,"Login"),e.qZA(),e.TgZ(5,"label",3),e._uU(6,"Email"),e.qZA(),e._UZ(7,"input",4,5),e.YNc(9,M,3,2,"ng-container",6),e.TgZ(10,"label",7),e._uU(11,"Password"),e.qZA(),e._UZ(12,"input",8,9),e.YNc(14,A,3,2,"ng-container",6),e._UZ(15,"app-err-message"),e.TgZ(16,"app-button",10),e.NdJ("newEvent",function(){e.CHM(p);const w=e.MAs(2);return e.KtG(o.login(w))}),e.qZA()()()}if(2&t){const p=e.MAs(8),f=e.MAs(13);e.xp6(9),e.Q6J("ngIf",p.touched),e.xp6(5),e.Q6J("ngIf",f.touched),e.xp6(2),e.Q6J("text","Login")("type","submit")}},dependencies:[l.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.wO,r.on,r.On,r.F,d.r,v.N],styles:[".login-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2em;align-items:center;margin:3em auto;background:var(--distributed_gray);border-radius:1em;padding-block:3em;max-width:600px}input[_ngcontent-%COMP%]{border:none;border-radius:.5em;padding:.5em;width:22em;background:var(--distributed_blue)}label[_ngcontent-%COMP%]{font-size:1.8em;font-weight:700;font-style:italic}a[_ngcontent-%COMP%]{display:inline;font-weight:700}h1[_ngcontent-%COMP%]{color:var(--white);text-shadow:0 0 10px rgba(0,0,0,.8)}.error[_ngcontent-%COMP%]{font-size:1.2em;color:red}"]}),i})();var O=c(2171);function E(n,i){1&n&&(e.TgZ(0,"p",12),e._uU(1," Password and repeat password must be identical! "),e.qZA())}function J(n,i){1&n&&(e.TgZ(0,"p",12),e._uU(1," Password is required! "),e.qZA())}function N(n,i){1&n&&(e.TgZ(0,"p",12),e._uU(1," Password must be a least 4 characters! "),e.qZA())}function Y(n,i){if(1&n&&(e.ynx(0),e.YNc(1,E,2,0,"p",11),e.YNc(2,J,2,0,"p",11),e.YNc(3,N,2,0,"p",11),e.BQk()),2&n){e.oxw();const s=e.MAs(8),t=e.MAs(12);e.xp6(1),e.Q6J("ngIf",s.value!=t.value),e.xp6(1),e.Q6J("ngIf",null==s.errors?null:s.errors.required),e.xp6(1),e.Q6J("ngIf",!(null==s.errors||!s.errors.minlength))}}let L=(()=>{var n;class i{constructor(t,o,p){this.service=t,this.store=o,this.router=p,this.subscr$=new m.w0,this.user$=new m.w0,this.companyName="",this.pathString="",this.userId="",this.isHavePermisions=!1}ngOnInit(){this.user$=this.store.select(O.d).subscribe(t=>{let o=t,{isHavePermisions:p,pathString:f,companyName:w}=this.service.generatePath(o.permissions);this.isHavePermisions=p,this.pathString=f,this.companyName=w,this.userId=o._id})}changePassword(t){var o=this;return(0,a.Z)(function*(){t.invalid?o.service.addErr("Sorry , but something in your fields isn't right."):o.subscr$=o.service.changePassword(o.userId,o.companyName,t.value.password).subscribe(p=>{o.router.navigate(o.isHavePermisions?[o.pathString]:[`${o.companyName}/profile/${o.userId}`])})})()}ngOnDestroy(){this.subscr$.unsubscribe(),this.user$.unsubscribe()}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(u.e),e.Y36(g.yh),e.Y36(h.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-change-password"]],decls:16,vars:3,consts:[[1,"container"],[1,"pass-form",3,"ngSubmit"],["form","ngForm"],["for","password"],["type","password","name","password","id","password","placeholder","Your new password...","ngModel","","required","","minlength","4"],["password","ngModel"],["for","repeatPassword"],["type","password","name","repeatPassword","id","repeatPassword","placeholder","Repeat your new password...","ngModel","","required","","minlength","4"],["repeatPassword","ngModel"],[4,"ngIf"],[3,"text","type","newEvent"],["class","error",4,"ngIf"],[1,"error"]],template:function(t,o){if(1&t){const p=e.EpF();e.TgZ(0,"div",0)(1,"form",1,2),e.NdJ("ngSubmit",function(){e.CHM(p);const w=e.MAs(2);return e.KtG(o.changePassword(w))}),e.TgZ(3,"h1"),e._uU(4,"Change password"),e.qZA(),e.TgZ(5,"label",3),e._uU(6,"Password"),e.qZA(),e._UZ(7,"input",4,5),e.TgZ(9,"label",6),e._uU(10,"Repeat password"),e.qZA(),e._UZ(11,"input",7,8),e.YNc(13,Y,4,3,"ng-container",9),e._UZ(14,"app-err-message"),e.TgZ(15,"app-button",10),e.NdJ("newEvent",function(){e.CHM(p);const w=e.MAs(2);return e.KtG(o.changePassword(w))}),e.qZA()()()}if(2&t){const p=e.MAs(8);e.xp6(13),e.Q6J("ngIf",p.touched),e.xp6(2),e.Q6J("text","Change")("type","submit")}},dependencies:[l.O5,r._Y,r.Fj,r.JJ,r.JL,r.Q7,r.wO,r.On,r.F,d.r,v.N],styles:[".pass-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2em;align-items:center;margin:3em auto;background:var(--distributed_gray);border-radius:1em;padding-block:3em;max-width:600px}input[_ngcontent-%COMP%]{border:none;border-radius:.5em;padding:.5em;width:22em;background:var(--distributed_blue)}label[_ngcontent-%COMP%]{font-size:1.8em;font-weight:700;font-style:italic}a[_ngcontent-%COMP%]{display:inline;font-weight:700}h1[_ngcontent-%COMP%]{color:var(--white);text-shadow:0 0 10px rgba(0,0,0,.8)}.error[_ngcontent-%COMP%]{font-size:1.2em;color:red}"]}),i})();var U=c(8469);const I=[{path:"",component:(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-auth"]],decls:1,vars:0,template:function(t,o){1&t&&e._UZ(0,"router-outlet")},dependencies:[h.lC]}),i})(),children:[{path:"login",component:T},{path:"change_password",component:L},{path:"logout",component:(()=>{var n;class i{constructor(t,o){this.store=t,this.router=o}ngOnInit(){this.store.dispatch(_.X.remove()),this.store.dispatch(U.s.remove()),this.router.navigate(["/"])}}return(n=i).\u0275fac=function(t){return new(t||n)(e.Y36(g.yh),e.Y36(h.F0))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-logout"]],decls:0,vars:0,template:function(t,o){}}),i})()}]}];let F=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[h.Bz.forChild(I),h.Bz]}),i})();var Q=c(6208);let S=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[u.e],imports:[l.ez,F,r.u5,Q.m]}),i})()},2490:(C,b,c)=>{c.d(b,{r:()=>h});var l=c(6689);let h=(()=>{var a;class m{constructor(){this.newEvent=new l.vpe,this.disabled=!1}onClick(e){e.preventDefault(),e.stopPropagation(),this.newEvent.emit(),this.disabled=!0,setTimeout(()=>{this.disabled=!1},2e3)}}return(a=m).\u0275fac=function(e){return new(e||a)},a.\u0275cmp=l.Xpm({type:a,selectors:[["app-button"]],inputs:{text:"text",type:"type",disabled:"disabled"},outputs:{newEvent:"newEvent"},decls:2,vars:3,consts:[[3,"disabled","type","click"]],template:function(e,u){1&e&&(l.TgZ(0,"button",0),l.NdJ("click",function(r){return u.onClick(r)}),l._uU(1),l.qZA()),2&e&&(l.Q6J("disabled",u.disabled)("type",u.type||"button"),l.xp6(1),l.Oqu(u.text))},styles:["button[_ngcontent-%COMP%]{padding:.5em;border-radius:.5em;background-color:var(--background-button);color:var(--white);border:3px solid var(--white);margin:0 auto;text-align:center;font-weight:700;width:9em;transition:color .3s ease-in-out,border-color .3s ease-in-out,background-color .3s ease-in-out;opacity:0;animation:_ngcontent-%COMP%_fade-in 1s ease-in-out forwards}button[_ngcontent-%COMP%]:hover{cursor:pointer;color:var(--background-button);background-color:var(--white);border-color:var(--background-button);transition:color .7s ease-in-out,background-color .5s ease-in-out,border-color .5s ease-in-out}button[_ngcontent-%COMP%]:disabled{background-color:gray}@keyframes _ngcontent-%COMP%_fade-in{0%{opacity:0}to{opacity:1}}"]}),m})()},8482:(C,b,c)=>{c.d(b,{N:()=>e});var l=c(3830);const h=(0,l.ZF)("err");var a=c(6689),m=c(6814);function _(u,g){if(1&u&&(a.ynx(0),a.TgZ(1,"p",1),a._uU(2),a.ALo(3,"async"),a.qZA(),a.BQk()),2&u){const r=a.oxw();a.xp6(2),a.Oqu(a.lcZ(3,1,r.err))}}let e=(()=>{var u;class g{constructor(d){this.store=d,this.err=this.store.select(h)}}return(u=g).\u0275fac=function(d){return new(d||u)(a.Y36(l.yh))},u.\u0275cmp=a.Xpm({type:u,selectors:[["app-err-message"]],decls:2,vars:3,consts:[[4,"ngIf"],[1,"error"]],template:function(d,v){1&d&&(a.YNc(0,_,4,3,"ng-container",0),a.ALo(1,"async")),2&d&&a.Q6J("ngIf",a.lcZ(1,1,v.err))},dependencies:[m.O5,m.Ov],styles:[".error[_ngcontent-%COMP%]{font-size:1.2em;color:red}"]}),g})()},5861:(C,b,c)=>{function l(a,m,_,e,u,g,r){try{var d=a[g](r),v=d.value}catch(y){return void _(y)}d.done?m(v):Promise.resolve(v).then(e,u)}function h(a){return function(){var m=this,_=arguments;return new Promise(function(e,u){var g=a.apply(m,_);function r(v){l(g,e,u,r,d,"next",v)}function d(v){l(g,e,u,r,d,"throw",v)}r(void 0)})}}c.d(b,{Z:()=>h})}}]);