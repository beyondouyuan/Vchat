webpackJsonp([3],{Ina9:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("aA9S"),i=e.n(n),r=e("gyMJ"),o={name:"chat",props:["currGroup"],data:function(){return{IMG_URL:"",List:[],name:window.localStorage.name,mes:"",groupUsers:[]}},watch:{List:function(s){console.log("list",s),this.$refs.msglist.scrollTop=this.$refs.msglist.scrollHeight+200},currGroup:function(s){s&&this.getGroupUsers()}},sockets:{connect:function(s){},customEmit:function(s){},org:function(s){this.List.push(i()({},s,{type:"org"}))},mes:function(s){this.List.push(i()({},s,{type:"other"}))}},methods:{exit:function(){this.$router.push("/")},send:function(){var s={name:this.name,mes:this.mes};this.List.push(i()({},s,{type:"mine"})),this.$socket.emit("mes",this.$socket.id,s),this.mes=""},getGroupUsers:function(){var s=this,t={groupId:this.currGroup};r.a.getGroupUsers(t).then(function(t){0===t.code&&(s.groupUsers=t.data)})}}},a={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"chat"},[e("div",{staticClass:"chat-l"},[e("div",{staticClass:"chat-l-top"},[e("ul",{ref:"msglist"},s._l(s.List,function(t,n){return e("li",{key:n,class:[{other:"other"===t.type},{mine:"mine"===t.type},{org:"org"===t.type}]},["other"===t.type?[e("p",[s._v(s._s(t.name?t.name.slice(0,1):""))]),s._v(" "),e("div",[e("span",[s._v(s._s(t.name)),e("i",[s._v(" 2018-06-07 14:12:56 ")])]),s._v(" "),e("p",[s._v("\n                                "+s._s(t.mes)+"\n                        ")])])]:s._e(),s._v(" "),"mine"===t.type?[e("div",[e("span",[s._v(s._s(t.name)),e("i",[s._v(" 2018-06-07 14:18:56 ")])]),s._v(" "),e("p",[s._v("\n                                "+s._s(t.mes)+"\n                        ")])]),s._v(" "),e("p",[s._v(s._s(t.name?t.name.slice(0,1):""))])]:s._e(),s._v(" "),"org"===t.type?[s._v("\n                        系统消息："),e("span",[s._v(s._s(t.name))]),s._v("加入聊天室！\n                    ")]:s._e()],2)}))]),s._v(" "),e("div",{staticClass:"chat-l-bottom"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:s.mes,expression:"mes"}],domProps:{value:s.mes},on:{input:function(t){t.target.composing||(s.mes=t.target.value)}}}),s._v(" "),e("span",{on:{click:s.send}},[s._v("发送")])])]),s._v(" "),e("div",{staticClass:"chat-r"},[e("h4",[s._v("群成员 ("+s._s(s.groupUsers.length)+")")]),s._v(" "),e("ul",s._l(s.groupUsers,function(t){return e("li",{key:t.userId._id},[e("p",[e("img",{attrs:{src:s.IMG_URL+t.userId.photo,alt:""}})]),s._v(" "),e("span",[s._v(s._s(t.userName))])])}))])])},staticRenderFns:[]};var c=e("C7Lr")(o,a,!1,function(s){e("nOIk")},"data-v-db707e02",null);t.default=c.exports},nOIk:function(s,t){}});