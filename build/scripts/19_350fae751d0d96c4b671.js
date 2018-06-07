(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"7WqY":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r,i,o,l,u,d,c,f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n("cneo"),p=n("wy2R"),m=(c=p)&&c.__esModule?c:{default:c};function b(e,t,n,a){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(a):void 0})}function v(e,t,n,a,r){var i={};return Object.keys(a).forEach(function(e){i[e]=a[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=n.slice().reverse().reduce(function(n,a){return a(e,t,n)||n},i),r&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(r):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}var h=(a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),b(this,"date",r,this),b(this,"visible",i,this),b(this,"appointment_list",o,this),b(this,"dataSource",l,this),b(this,"user_type",u,this),b(this,"loading",d,this)}return f(e,[{key:"day",get:function(){return(0,m.default)(this.date).format("YYYY-MM-DD")}}]),e}(),r=v(a.prototype,"date",[s.observable],{enumerable:!0,initializer:function(){return(0,m.default)().toDate()}}),i=v(a.prototype,"visible",[s.observable],{enumerable:!0,initializer:function(){return!1}}),o=v(a.prototype,"appointment_list",[s.observable],{enumerable:!0,initializer:function(){return[]}}),l=v(a.prototype,"dataSource",[s.observable],{enumerable:!0,initializer:null}),u=v(a.prototype,"user_type",[s.observable],{enumerable:!0,initializer:null}),d=v(a.prototype,"loading",[s.observable],{enumerable:!0,initializer:function(){return!1}}),v(a.prototype,"day",[s.computed],Object.getOwnPropertyDescriptor(a.prototype,"day"),a.prototype),a);t.default=new h},GZoT:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e=location.href.split("?")[1];if(e){var t={};return(e=e.split("#")[0]).split("&").forEach(function(e){var n=e.split("=");if(2===n.length){var a=n[0],r=n[1];t[a]?t[a]=[r].concat(t[a]):t[a]=r}}),t}return{}}},Oj9Y:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=E(n("Biz3")),i=E(n("5da2")),o=E(n("ZAQZ")),l=E(n("B7Ej")),u=E(n("4Tk8")),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n("j15+"),n("Nt9i"),n("p9mG"),n("xwHp"),n("Gjfl");var c=n("mXGw"),f=E(c),s=E(n("nE73")),p=E(n("s8jB")),m=n("mBK0"),b=E(n("7WqY")),v=E(n("wy2R")),h=E(n("czhI")),y=n("Z5z8"),g=E(n("GZoT")),_=n("dO77");function E(e){return e&&e.__esModule?e:{default:e}}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}v.default.locale("zh_cn");var x=(0,m.observer)(a=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.getAppointmentList=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=b.default.day;1===e&&(n.page=1),h.default.get("/api/v1/orders/wx",{params:{page:e,size:y.SIZE,day:t}}).then(function(t){b.default.loading=!1;var n=t.data,a=Array.from(b.default.appointment_list);1===e&&(a=[]);var r=void 0;1==n.user_grade?(r=a.concat(n.orders),b.default.user_type="user"):(r=a.concat(n.data),b.default.total=n.total,b.default.user_type="admin"),b.default.appointment_list=r,b.default.dataSource=b.default.dataSource.cloneWithRows(r)}).catch(function(e){b.default.loading=!1;var t=e.data;10001!==t.error_code&&10001!==t.errorCode||(0,_.getWxToken)().then(function(e){n.getAppointmentList()})})},n.reject=function(e){u.default.alert("拒绝受理","将拒绝受理此项业务，请确认",[{text:"取消"},{text:"确认",onPress:function(){return n.handleAppointment(e,3)}}])},n.resolve=function(e){u.default.alert("受理","将受理此项业务，请确认",[{text:"取消"},{text:"确认",onPress:function(){return n.handleAppointment(e,2)}}])},n.cancel=function(e){u.default.alert("取消预约","将取消预约此项业务，请确认",[{text:"取消"},{text:"确认",onPress:function(){return n.handleAppointment(e,4)}}])},n.loadMore=function(){b.default.loading=!0,n.getAppointmentList(++n.page)},n.handleAppointment=function(e,t){h.default.post("/api/v1/order/handel",{id:e,state:t}).then(function(n){var a=n.data;if(0===a.error_code||0===a.errorCode){var r=Array.from(b.default.appointment_list);r.forEach(function(n){n.order_id===e&&(n.state=t)}),b.default.appointment_list=r,b.default.dataSource=b.default.dataSource.cloneWithRows(r)}}).catch(function(e){var t=e.data;10001!==t.error_code&&10001!==t.errorCode||(0,_.getWxToken)().then(function(e){n.getAppointmentList()})})},n.goIndex=function(){n.props.history.push("/")},n.openDateModal=function(){b.default.visible=!0},n.closeDateModal=function(){b.default.visible=!1},n.setDate=function(e){b.default.date=e,b.default.visible=!1,n.getAppointmentList()},b.default.dataSource=new l.default.DataSource({rowHasChanged:function(e,t){return e!==t}}),b.default.appointment_list=[];var a=(0,g.default)();return a.day&&(b.default.date=new Date(a.day)),n.page=1,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,c.Component),d(t,[{key:"render",value:function(){var e=this,t=b.default.date,n=b.default.visible,a=b.default.dataSource,u=b.default.user_type,d=b.default.loading;return f.default.createElement("div",{className:"appointment_list"},f.default.createElement("div",{className:(0,s.default)(p.default,"home")},f.default.createElement(o.default,{inline:!0,size:"small",onClick:this.goIndex},"首页")),f.default.createElement(i.default,{style:{borderBottom:"none"}},f.default.createElement(i.default.Item,{onClick:this.openDateModal},f.default.createElement("span",null,"预约日期"),f.default.createElement("span",{className:(0,s.default)(p.default,"date")},(0,v.default)(t).format("YYYY/MM/DD dddd")))),f.default.createElement(r.default,{visible:n,mode:"date",onDismiss:this.closeDateModal,onOk:this.setDate}),f.default.createElement(l.default,{dataSource:a,renderSectionHeader:function(){return f.default.createElement("span",null,"预约列表")},renderRow:function(t,n,a){var r,i=[];switch(parseInt(t.state)){case 1:i="admin"===u?[f.default.createElement(o.default,{inline:!0,size:"small",type:"warning",onClick:function(){return e.reject(t.order_id)}},"拒绝"),f.default.createElement(o.default,{inline:!0,size:"small",type:"primary",onClick:function(){return e.resolve(t.order_id)}},"受理")]:[f.default.createElement(o.default,{inline:!0,size:"small",type:"warning",onClick:function(){return e.cancel(t.order_id)}},"取消")];break;case 2:i=[f.default.createElement(o.default,{inline:!0,size:"small",type:"primary",disabled:!0},"已受理")];break;case 3:i=[f.default.createElement(o.default,{inline:!0,size:"small",type:"warning",disabled:!0},"已受理")];break;case 4:i=[f.default.createElement(o.default,{inline:!0,size:"small",type:"ghost",disabled:!0},"已取消")]}return f.default.createElement("div",{key:a,style:{padding:"0 15px"}},f.default.createElement("div",{style:(r={display:"-webkit-box"},w(r,"display","flex"),w(r,"padding","15px 0"),r)},f.default.createElement("img",{style:{height:"64px",marginRight:"15px"},src:t.headimgurl,alt:""}),f.default.createElement("div",{style:{lineHeight:1,flexGrow:1,flexShrink:1}},f.default.createElement("div",{style:{marginBottom:"8px",fontWeight:"bold"}},t.name),f.default.createElement("p",null,t.address,", ",t.sex===y.MALE?"男":"女"),f.default.createElement("p",null,t.service+"/"+t.service_item,t.money>0?"/"+t.money:"")),f.default.createElement("div",{className:(0,s.default)(p.default,"btn-group")},i)))},renderSeparator:function(e,t){return f.default.createElement("div",{key:e+"-"+t,style:{margin:"0 15px",borderBottom:"1px solid #ECECED"}})},renderFooter:function(){return f.default.createElement("div",{style:{padding:30,textAlign:"center"}},d?"Loading...":"Loaded")},pageSize:4,useBodyScroll:!0,onEndReached:this.loadMore}))}},{key:"componentDidMount",value:function(){this.getAppointmentList(this.page)}}]),t}())||a;t.default=x},Z5z8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SIZE=15,t.MALE=1,t.FEMALE=2},dO77:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.refreshWxToken=t.getWxToken=void 0;var a=i(n("czhI")),r=i(n("GZoT"));function i(e){return e&&e.__esModule?e:{default:e}}var o=null,l=function(e,t){var n="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf4b7d664b2461f4b&redirect_uri="+encodeURIComponent(location.href.split("#")[0])+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect;";if(alert(e),e)return o||(o=new Promise(function(e,n){a.default.get("/api/v1/token/user",{params:{code:t}}).then(function(t){o=null,e(t)}).catch(function(e){o=null,n(e)})}));window.location=n};t.getWxToken=function(){var e=(0,r.default)().code;return l(!!e,e)},t.refreshWxToken=function(){return l(!1)}},nE73:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){return t.trim().split(/\s+/).map(function(t){return e[t]}).join(" ")}},s8jB:function(e,t,n){e.exports={home:"_2sfP_co4kRvgphaC1NMPV2",date:"_3fLReK9Q-jcWfZk702_V5Z","btn-group":"xgFttKZnF3OHJtqAx5OvH"}}}]);
//# sourceMappingURL=19_350fae751d0d96c4b671.js.map