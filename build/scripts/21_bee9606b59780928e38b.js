(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{GZoT:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e=location.href.split("?")[1];if(e){var t={};return(e=e.split("#")[0]).split("&").forEach(function(e){var n=e.split("=");if(2===n.length){var i=n[0],r=decodeURIComponent(n[1]);t[i]?t[i]=[r].concat(t[i]):t[i]=r}}),t}return{}}},WVMr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,r,a,o,l,u,c,f,s,d,p,m,h,y,v,b,_,g,k,w,M,x,O,D,z,E=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),T=n("cneo"),j=n("wy2R"),P=(z=j)&&z.__esModule?z:{default:z};function S(e,t,n,i){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(i):void 0})}function C(e,t,n,i,r){var a={};return Object.keys(i).forEach(function(e){a[e]=i[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=n.slice().reverse().reduce(function(n,i){return i(e,t,n)||n},a),r&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(r):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}var Y=(i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),S(this,"money_type_list",r,this),S(this,"selectSex",a,this),S(this,"bank_list",o,this),S(this,"selected_bank",l,this),S(this,"origin_service_type_list",u,this),S(this,"service_type_list",c,this),S(this,"service_type",f,this),S(this,"service_content_list",s,this),S(this,"service_content",d,this),S(this,"showMoney",p,this),S(this,"showMoneyType",m,this),S(this,"date",h,this),S(this,"time",y,this),S(this,"name",v,this),S(this,"inputPhone",b,this),S(this,"identity",_,this),S(this,"money",g,this),S(this,"remark",k,this),S(this,"name_sub",w,this),S(this,"time_begin",M,this),S(this,"time_end",x,this),S(this,"minMaxDate",O,this),S(this,"minMaxTime",D,this)}return E(e,[{key:"init",get:function(){return this.service_type.length>0&&-1!==this.service_type[0].indexOf("对公")?{type:"对公"}:{type:"个人"}}},{key:"phone",get:function(){return this.inputPhone&&this.inputPhone.split(" ").join("")}},{key:"sex",get:function(){return this.selectSex&&this.selectSex[0]}},{key:"bank_id",get:function(){return this.selected_bank&&this.selected_bank[0]}},{key:"service",get:function(){return this.service_type&&this.service_type[0]}},{key:"service_item",get:function(){return this.service_content&&this.service_content[0]}},{key:"day",get:function(){if(this.date&&this.time){var e=(0,P.default)(this.date).format("YYYY-MM-DD"),t=(0,P.default)(this.time).format("HH:mm");return(0,P.default)(e+" "+t,"YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")}return null}},{key:"disableBtn",get:function(){return"对公"===this.init.type&&!this.name_sub||(!(!this.showMoneyType||Array.from(this.money_type_list).some(function(e){return!!e.checked}))||(!this.name||!this.phone||!this.identity||!this.sex||!this.bank_id||!this.service||!this.service_item||!this.day||this.showMoney&&!this.money))}}]),e}(),r=C(i.prototype,"money_type_list",[T.observable],{enumerable:!0,initializer:function(){return[{checked:!1,value:"5角"},{checked:!1,value:"1元"},{checked:!1,value:"5元"},{checked:!1,value:"10元"},{checked:!1,value:"20元"}]}}),a=C(i.prototype,"selectSex",[T.observable],{enumerable:!0,initializer:function(){return[]}}),o=C(i.prototype,"bank_list",[T.observable],{enumerable:!0,initializer:function(){return[]}}),l=C(i.prototype,"selected_bank",[T.observable],{enumerable:!0,initializer:function(){return[]}}),u=C(i.prototype,"origin_service_type_list",[T.observable],{enumerable:!0,initializer:function(){return[]}}),c=C(i.prototype,"service_type_list",[T.observable],{enumerable:!0,initializer:function(){return[]}}),f=C(i.prototype,"service_type",[T.observable],{enumerable:!0,initializer:function(){return[]}}),s=C(i.prototype,"service_content_list",[T.observable],{enumerable:!0,initializer:function(){return[]}}),d=C(i.prototype,"service_content",[T.observable],{enumerable:!0,initializer:function(){return[]}}),p=C(i.prototype,"showMoney",[T.observable],{enumerable:!0,initializer:function(){return!1}}),m=C(i.prototype,"showMoneyType",[T.observable],{enumerable:!0,initializer:function(){return!1}}),h=C(i.prototype,"date",[T.observable],{enumerable:!0,initializer:function(){return null}}),y=C(i.prototype,"time",[T.observable],{enumerable:!0,initializer:function(){return null}}),v=C(i.prototype,"name",[T.observable],{enumerable:!0,initializer:null}),b=C(i.prototype,"inputPhone",[T.observable],{enumerable:!0,initializer:null}),_=C(i.prototype,"identity",[T.observable],{enumerable:!0,initializer:null}),g=C(i.prototype,"money",[T.observable],{enumerable:!0,initializer:null}),k=C(i.prototype,"remark",[T.observable],{enumerable:!0,initializer:function(){return""}}),w=C(i.prototype,"name_sub",[T.observable],{enumerable:!0,initializer:null}),M=C(i.prototype,"time_begin",[T.observable],{enumerable:!0,initializer:function(){return(0,P.default)("08:00","mm:ss")}}),x=C(i.prototype,"time_end",[T.observable],{enumerable:!0,initializer:function(){return(0,P.default)("15:00","mm:ss")}}),O=C(i.prototype,"minMaxDate",[T.observable],{enumerable:!0,initializer:function(){return{}}}),D=C(i.prototype,"minMaxTime",[T.observable],{enumerable:!0,initializer:function(){return{}}}),C(i.prototype,"init",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"init"),i.prototype),C(i.prototype,"phone",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"phone"),i.prototype),C(i.prototype,"sex",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"sex"),i.prototype),C(i.prototype,"bank_id",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"bank_id"),i.prototype),C(i.prototype,"service",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"service"),i.prototype),C(i.prototype,"service_item",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"service_item"),i.prototype),C(i.prototype,"day",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"day"),i.prototype),C(i.prototype,"disableBtn",[T.computed],Object.getOwnPropertyDescriptor(i.prototype,"disableBtn"),i.prototype),i);t.default=new Y},aZFF:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getMinMaxDate=t.getMinMaxTime=void 0;var i,r=n("wy2R"),a=(i=r)&&i.__esModule?i:{default:i};t.getMinMaxTime=function(e,t,n){var i=(0,a.default)(),r=i.format("YYYY-MM-DD"),o=(0,a.default)(e).format("YYYY-MM-DD"),l=void 0,u=void 0,c=t.hour();t.minute(),n.hour(),n.minute();return console.log(t,n),l=o===r?i.hour()<c?t:(0,a.default)().minute()>30?(0,a.default)().add(1,"h").minute(0):(0,a.default)().minute(30):t,u=n,console.log(l,maxTIme),{minDate:l.toDate(),maxDate:u.toDate(),defaultDate:l.toDate()}},t.getMinMaxDate=function(){var e=(0,a.default)(),t=void 0,n=void 0,i=0;return e.hour()>15||15===e.hour()&&e.minute()>0?(i+=1,t=(0,a.default)().add(i,"d").hour(8).minute(0)):t=(0,a.default)().minute(0),n=(0,a.default)().add(i+2,"d").hour(15).minute(0),{minDate:t.toDate(),maxDate:n.toDate()}},t.default=function(){var e=(0,a.default)();return{minDate:(e.minute()>30?e.add(1,"h").minute(0):e.minute(30)).toDate(),maxDate:(0,a.default)().add(2,"d").hour(23).minute(59).toDate()}}},dO77:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.refreshWxToken=t.getWxToken=void 0;var i=o(n("czhI")),r=o(n("GZoT")),a=o(n("SGp1"));function o(e){return e&&e.__esModule?e:{default:e}}var l=null,u=function(e,t,n){var r=a.default.location.pathname,o=location.href.split("#")[0].split("?")[0],u=encodeURIComponent(o+"#"+r),c="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+window.appConfig.appId+"&redirect_uri="+u+"&response_type=code&scope=snsapi_userinfo&state="+n+"#wechat_redirect";if(e)return l||(l=new Promise(function(e,n){i.default.get("/api/v1/token/user",{params:{code:t}}).then(function(t){l=null,e(t)}).catch(function(e){l=null,n(e)})}));window.location=c};t.getWxToken=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=(0,r.default)().code;return-1!==location.host.indexOf("localhost")||-1!==location.host.indexOf("127.0.0.1")?new Promise(function(e,t){t()}):u(!!t,t,e)},t.refreshWxToken=function(){return u(!1)}},jgSJ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,r=z(n("CGtu")),a=z(n("ZAQZ")),o=z(n("AnVD")),l=z(n("Biz3")),u=z(n("icwN")),c=z(n("OSZ1")),f=z(n("5da2")),s=z(n("gyVw")),d=z(n("sqhG")),p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},m=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();n("AZLO"),n("p9mG"),n("FCEn"),n("j15+"),n("1bJb"),n("Xzgj"),n("Nt9i"),n("4Y1d"),n("Wi5A");var h=n("mXGw"),y=z(h),v=z(n("qLGs")),b=z(n("nE73")),_=n("mBK0"),g=n("cneo"),k=z(n("WVMr")),w=n("aZFF"),M=z(n("czhI")),x=z(n("SGp1")),O=n("dO77"),D=z(n("wy2R"));function z(e){return e&&e.__esModule?e:{default:e}}var E=d.default.CheckboxItem,T=(0,_.observer)(i=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.getServiceList=function(){M.default.get("/api/v1/service/services").then(function(e){var t=e.data;k.default.origin_service_type_list=t,k.default.service_type_list=t.map(function(e){return{label:e.category,value:e.category}})}).catch(function(e){var t=e.data;if(t){if(10001===t.error_code||10001===t.errorCode){(0,O.getWxToken)().then(function(e){n.getServiceList()})}}else(0,O.getWxToken)().then(function(e){n.getServiceList()})})},n.getBankList=function(){M.default.get("/api/v1/banks").then(function(e){var t=e.data;k.default.bank_list=t.map(function(e){return{label:e.name+"("+e.address+")",value:e.id}})}).catch(function(e){var t=e.data;if(t){if(10001===t.error_code||10001===t.errorCode){(0,O.getWxToken)().then(function(e){n.getBankList()})}}else(0,O.getWxToken)().then(function(e){n.getBankList()})})},n.sexList=[{label:"男",value:"1"},{label:"女",value:"2"}],n.selectMoneyType=function(e){var t=Array.from(k.default.money_type_list);t.forEach(function(t){e.value===t.value&&(t.checked=!t.checked)}),k.default.money_type_list=t},n.pickSex=function(e){k.default.selectSex=e},n.pickBank=function(e){k.default.selected_bank=e},n.pickServiceType=function(e){k.default.service_type=e;var t=[],n=!1,i=!1;Array.from(k.default.origin_service_type_list).forEach(function(r){if(r.category===e[0]){1===r.money&&(n=!0),2===r.money_type&&(i=!0),t=r.item.map(function(e){return{label:e,value:e}});var a=r.time_begin||"08:00:00",o=r.time_end||"15:00";k.default.time_begin=(0,D.default)(a,"mm:ss:SS"),k.default.time_end=(0,D.default)(o,"mm:ss:SS"),k.default.minMaxDate=(0,w.getMinMaxDate)()}}),k.default.service_content_list=t,k.default.service_content=[],k.default.showMoney=n,k.default.showMoneyType=i},n.pickServiceContent=function(e){k.default.service_content=e},n.handleDate=function(e){k.default.date=e},n.handleTime=function(e){k.default.time=e},n.handleRemark=function(e){k.default.remark=e},n.confirm=function(){var e=k.default.disableBtn,t=k.default.name,n=k.default.phone,i=k.default.identity,r=k.default.sex,a=k.default.service,o=k.default.service_item,l=k.default.bank_id,u=k.default.day,c=k.default.money,f=k.default.showMoney,d=k.default.name_sub,p=k.default.remark,m=k.default.showMoneyType,h=k.default.money_type_list;if(!e){var y={name:t,phone:n,identity:i,sex:r,service:a,service_item:o,bank_id:l,day:u,remark:p};if(f&&(y.money=c),d&&(y.name_sub=d),m){var v=Array.from(h).filter(function(e){return!!e.checked});y.denomination=v.map(function(e){return e.value}).join(",")}y.remark=p||"",s.default.loading("提交中，请稍后...",30),M.default.post("/api/v1/order/save",y).then(function(e){s.default.hide();var t=e.data;0!==t.error_code&&0!==t.errorCode||x.default.push("/appointment/result")}).catch(function(e){s.default.hide()})}},k.default.minMaxDate=(0,w.getMinMaxDate)(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,h.Component),m(t,[{key:"componentDidMount",value:function(){this.getServiceList(),this.getBankList(),this.autorunHandler=(0,g.autorun)(function(){var e=k.default.date,t=k.default.time_begin,n=k.default.time_end;if(e){var i=(0,w.getMinMaxTime)(e,t,n),r=i.defaultDate,a=function(e,t){var n={};for(var i in e)t.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}(i,["defaultDate"]);k.default.minMaxTime=a,k.default.time=r}})}},{key:"componentWillUnmount",value:function(){this.autorunHandler()}},{key:"render",value:function(){var e=this,t=k.default.showMoney,n=k.default.showMoneyType,i=k.default.date,s=k.default.time,d=k.default.bank_list,m=k.default.selected_bank,h=k.default.disableBtn,_=k.default.init,g=k.default.minMaxDate,w=k.default.minMaxTime,M=k.default.money_type_list,x=k.default.time_begin,O=k.default.time_end,D=Array.from(d),z=Array.from(m),T=Array.from(k.default.selectSex),j=Array.from(k.default.service_type_list),P=Array.from(k.default.service_type),S=Array.from(k.default.service_content_list),C=Array.from(k.default.service_content),Y=Array.from(M);return y.default.createElement("div",null,y.default.createElement("h3",{className:(0,b.default)(v.default,"header")},"填写预约信息"),y.default.createElement(f.default,null,y.default.createElement(c.default,{data:j,value:P,cols:1,onOk:this.pickServiceType},y.default.createElement(f.default.Item,{arrow:"horizontal"},"服务类别")),y.default.createElement(c.default,{data:S,value:C,cols:1,onOk:this.pickServiceContent},y.default.createElement(f.default.Item,{arrow:"horizontal"},"服务内容")),"对公"===_.type?y.default.createElement(y.default.Fragment,null,y.default.createElement(u.default,{placeholder:"请输入企业名称",onChange:function(e){return k.default.name=e}},"企业名称"),y.default.createElement(u.default,{placeholder:"请输入15位或18位的社会信用代码",onChange:function(e){return k.default.identity=e}},"营业执照号"),y.default.createElement(u.default,{placeholder:"请输入企业联系人姓名",onChange:function(e){return k.default.name_sub=e}},"联系人")):y.default.createElement(y.default.Fragment,null,y.default.createElement(u.default,{placeholder:"请输入姓名",onChange:function(e){return k.default.name=e}},"姓名"),y.default.createElement(u.default,{placeholder:"请输入身份证号",onChange:function(e){return k.default.identity=e}},"身份证号")),y.default.createElement(u.default,{placeholder:"请输入手机号",type:"phone",onChange:function(e){return k.default.inputPhone=e}},"手机号"),y.default.createElement(c.default,{data:this.sexList,value:T,cols:1,onOk:this.pickSex},y.default.createElement(f.default.Item,{arrow:"horizontal"},"性别")),y.default.createElement(c.default,{data:D,value:z,cols:1,onOk:this.pickBank},y.default.createElement(f.default.Item,{arrow:"horizontal"},"预约银行")),t?y.default.createElement(u.default,{placeholder:"请输入预约金额",type:"money",moneyKeyboardAlign:"left",onChange:function(e){return k.default.money=e}},"预约金额"):null,n?y.default.createElement(f.default,{className:"show_money_type"},y.default.createElement("div",{style:{width:"29.1%",fontSize:17,paddingLeft:15,display:"flex",alignItems:"center"}},"预约面额"),Y.map(function(t){return y.default.createElement(E,{key:t.value,defaultChecked:t.checked,style:{width:"29.1%"},onChange:function(){return e.selectMoneyType(t)}},t.value)})):null),y.default.createElement(f.default,{renderHeader:function(){return"预约受理时间: "+x.format("mm:ss")+" ~ "+O.format("mm:ss")}},y.default.createElement(l.default,p({mode:"date",onChange:this.handleDate},g,{value:i}),y.default.createElement(f.default.Item,{arrow:"horizontal"},"预约日期")),y.default.createElement(l.default,p({mode:"time",minuteStep:30},w,{onChange:this.handleTime,value:s}),y.default.createElement(f.default.Item,{arrow:"horizontal"},"预约时间")),y.default.createElement(o.default,{title:"备注",placeholder:"填写备注的信息，文字不得超过30字",autoHeight:!0,count:30,onChange:this.handleRemark})),y.default.createElement(r.default,{style:{marginTop:48,marginBottom:48}},y.default.createElement(a.default,{type:"primary",disabled:h,onClick:this.confirm},"提交预约申请")))}}]),t}())||i;t.default=T},nE73:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){return t.trim().split(/\s+/).map(function(t){return e[t]}).join(" ")}},qLGs:function(e,t,n){e.exports={header:"_2YR1Z9jstTfLS7Tdu9GRqj"}}}]);
//# sourceMappingURL=21_bee9606b59780928e38b.js.map