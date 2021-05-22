import{p as t,a as e,r as s,o as a,c as r,b as n,w as i,d as o,F as l,t as d,e as c,f as u,g as p,h,i as m,v as g,j as P,K as _,X as v}from"./vendor.1c2783e1.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(s){const a=new URL(t,location),r=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((s,n)=>{const i=new URL(t,a);if(self[e].moduleMap[i])return s(self[e].moduleMap[i]);const o=new Blob([`import * as m from '${i}';`,`${e}.moduleMap['${i}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){n(new Error(`Failed to import: ${t}`)),r(l)},onload(){s(self[e].moduleMap[i]),r(l)}});document.head.appendChild(l)})),self[e].moduleMap={}}}("/lego-set-checker/assets/");var f={name:"Header",props:{contentSelector:String},data:()=>({searchedSet:"",sets:[]}),methods:{async onSearch(t){const e=await this.$http.get(`${{}.VITE_API_BASE_URL}/lego/sets`,{params:{search:t},headers:{Authorization:`key ${{}.VITE_API_KEY}`}});this.sets=e.data.results.map((t=>({label:`${t.set_num} | ${t.name}`,key:t.set_num})))},onSelect(t){this.searchedSet=t.label,this.$emit("setSelected",t.key)}},emits:["setSelected"]};const y=i("data-v-35c2ccd2");t("data-v-35c2ccd2");const $={class:"searchbar__icon"},S=o("search");e();const w=y(((t,e,i,o,l,d)=>{const c=s("ui-icon"),u=s("ui-autocomplete"),p=s("ui-top-app-bar");return a(),r(p,{"nav-icon":!1,"content-selector":i.contentSelector,title:"Lego Set Checker"},{toolbar:y((()=>[n(u,{"model-value":l.searchedSet,source:l.sets,class:"autocomplete",delay:"500",placeholder:"Search set by ID",remote:"",onSearch:d.onSearch,onSelected:d.onSelect},{after:y((()=>[n("div",$,[n(c,{dark:"",outlined:""},{default:y((()=>[S])),_:1})])])),_:1},8,["model-value","source","onSearch","onSelected"])])),_:1},8,["content-selector"])}));f.render=w,f.__scopeId="data-v-35c2ccd2";const b=t=>{const e=localStorage.getItem(t);return e?JSON.parse(e):void 0};var x={name:"SetCard",computed:{set(){return this.$store.state.set},missingParts(){return this.$store.state.missingParts},uniqueMissingParts(){return this.$store.state.uniqueMissingParts}},data:()=>({missingOnly:!1}),methods:{async fetchParts(){this.$emit("fetchParts",this.set.set_num)},handleExport(){let t=b(this.set.set_num);if(null==t?void 0:t.parts){let e="sep=,\r\n\n";["id","name","quantity","quantity_owned","url"].forEach((t=>e+=`${t},`)),e=`${e.slice(0,-1)}\r\n`,t.parts.map((t=>({id:t.id,name:t.part.name,quantity:t.quantity,quantity_owned:t.quantity_owned,url:t.part.part_url}))).filter((t=>!this.missingOnly||t.quantity>(t.quantity_owned||0))).forEach((t=>{let s="";Object.values(t).forEach((t=>s+=`"${t||0}",`)),e+=`${s}\r\n`})),l.saveAs(new File([e],`${this.set.set_num} - ${this.set.name}.csv`,{type:"text/csv"}))}}},emits:["fetchParts"]};const E=i("data-v-423c7723");t("data-v-423c7723");const k={key:0,class:"set-card__container"},C={class:"set-card__info"},I={class:"set-card__info-text"},q=n("div",{class:"set-card__info-labels"},[n("div",null,"Name:"),n("div",null,"Set-Number:"),n("div",null,"Parts:")],-1),M={class:"set-card__info-values"},A=o("Get parts"),N={class:"set-card__missing-parts"},O={class:"set-card__info-text"},L=n("div",{class:"set-card__info-labels"},[n("div",null,"Total:"),n("div",null,"Missing:"),n("div",null,"Unique missing:")],-1),V={class:"set-card__info-values right-align"},R={class:"set-card__checkbox-container"},U=n("label",{for:"checkbox"},"Missing Only",-1),T=o("Export");e();const j=E(((t,e,i,o,l,u)=>{const p=s("ui-button"),h=s("ui-checkbox");return u.set?(a(),r("div",k,[n("div",null,[n("img",{src:u.set.set_img_url,alt:"",class:"set-card__image",width:"200"},null,8,["src"])]),n("div",C,[n("div",I,[q,n("div",M,[n("div",null,d(u.set.name),1),n("div",null,d(u.set.set_num),1),n("div",null,d(u.set.num_parts),1)])]),n(p,{raised:"",onClick:u.fetchParts},{default:E((()=>[A])),_:1},8,["onClick"])]),n("div",N,[n("div",O,[L,n("div",V,[n("div",null,d(u.set.num_parts),1),n("div",null,d(u.missingParts),1),n("div",null,d(u.uniqueMissingParts),1)])]),n("div",R,[n(h,{modelValue:l.missingOnly,"onUpdate:modelValue":e[1]||(e[1]=t=>l.missingOnly=t),"input-id":"checkbox"},null,8,["modelValue"]),U]),n(p,{raised:"",onClick:u.handleExport},{default:E((()=>[T])),_:1},8,["onClick"])])])):c("",!0)}));x.render=j,x.__scopeId="data-v-423c7723";var F={name:"PartCard",props:{part:null},methods:{handlePersistPart(){((t,e)=>{var s;const a=b(t);if(!a)throw new Error(`set with id ${t} was not found in local storage`);a.parts=null==(s=a.parts)?void 0:s.map((t=>t.id===e.id?e:t)),localStorage.setItem(t,JSON.stringify(a))})(this.part.set_num,this.part),this.$store.dispatch("setMissingParts")}}};const z=i("data-v-846175d6");t("data-v-846175d6");const K={key:0,class:"part-card__container"},B={class:"part-card__info"},J=n("div",{class:"part-card__info-labels"},[n("div",null,"Name:"),n("div",null,"Quantity:")],-1),Y={class:"part-card__info-values"},G={class:"part-card__form"},H=n("hr",null,null,-1);e();const Q=z(((t,e,i,o,l,p)=>{const h=s("ui-textfield");return a(),r(u,null,[i.part?(a(),r("div",K,[n("img",{src:i.part.part.part_img_url,alt:"",class:"part-card__image",width:"100"},null,8,["src"]),n("div",B,[J,n("div",Y,[n("div",null,d(i.part.part.name),1),n("div",null,d(i.part.quantity),1)])]),n("div",G,[n(h,{modelValue:i.part.quantity_owned,"onUpdate:modelValue":e[1]||(e[1]=t=>i.part.quantity_owned=t),modelModifiers:{number:!0},"input-type":"number",placeholder:"Quantity owned",onChange:p.handlePersistPart},null,8,["modelValue","onChange"])])])):c("",!0),H],64)}));F.render=Q,F.__scopeId="data-v-846175d6";const D=t=>parseInt(t.slice(t.indexOf("page=")+5,t.lastIndexOf("&")));var X={name:"PartsList",components:{PartCard:F},props:{loading:!1,partsCount:null},computed:{set(){return this.$store.state.set},parts(){return this.$store.state.parts},nextPage(){return this.$store.state.nextPage},prevPage(){return this.$store.state.prevPage}},methods:{handlePrev(){this.$emit("getPartsPage",this.prevPage)},handleNext(){this.$emit("getPartsPage",this.nextPage)},getCurrentPageNumber(){return this.nextPage?D(this.nextPage)-1:this.prevPage?D(this.prevPage)+1:void 0},getTotalPages(){return Math.ceil(this.partsCount/5)},updateMissingParts(){this.$emit("updateMissingParts")}},emits:["getPartsPage","updateMissingParts"]};const W=i("data-v-6acd8266");t("data-v-6acd8266");const Z={key:0,class:"parts-container"},tt={key:0,class:"parts-list"},et={key:1,class:"parts-list"},st={class:"page-buttons"},at=o("prev"),rt=o("next");e();const nt=W(((t,e,i,o,l,h)=>{const m=s("ui-spinner"),g=s("PartCard"),P=s("ui-button");return h.parts&&h.set?(a(),r("div",Z,[i.loading?(a(),r("div",tt,[n(m,{active:""})])):(a(),r("div",et,[(a(!0),r(u,null,p(h.parts,(t=>(a(),r(g,{part:t},null,8,["part"])))),256))])),n("div",st,[n(P,{disabled:!h.prevPage,raised:"",onClick:h.handlePrev},{default:W((()=>[at])),_:1},8,["disabled","onClick"]),n("div",null,d(h.getCurrentPageNumber()||0)+" / "+d(h.getTotalPages()||0),1),n(P,{disabled:!h.nextPage,raised:"",onClick:h.handleNext},{default:W((()=>[rt])),_:1},8,["disabled","onClick"])])])):c("",!0)}));X.render=nt,X.__scopeId="data-v-6acd8266";var it={name:"app",components:{PartsList:X,PartCard:F,SetCard:x,Header:f},data:()=>({loading:!1,partsCount:0}),computed:{set(){return this.$store.state.set}},methods:{async onSelect(t){const e=b();if(e)await this.$store.dispatch("setSet",e);else{const e=await this.$http.get(`${{}.VITE_API_BASE_URL}/lego/sets/${t}`,{headers:{Authorization:`key ${{}.VITE_API_KEY}`}});await this.$store.dispatch("setSet",e.data),localStorage.getItem(this.set.set_num)||localStorage.setItem(this.set.set_num,JSON.stringify(this.set))}},async getParts(){await this.$store.dispatch("setParts",[]),this.loading=!0;const t=await this.$http.get(`${{}.VITE_API_BASE_URL}/lego/sets/${this.set.set_num}/parts`,{headers:{Authorization:`key ${{}.VITE_API_KEY}`},params:{page_size:5}});this.handleResponseParts(t)},async getPartsPage(t){await this.$store.dispatch("setParts",[]),this.loading=!0;const e=await this.$http.get(t,{headers:{Authorization:`key ${{}.VITE_API_KEY}`}});this.handleResponseParts(e)},handleResponseParts(t){t.data.results.forEach((t=>{const e=((t,e)=>{var s;const a=b(t);return a?null==(s=a.parts)?void 0:s.find((t=>t.id===e.id)):void 0})(this.set.set_num,t);e?this.$store.dispatch("pushPart",e):this.$store.dispatch("pushPart",t)})),this.loading=!1,this.partsCount=t.data.count,this.$store.dispatch("setNextPage",t.data.next),this.$store.dispatch("setPrevPage",t.data.previous),this.$store.dispatch("setMissingParts"),((t,e)=>{const s=b(t);if(!s)throw new Error(`set with id ${t} was not found in local storage`);e.forEach((t=>{var e,a,r;s.parts||(s.parts=[]),(null==(a=null==(e=s.parts)?void 0:e.map((t=>t.id)))?void 0:a.includes(t.id))||null==(r=s.parts)||r.push(t)})),localStorage.setItem(t,JSON.stringify(s))})(this.set.set_num,this.$store.state.parts)}}};const ot={id:"root"},lt=n("hr",{style:{margin:"0"}},null,-1);it.render=function(t,e,i,o,l,d){const c=s("Header"),p=s("SetCard"),h=s("PartsList");return a(),r(u,null,[n(c,{"content-selector":"#root",onSetSelected:d.onSelect},null,8,["onSetSelected"]),n("div",ot,[n(p,{onFetchParts:d.getParts},null,8,["onFetchParts"]),lt,n(h,{loading:l.loading,"parts-count":l.partsCount,onGetPartsPage:d.getPartsPage},null,8,["loading","parts-count","onGetPartsPage"])])],64)};const dt=Symbol(),ct=h({state:()=>({set:void 0,parts:[],prevPage:"",nextPage:"",missingParts:0,uniqueMissingParts:0}),mutations:{setSet(t,e){t.set=e},setParts(t,e){t.parts=e},pushPart(t,e){var s;null==(s=t.parts)||s.push(e)},setPrevPage(t,e){t.prevPage=e},setNextPage(t,e){t.nextPage=e},setMissingParts(t){if(t.set){const e=(t=>{var e;const s=b(t);if(!s)return;let a=0;return null==(e=s.parts)||e.forEach((t=>{t.quantity_owned&&(a+=t.quantity_owned)})),s.num_parts-a})(t.set.set_num);e&&(t.missingParts=e);const s=(t=>{var e;const s=b(t);if(!s)return;let a=0;return null==(e=s.parts)||e.forEach((t=>{t.quantity_owned?t.quantity_owned<t.quantity&&a++:a++})),a})(t.set.set_num);s&&(t.uniqueMissingParts=s)}}},actions:{setSet(t,e){t.commit("setSet",e)},setParts(t,e){t.commit("setParts",e)},pushPart(t,e){t.commit("pushPart",e)},setPrevPage(t,e){t.commit("setPrevPage",e)},setNextPage(t,e){t.commit("setNextPage",e)},setMissingParts(t){t.commit("setMissingParts")}}}),ut=m(it);ut.use(g,P),ut.use(_),ut.use(v),ut.use(ct,dt),ut.mount("#app");
