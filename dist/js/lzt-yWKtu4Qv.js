import{d as t}from"./lzt-BXPC5eX4.js";let a=!1;const n=()=>new Promise((t=>{a?setTimeout(t,0):(a=!0,t())})),o=()=>{a=!1},i=t({id:"loading",state:()=>({count:0}),getters:{loading(){return this.count>0}},actions:{async openLoading(){await n();try{this.count=Math.max(1,this.count+1)}finally{o()}},async closeLoading(){await n();try{this.count=Math.max(0,this.count-1)}finally{o()}}}});export{i as u};
