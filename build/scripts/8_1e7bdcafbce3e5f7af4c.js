(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"1bJb":function(e,t,n){"use strict";n("asx4"),n("Nt9i"),n("1n7v")},"1n7v":function(e,t,n){},"7/Bm":function(e,t,n){},"9SZ1":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={okText:"确定",dismissText:"取消",extra:"请选择"},e.exports=t.default},A9I8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=f(n("Kz1y")),a=f(n("Zv/C")),l=f(n("2lBV")),o=f(n("Dkg+")),u=f(n("Gjrs")),i=f(n("mXGw")),s=f(n("rxAH")),c=f(n("XKjy")),d=f(n("Av9P"));function f(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(){(0,a.default)(this,t);var e=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state={value:e.getValue(e.props.data,e.props.defaultValue||e.props.value)},e.onValueChange=function(t,n){var r=(0,s.default)(e.props.data,function(e,r){return r<=n&&e.value===t[r]})[n],a=void 0;for(a=n+1;r&&r.children&&r.children.length&&a<e.props.cols;a++)r=r.children[0],t[a]=r.value;t.length=a,"value"in e.props||e.setState({value:t}),e.props.onChange&&e.props.onChange(t)},e}return(0,u.default)(t,e),(0,l.default)(t,[{key:"componentWillReceiveProps",value:function(e){"value"in e&&this.setState({value:this.getValue(e.data,e.value)})}},{key:"getValue",value:function(e,t){var n=e||this.props.data,r=t||this.props.value||this.props.defaultValue;if(!r||!r.length){r=[];for(var a=0;a<this.props.cols;a++)n&&n.length&&(r[a]=n[0].value,n=n[0].children)}return r}},{key:"getCols",value:function(){var e=this.props,t=e.data,n=e.cols,r=e.pickerPrefixCls,a=e.disabled,l=e.pickerItemStyle,o=e.indicatorStyle,u=this.state.value,c=(0,s.default)(t,function(e,t){return e.value===u[t]}).map(function(e){return e.children}),f=n-c.length;if(f>0)for(var p=0;p<f;p++)c.push([]);return c.length=n-1,c.unshift(t),c.map(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];return i.default.createElement(d.default,{key:t,prefixCls:r,style:{flex:1},disabled:a,itemStyle:l,indicatorStyle:o},e.map(function(e){return i.default.createElement(d.default.Item,{value:e.value,key:e.value},e.label)}))})}},{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,a=e.rootNativeProps,l=e.style,o=this.getCols(),u=(0,r.default)({flexDirection:"row",alignItems:"center"},l);return i.default.createElement(c.default,{style:u,prefixCls:t,className:n,selectedValue:this.state.value,rootNativeProps:a,onValueChange:this.onValueChange,onScrollChange:e.onScrollChange},o)}}]),t}(i.default.Component);p.defaultProps={cols:3,prefixCls:"rmc-cascader",pickerPrefixCls:"rmc-picker",data:[],disabled:!1},t.default=p,e.exports=t.default},AZLO:function(e,t,n){"use strict";n("asx4"),n("7/Bm")},ArT3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={WrapComponent:"div",transitionName:"am-slide-up",maskTransitionName:"am-fade"},e.exports=t.default},CGtu:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n("Zv/C")),a=s(n("2lBV")),l=s(n("Dkg+")),o=s(n("Gjrs")),u=s(n("8Jek")),i=s(n("mXGw"));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){return(0,r.default)(this,t),(0,l.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,o.default)(t,e),(0,a.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.size,r=e.className,a=e.children,l=e.style,o=(0,u.default)(t,t+"-"+n,r);return i.default.createElement("div",{className:o,style:l},a)}}]),t}(i.default.Component);t.default=c,c.defaultProps={prefixCls:"am-wingblank",size:"lg"},e.exports=t.default},"J3q/":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n("Zv/C")),a=i(n("2lBV")),l=i(n("Dkg+")),o=i(n("Gjrs")),u=i(n("mXGw"));function i(e){return e&&e.__esModule?e:{default:e}}var s=i(n("xARA")).default.createPortal,c=function(e){function t(e){(0,r.default)(this,t);var n=(0,l.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.container=n.props.getContainer(),n}return(0,o.default)(t,e),(0,a.default)(t,[{key:"render",value:function(){return this.props.children?s(this.props.children,this.container):null}}]),t}(u.default.Component);t.default=c,e.exports=t.default},KBEQ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=v(n("Kz1y")),a=v(n("Zv/C")),l=v(n("2lBV")),o=v(n("Dkg+")),u=v(n("Gjrs"));t.getDefaultProps=function(){return{triggerType:"onClick",prefixCls:"am-picker",pickerPrefixCls:"am-picker-col",popupPrefixCls:"am-picker-popup",format:function(e){return e.join(",")},cols:3,cascade:!0,title:""}};var i=v(n("SRaA")),s=v(n("mXGw")),c=v(n("A9I8")),d=v(n("QKBD")),f=v(n("XKjy")),p=v(n("Av9P")),m=n("XuOJ");function v(e){return e&&e.__esModule?e:{default:e}}var h=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n};var b=function(e){function t(){(0,a.default)(this,t);var e=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.getSel=function(){var t=e.props.value||[],n=void 0,r=e.props.data;return n=e.props.cascade?(0,i.default)(r,function(e,n){return e.value===t[n]}):t.map(function(e,t){return r[t].filter(function(t){return t.value===e})[0]}),e.props.format&&e.props.format(n.map(function(e){return e.label}))},e.getPickerCol=function(){var t=e.props,n=t.data,r=t.pickerPrefixCls,a=t.itemStyle,l=t.indicatorStyle;return n.map(function(e,t){return s.default.createElement(p.default,{key:t,prefixCls:r,style:{flex:1},itemStyle:a,indicatorStyle:l},e.map(function(e){return s.default.createElement(p.default.Item,{key:e.value,value:e.value},e.label)}))})},e.onOk=function(t){void 0!==e.scrollValue&&(t=e.scrollValue),e.props.onChange&&e.props.onChange(t),e.props.onOk&&e.props.onOk(t)},e.setScrollValue=function(t){e.scrollValue=t},e.setCasecadeScrollValue=function(t){if(t&&e.scrollValue){var n=e.scrollValue.length;if(n===t.length&&e.scrollValue[n-1]===t[n-1])return}e.setScrollValue(t)},e.fixOnOk=function(t){t&&t.onOk!==e.onOk&&(t.onOk=e.onOk,t.forceUpdate())},e.onPickerChange=function(t){e.setScrollValue(t),e.props.onPickerChange&&e.props.onPickerChange(t)},e.onVisibleChange=function(t){e.setScrollValue(void 0),e.props.onVisibleChange&&e.props.onVisibleChange(t)},e}return(0,u.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.value,l=void 0===a?[]:a,o=e.popupPrefixCls,u=e.itemStyle,i=e.indicatorStyle,p=e.okText,v=e.dismissText,b=e.extra,y=e.cascade,C=e.prefixCls,k=e.pickerPrefixCls,g=e.data,x=e.cols,P=(e.onOk,h(e,["children","value","popupPrefixCls","itemStyle","indicatorStyle","okText","dismissText","extra","cascade","prefixCls","pickerPrefixCls","data","cols","onOk"])),O=(0,m.getComponentLocale)(this.props,this.context,"Picker",function(){return n("9SZ1")}),_=void 0,K={};return y?_=s.default.createElement(c.default,{prefixCls:C,pickerPrefixCls:k,data:g,cols:x,onChange:this.onPickerChange,onScrollChange:this.setCasecadeScrollValue,pickerItemStyle:u,indicatorStyle:i}):(_=s.default.createElement(f.default,{style:{flexDirection:"row",alignItems:"center"},prefixCls:C,onScrollChange:this.setScrollValue},this.getPickerCol()),K={pickerValueProp:"selectedValue",pickerValueChangeProp:"onValueChange"}),s.default.createElement(d.default,(0,r.default)({cascader:_},this.popupProps,P,{prefixCls:o,value:l,dismissText:v||O.dismissText,okText:p||O.okText},K,{ref:this.fixOnOk,onVisibleChange:this.onVisibleChange}),t&&"string"!=typeof t&&s.default.isValidElement(t)&&s.default.cloneElement(t,{extra:this.getSel()||b||O.extra}))}}]),t}(s.default.Component);t.default=b},OSZ1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c(n("Zv/C")),a=c(n("Dkg+")),l=c(n("Gjrs")),o=n("KBEQ"),u=c(o),i=c(n("W0B4")),s=c(n("ArT3"));function c(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(){(0,r.default)(this,t);var e=(0,a.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.popupProps=s.default,e}return(0,l.default)(t,e),t}(u.default);t.default=d,d.defaultProps=(0,o.getDefaultProps)(),d.contextTypes={antLocale:i.default.object},e.exports=t.default},QKBD:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c(n("Kz1y")),a=c(n("Zv/C")),l=c(n("2lBV")),o=c(n("Dkg+")),u=c(n("Gjrs")),i=c(n("mXGw")),s=c(n("BxQF"));function c(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(){(0,a.default)(this,t);var e=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onOk=function(t){var n=e.props,r=n.onChange,a=n.onOk;r&&r(t),a&&a(t)},e}return(0,u.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){return i.default.createElement(s.default,(0,r.default)({picker:this.props.cascader},this.props,{onOk:this.onOk}))}}]),t}(i.default.Component);d.defaultProps={pickerValueProp:"value",pickerValueChangeProp:"onChange"},t.default=d,e.exports=t.default},SRaA:function(e,t,n){e.exports=function(){"use strict";return function(e,t,n){(n=n||{}).childrenKeyName=n.childrenKeyName||"children";var r=e||[],a=[],l=0;do{var o=r.filter(function(e){return t(e,l)})[0];if(!o)break;a.push(o),r=o[n.childrenKeyName]||[],l+=1}while(r.length>0);return a}}()},"dxc/":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n("Kz1y")),a=s(n("Zv/C")),l=s(n("2lBV")),o=s(n("Dkg+")),u=s(n("Gjrs")),i=s(n("mXGw"));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n},d=function(e){function t(){(0,a.default)(this,t);var e=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onInputBlur=function(t){var n=t.target.value;e.props.onBlur&&e.props.onBlur(n)},e.onInputFocus=function(t){var n=t.target.value;e.props.onFocus&&e.props.onFocus(n)},e.focus=function(){e.inputRef&&e.inputRef.focus()},e}return(0,u.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){var e=this,t=this.props,n=(t.onBlur,t.onFocus,c(t,["onBlur","onFocus"]));return i.default.createElement("input",(0,r.default)({ref:function(t){return e.inputRef=t},onBlur:this.onInputBlur,onFocus:this.onInputFocus},n))}}]),t}(i.default.Component);t.default=d,e.exports=t.default},gmvz:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={confirmLabel:"确定",backspaceLabel:"退格",cancelKeyboardLabel:"撤销键盘"},e.exports=t.default},icwN:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=h(n("Kz1y")),a=h(n("TcPG")),l=h(n("Zv/C")),o=h(n("2lBV")),u=h(n("Dkg+")),i=h(n("Gjrs")),s=h(n("8Jek")),c=h(n("W0B4")),d=h(n("mXGw")),f=h(n("O1Y2")),p=n("XuOJ"),m=h(n("unNa")),v=h(n("dxc/"));function h(e){return e&&e.__esModule?e:{default:e}}var b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n};function y(){}function C(e){return void 0===e||null===e?"":e+""}var k=function(e){function t(e){(0,l.default)(this,t);var n=(0,u.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onInputChange=function(e){var t=e.target.value,r=t;switch(n.props.type){case"bankCard":r=t.replace(/\D/g,"").replace(/(....)(?=.)/g,"$1 ");break;case"phone":var a=(r=t.replace(/\D/g,"").substring(0,11)).length;a>3&&a<8?r=r.substr(0,3)+" "+r.substr(3):a>=8&&(r=r.substr(0,3)+" "+r.substr(3,4)+" "+r.substr(7));break;case"number":r=t.replace(/\D/g,"")}n.handleOnChange(r,r!==t)},n.handleOnChange=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=n.props.onChange;"value"in n.props?n.setState({value:n.props.value}):n.setState({value:e}),r&&(t?setTimeout(function(){return r(e)}):r(e))},n.onInputFocus=function(e){n.debounceTimeout&&(clearTimeout(n.debounceTimeout),n.debounceTimeout=null),n.setState({focus:!0}),n.props.onFocus&&n.props.onFocus(e)},n.onInputBlur=function(e){n.inputRef&&(n.debounceTimeout=setTimeout(function(){document.activeElement!==(n.inputRef&&n.inputRef.inputRef)&&n.setState({focus:!1})},200)),n.props.onBlur&&n.props.onBlur(e)},n.onExtraClick=function(e){n.props.onExtraClick&&n.props.onExtraClick(e)},n.onErrorClick=function(e){n.props.onErrorClick&&n.props.onErrorClick(e)},n.clearInput=function(){"password"!==n.props.type&&n.props.updatePlaceholder&&n.setState({placeholder:n.props.value}),n.setState({value:""}),n.props.onChange&&n.props.onChange(""),n.focus()},n.focus=function(){n.inputRef&&n.inputRef.focus()},n.state={placeholder:e.placeholder,value:C(e.value||e.defaultValue)},n}return(0,i.default)(t,e),(0,o.default)(t,[{key:"componentWillReceiveProps",value:function(e){"placeholder"in e&&!e.updatePlaceholder&&this.setState({placeholder:e.placeholder}),"value"in e&&this.setState({value:e.value})}},{key:"componentWillUnmount",value:function(){this.debounceTimeout&&(clearTimeout(this.debounceTimeout),this.debounceTimeout=null)}},{key:"render",value:function(){var e,t,l=this,o=this.props,u=o.prefixCls,i=o.prefixListCls,c=o.editable,h=o.style,y=o.clear,k=o.children,g=o.error,x=o.className,P=o.extra,O=o.labelNumber,_=o.type,K=o.moneyKeyboardAlign,E=o.moneyKeyboardWrapProps,I=b(o,["prefixCls","prefixListCls","editable","style","clear","children","error","className","extra","labelNumber","type","moneyKeyboardAlign","moneyKeyboardWrapProps"]),S=I.name,j=I.disabled,V=I.maxLength,N=this.state.value,w=(0,p.getComponentLocale)(this.props,this.context,"InputItem",function(){return n("gmvz")}),B=w.confirmLabel,L=w.backspaceLabel,T=w.cancelKeyboardLabel,A=this.state,R=A.focus,D=A.placeholder,M=(0,s.default)(i+"-item",u+"-item",i+"-item-middle",x,(e={},(0,a.default)(e,u+"-disabled",j),(0,a.default)(e,u+"-error",g),(0,a.default)(e,u+"-focus",R),(0,a.default)(e,u+"-android",R),e)),F=(0,s.default)(u+"-label",(t={},(0,a.default)(t,u+"-label-2",2===O),(0,a.default)(t,u+"-label-3",3===O),(0,a.default)(t,u+"-label-4",4===O),(0,a.default)(t,u+"-label-5",5===O),(0,a.default)(t,u+"-label-6",6===O),(0,a.default)(t,u+"-label-7",7===O),t)),G=u+"-control",Z="text";"bankCard"===_||"phone"===_?Z="tel":"password"===_?Z="password":"digit"===_?Z="number":"text"!==_&&"number"!==_&&(Z=_);var W=void 0;"number"===_&&(W={pattern:"[0-9]*"});var X=void 0;return"digit"===_&&(X={className:"h5numInput"}),d.default.createElement("div",{className:M},d.default.createElement("div",{className:i+"-line"},k?d.default.createElement("div",{className:F},k):null,d.default.createElement("div",{className:G},"money"===_?d.default.createElement(m.default,{value:C(N),type:_,ref:function(e){return l.inputRef=e},maxLength:V,placeholder:D,onChange:this.onInputChange,onFocus:this.onInputFocus,onBlur:this.onInputBlur,onVirtualKeyboardConfirm:this.props.onVirtualKeyboardConfirm,disabled:j,editable:c,prefixCls:u,style:h,confirmLabel:B,backspaceLabel:L,cancelKeyboardLabel:T,moneyKeyboardAlign:K,moneyKeyboardWrapProps:E}):d.default.createElement(v.default,(0,r.default)({},W,I,X,{value:C(N),defaultValue:void 0,ref:function(e){return l.inputRef=e},style:h,type:Z,maxLength:V,name:S,placeholder:D,onChange:this.onInputChange,onFocus:this.onInputFocus,onBlur:this.onInputBlur,readOnly:!c,disabled:j}))),y&&c&&!j&&N&&(""+N).length>0?d.default.createElement(f.default,{activeClassName:u+"-clear-active"},d.default.createElement("div",{className:u+"-clear",onClick:this.clearInput})):null,g?d.default.createElement("div",{className:u+"-error-extra",onClick:this.onErrorClick}):null,""!==P?d.default.createElement("div",{className:u+"-extra",onClick:this.onExtraClick},P):null))}}]),t}(d.default.Component);k.defaultProps={prefixCls:"am-input",prefixListCls:"am-list",type:"text",editable:!0,disabled:!1,placeholder:"",clear:!1,onChange:y,onBlur:y,onFocus:y,extra:"",onExtraClick:y,error:!1,onErrorClick:y,onVirtualKeyboardConfirm:y,labelNumber:5,updatePlaceholder:!1,moneyKeyboardAlign:"right",moneyKeyboardWrapProps:{}},k.contextTypes={antLocale:c.default.object},t.default=k,e.exports=t.default},ludV:function(e,t,n){"use strict";function r(e,t){return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}Object.defineProperty(t,"__esModule",{value:!0}),t.hasClass=r,t.addClass=function(e,t){e.classList?e.classList.add(t):r(e,t)||(e.className=e.className+" "+t)},t.removeClass=function(e,t){if(e.classList)e.classList.remove(t);else if(r(e,t)){var n=e.className;e.className=(" "+n+" ").replace(" "+t+" ","")}}},rxAH:function(e,t){e.exports=function(e,t,n){(n=n||{}).childrenKeyName=n.childrenKeyName||"children";var r=e||[],a=[],l=0;do{var o;if(!(o=r.filter(function(e){return t(e,l)})[0]))break;a.push(o),r=o[n.childrenKeyName]||[],l+=1}while(r.length>0);return a}},unNa:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=p(n("Zv/C")),a=p(n("2lBV")),l=p(n("Dkg+")),o=p(n("Gjrs")),u=p(n("8Jek")),i=p(n("mXGw")),s=p(n("xARA")),c=n("ludV"),d=p(n("yIzZ")),f=p(n("J3q/"));function p(e){return e&&e.__esModule?e:{default:e}}var m=[],v=null,h=!!s.default.createPortal,b=function(e){function t(e){(0,r.default)(this,t);var n=(0,l.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onChange=function(e){"value"in n.props||n.setState({value:e.target.value}),n.props.onChange(e)},n.onConfirm=function(e){n.props.onVirtualKeyboardConfirm(e)},n.addBlurListener=function(){document.addEventListener("click",n.doBlur,!1)},n.removeBlurListener=function(){document.removeEventListener("click",n.doBlur,!1)},n.saveRef=function(e){h&&e&&(v=e,m.push({el:e,container:n.container}))},n.doBlur=function(e){var t=n.state.value;e.target!==n.inputRef&&n.onInputBlur(t)},n.removeCurrentExtraKeyboard=function(){m=m.filter(function(e){var t=e.el,n=e.container;return t&&n&&t!==v&&n.parentNode.removeChild(n),t===v})},n.unLinkInput=function(){v&&v.antmKeyboard&&v.linkedInput&&v.linkedInput===n&&(v.linkedInput=null,(0,c.addClass)(v.antmKeyboard,n.props.keyboardPrefixCls+"-wrapper-hide")),n.removeBlurListener(),h&&n.removeCurrentExtraKeyboard()},n.onInputBlur=function(e){n.state.focus&&(n.setState({focus:!1}),n.props.onBlur(e),setTimeout(function(){n.unLinkInput()},50))},n.onInputFocus=function(){var e=n.state.value;n.props.onFocus(e),n.setState({focus:!0},function(){v&&(v.linkedInput=n,v.antmKeyboard&&(0,c.removeClass)(v.antmKeyboard,n.props.keyboardPrefixCls+"-wrapper-hide"),v.confirmDisabled=""===e,v.confirmKeyboardItem&&(""===e?(0,c.addClass)(v.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled"):(0,c.removeClass)(v.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled")))})},n.onKeyboardClick=function(e){var t=n.props.maxLength,r=n.state.value,a=n.onChange,l=void 0;"delete"===e?a({target:{value:l=r.substring(0,r.length-1)}}):"confirm"===e?(a({target:{value:l=r}}),n.onInputBlur(r),n.onConfirm(r)):"hide"===e?(l=r,n.onInputBlur(l)):a(void 0!==t&&+t>=0&&(r+e).length>t?{target:{value:l=(r+e).substr(0,t)}}:{target:{value:l=r+e}}),v&&(v.confirmDisabled=""===l,v.confirmKeyboardItem&&(""===l?(0,c.addClass)(v.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled"):(0,c.removeClass)(v.confirmKeyboardItem,n.props.keyboardPrefixCls+"-item-disabled")))},n.onFakeInputClick=function(){n.focus()},n.focus=function(){n.removeBlurListener(),n.state.focus||n.onInputFocus(),setTimeout(function(){n.addBlurListener()},50)},n.state={focus:!1,value:e.value||""},n}return(0,o.default)(t,e),(0,a.default)(t,[{key:"componentWillReceiveProps",value:function(e){"value"in e&&this.setState({value:e.value})}},{key:"componentDidUpdate",value:function(){this.renderCustomKeyboard()}},{key:"componentWillUnmount",value:function(){this.state.focus&&this.props.onBlur(this.state.value),this.unLinkInput()}},{key:"getComponent",value:function(){var e=this.props,t=e.confirmLabel,n=e.backspaceLabel,r=e.cancelKeyboardLabel,a=e.keyboardPrefixCls,l=e.moneyKeyboardWrapProps;return i.default.createElement(d.default,{ref:this.saveRef,onClick:this.onKeyboardClick,prefixCls:a,confirmLabel:t,backspaceLabel:n,cancelKeyboardLabel:r,wrapProps:l})}},{key:"getContainer",value:function(){var e=this.props.keyboardPrefixCls;if(h){if(!this.container){var t=document.createElement("div");t.setAttribute("id",e+"-container-"+(new Date).getTime()),document.body.appendChild(t),this.container=t}}else{var n=document.querySelector("#"+e+"-container");n||((n=document.createElement("div")).setAttribute("id",e+"-container"),document.body.appendChild(n)),this.container=n}return this.container}},{key:"renderCustomKeyboard",value:function(){h||(v=s.default.unstable_renderSubtreeIntoContainer(this,this.getComponent(),this.getContainer()))}},{key:"renderPortal",value:function(){var e=this;return h?i.default.createElement(f.default,{getContainer:function(){return e.getContainer()}},this.getComponent()):null}},{key:"render",value:function(){var e=this,t=this.props,n=t.placeholder,r=t.disabled,a=t.editable,l=t.moneyKeyboardAlign,o=this.state,s=o.focus,c=o.value,d=r||!a,f=(0,u.default)("fake-input",{focus:s,"fake-input-disabled":r}),p=(0,u.default)("fake-input-container",{"fake-input-container-left":"left"===l});return i.default.createElement("div",{className:p},""===c&&i.default.createElement("div",{className:"fake-input-placeholder"},n),i.default.createElement("div",{role:"textbox","aria-label":c||n,className:f,ref:function(t){return e.inputRef=t},onClick:d?function(){}:this.onFakeInputClick},c),this.renderPortal())}}]),t}(i.default.Component);b.defaultProps={onChange:function(){},onFocus:function(){},onBlur:function(){},onVirtualKeyboardConfirm:function(){},placeholder:"",disabled:!1,editable:!0,prefixCls:"am-input",keyboardPrefixCls:"am-number-keyboard"},t.default=b,e.exports=t.default},yIzZ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.KeyboardItem=void 0;var r=d(n("Kz1y")),a=d(n("Zv/C")),l=d(n("2lBV")),o=d(n("Dkg+")),u=d(n("Gjrs")),i=d(n("8Jek")),s=d(n("mXGw")),c=d(n("O1Y2"));function d(e){return e&&e.__esModule?e:{default:e}}var f=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n},p=/iphone|ipad|ipod/i.test(window.navigator.userAgent),m=t.KeyboardItem=function(e){function t(){return(0,a.default)(this,t),(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,u.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.onClick,a=e.className,l=(e.disabled,e.children),o=e.tdRef,u=e.label,d=e.iconOnly,p=f(e,["prefixCls","onClick","className","disabled","children","tdRef","label","iconOnly"]),m=l;"keyboard-delete"===a?m="delete":"keyboard-hide"===a?m="hide":"keyboard-confirm"===a&&(m="confirm");var v=(0,i.default)(t+"-item",a);return s.default.createElement(c.default,{activeClassName:t+"-item-active"},s.default.createElement("td",(0,r.default)({ref:o,onClick:function(e){n(e,m)},className:v},p),l,d&&s.default.createElement("i",{className:"sr-only"},u)))}}]),t}(s.default.Component);m.defaultProps={prefixCls:"am-number-keyboard",onClick:function(){},disabled:!1};var v=function(e){function t(){(0,a.default)(this,t);var e=(0,o.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.onKeyboardClick=function(t,n){if(t.nativeEvent.stopImmediatePropagation(),"confirm"===n&&e.confirmDisabled)return null;e.linkedInput&&e.linkedInput.onKeyboardClick(n)},e.renderKeyboardItem=function(t,n){return s.default.createElement(m,{onClick:e.onKeyboardClick,key:"item-"+t+"-"+n},t)},e}return(0,u.default)(t,e),(0,l.default)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.prefixCls,a=t.confirmLabel,l=t.backspaceLabel,o=t.cancelKeyboardLabel,u=t.wrapProps,c=(0,i.default)(n+"-wrapper",n+"-wrapper-hide");return s.default.createElement("div",(0,r.default)({className:c,ref:function(t){return e.antmKeyboard=t}},u),s.default.createElement("table",null,s.default.createElement("tbody",null,s.default.createElement("tr",null,["1","2","3"].map(function(t,n){return e.renderKeyboardItem(t,n)}),s.default.createElement(m,(0,r.default)({className:"keyboard-delete",rowSpan:2,onClick:this.onKeyboardClick},this.getAriaAttr(l)))),s.default.createElement("tr",null,["4","5","6"].map(function(t,n){return e.renderKeyboardItem(t,n)})),s.default.createElement("tr",null,["7","8","9"].map(function(t,n){return e.renderKeyboardItem(t,n)}),s.default.createElement(m,{className:"keyboard-confirm",rowSpan:2,onClick:this.onKeyboardClick,tdRef:function(t){return e.confirmKeyboardItem=t}},a)),s.default.createElement("tr",null,[".","0"].map(function(t,n){return e.renderKeyboardItem(t,n)}),s.default.createElement(m,(0,r.default)({className:"keyboard-hide",onClick:this.onKeyboardClick},this.getAriaAttr(o)))))))}},{key:"getAriaAttr",value:function(e){return p?{label:e,iconOnly:!0}:{role:"button","aria-label":e}}}]),t}(s.default.Component);v.defaultProps={prefixCls:"am-number-keyboard"},t.default=v}}]);
//# sourceMappingURL=8_1e7bdcafbce3e5f7af4c.js.map