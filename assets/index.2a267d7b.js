import{p as e,a as t,r as a,o as s,c as r,b as n,w as o,d as l,t as c,e as d,F as i,f as u,g as h,h as p,v as m,i as _,K as v,X as S}from"./vendor.6ba19610.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,n)=>{const o=new URL(e,s);if(self[t].moduleMap[o])return a(self[t].moduleMap[o]);const l=new Blob([`import * as m from '${o}';`,`${t}.moduleMap['${o}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){n(new Error(`Failed to import: ${e}`)),r(c)},onload(){a(self[t].moduleMap[o]),r(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/lego-set-checker/assets/");var g={name:"Header",props:{contentSelector:String},data:()=>({searchedSet:"",sets:[]}),methods:{async onSearch(e){const t=await this.$http.get(`${{}.VITE_API_BASE_URL}/lego/sets`,{params:{search:e},headers:{Authorization:`key ${{}.VITE_API_KEY}`}});this.sets=t.data.results.map((e=>({label:`${e.set_num} | ${e.name}`,key:e.set_num})))},onSelect(e){this.searchedSet=e.label,this.$emit("setSelected",e.key)}},emits:["setSelected"]};const f=o("data-v-5e280fa9");e("data-v-5e280fa9");const P={class:"searchbar__icon"},y=l("search");t();const w=f(((e,t,o,l,c,d)=>{const i=a("ui-icon"),u=a("ui-autocomplete"),h=a("ui-top-app-bar");return s(),r(h,{"content-selector":o.contentSelector,title:"Lego Set Checker"},{toolbar:f((()=>[n(u,{"model-value":c.searchedSet,source:c.sets,class:"autocomplete",delay:"500",placeholder:"Search set by ID",remote:"",onSearch:d.onSearch,onSelected:d.onSelect},{after:f((()=>[n("div",P,[n(i,{dark:"",outlined:""},{default:f((()=>[y])),_:1})])])),_:1},8,["model-value","source","onSearch","onSelected"])])),_:1},8,["content-selector"])}));g.render=w,g.__scopeId="data-v-5e280fa9";var b={name:"SetCard",props:{searchedSet:null},methods:{async fetchParts(){this.$emit("fetchParts",this.searchedSet.set_num)}},emits:["fetchParts"]};const I=o("data-v-176d4260");e("data-v-176d4260");const $={key:0,class:"set-card__container"},E={class:"set-card__info"},k={class:"set-card__info-text"},A=n("div",{class:"set-card__info-labels"},[n("div",null,"Name:"),n("div",null,"Set-Number:"),n("div",null,"Parts:")],-1),C={class:"set-card__info-values"},x=l("Get parts");t();const L=I(((e,t,o,l,i,u)=>{const h=a("ui-button");return o.searchedSet?(s(),r("div",$,[n("img",{src:o.searchedSet.set_img_url,alt:"",class:"set-card__image",width:"200"},null,8,["src"]),n("div",E,[n("div",k,[A,n("div",C,[n("div",null,c(o.searchedSet.name),1),n("div",null,c(o.searchedSet.set_num),1),n("div",null,c(o.searchedSet.num_parts),1)])]),n(h,{raised:"",onClick:u.fetchParts},{default:I((()=>[x])),_:1},8,["onClick"])])])):d("",!0)}));b.render=L,b.__scopeId="data-v-176d4260";const U=e=>{const t=localStorage.getItem(e);return t?JSON.parse(t):void 0};var V={name:"PartCard",props:{part:null},methods:{handlePersistPart(){((e,t)=>{var a;const s=U(e);if(!s)throw new Error(`set with id ${e} was not found in local storage`);s.parts=null==(a=s.parts)?void 0:a.map((e=>e.id===t.id?t:e)),localStorage.setItem(e,JSON.stringify(s))})(this.part.set_num,this.part)}}};const R=o("data-v-d940cbca");e("data-v-d940cbca");const N={key:0,class:"part-card__container"},O={class:"part-card__info"},T=n("div",{class:"part-card__info-labels"},[n("div",null,"Name:"),n("div",null,"Quantity:")],-1),M={class:"part-card__info-values"},j={class:"part-card__form"},z=n("hr",null,null,-1);t();const F=R(((e,t,o,l,u,h)=>{const p=a("ui-textfield");return s(),r(i,null,[o.part?(s(),r("div",N,[n("img",{src:o.part.part.part_img_url,alt:"",class:"part-card__image",width:"100"},null,8,["src"]),n("div",O,[T,n("div",M,[n("div",null,c(o.part.part.name),1),n("div",null,c(o.part.quantity),1)])]),n("div",j,[n(p,{modelValue:o.part.quantity_owned,"onUpdate:modelValue":t[1]||(t[1]=e=>o.part.quantity_owned=e),modelModifiers:{number:!0},"input-type":"number",placeholder:"Quantity owned",onChange:h.handlePersistPart},null,8,["modelValue","onChange"])])])):d("",!0),z],64)}));V.render=F,V.__scopeId="data-v-d940cbca";const K=(e,t)=>{const a=U(e);if(!a)throw new Error(`set with id ${e} was not found in local storage`);t.forEach((e=>{var t,s,r;a.parts||(a.parts=[]),(null==(s=null==(t=a.parts)?void 0:t.map((e=>e.id)))?void 0:s.includes(e.id))||null==(r=a.parts)||r.push(e)})),localStorage.setItem(e,JSON.stringify(a))};var B={name:"app",components:{PartCard:V,SetCard:b,Header:g},data:()=>({searchedSet:null,parts:[],nextPage:"",prevPage:""}),methods:{async onSelect(e){const t=U();if(t)this.searchedSet=t;else{const t=await this.$http.get(`${{}.VITE_API_BASE_URL}/lego/sets/${e}`,{headers:{Authorization:`key ${{}.VITE_API_KEY}`}});this.searchedSet=t.data,localStorage.getItem(this.searchedSet.set_num)||localStorage.setItem(this.searchedSet.set_num,JSON.stringify(this.searchedSet))}},async getParts(){const e=await this.$http.get(`${{}.VITE_API_BASE_URL}/lego/sets/${this.searchedSet.set_num}/parts`,{headers:{Authorization:`key ${{}.VITE_API_KEY}`},params:{page_size:5}});e.data.results.forEach((e=>{const t=((e,t)=>{var a;const s=U(e);return s?null==(a=s.parts)?void 0:a.find((e=>e.id===t.id)):void 0})(this.searchedSet.set_num,e);t?this.parts.push(t):this.parts.push(e)})),this.nextPage=e.data.next,this.prevPage=e.data.previous,K(this.searchedSet.set_num,this.parts)},async getPartsPage(e){const t=await this.$http.get(e,{headers:{Authorization:`key ${{}.VITE_API_KEY}`}});this.parts=t.data.results,this.nextPage=t.data.next,this.prevPage=t.data.previous,K(this.searchedSet.set_num,this.parts)}}};const J={id:"root"},Y=n("hr",{style:{margin:"0"}},null,-1),q={key:0},H={class:"parts-list"},Q={class:"page-buttons"},D=l("prev"),G=l("next");B.render=function(e,t,o,l,c,p){const m=a("Header"),_=a("SetCard"),v=a("PartCard"),S=a("ui-button");return s(),r(i,null,[n(m,{"content-selector":"#root",onSetSelected:p.onSelect},null,8,["onSetSelected"]),n("div",J,[n(_,{"searched-set":c.searchedSet,onFetchParts:p.getParts},null,8,["searched-set","onFetchParts"]),Y,c.parts?(s(),r("div",q,[n("div",H,[(s(!0),r(i,null,u(c.parts,(e=>(s(),r(v,{part:e},null,8,["part"])))),256))]),n("div",Q,[c.prevPage?(s(),r(S,{key:0,raised:"",onClick:t[1]||(t[1]=e=>p.getPartsPage(c.prevPage))},{default:h((()=>[D])),_:1})):d("",!0),c.nextPage?(s(),r(S,{key:1,raised:"",onClick:t[2]||(t[2]=e=>p.getPartsPage(c.nextPage))},{default:h((()=>[G])),_:1})):d("",!0)])])):d("",!0)])],64)};const X=p(B);X.use(m,_),X.use(v),X.use(S),X.mount("#app");
