(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[498],{7515:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(4848),i=n(5892);function o(){return(0,r.jsxs)("footer",{className:"footer",children:[(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("a",{href:"/",children:(0,r.jsx)("img",{src:"/mon-expert.png",alt:"Netlify Logo",className:"logo"})}),(0,r.jsx)("p",{children:'Le service tout-en-un qui simplifie la gestion juridique, fiscale et comptable des entrepreneurs, TPE et freelances. Gr\xe2ce \xe0 un accompagnement personnalis\xe9 par des experts qualifi\xe9s et des outils digitaux performants, "Mon Expert" vous aide \xe0 cr\xe9er, g\xe9rer et optimiser votre entreprise en toute s\xe9r\xe9nit\xe9. Accessible, transparent et con\xe7u pour lib\xe9rer votre temps, il vous permet de vous concentrer sur l\'essentiel : d\xe9velopper votre activit\xe9, sans les tracas administratifs.'})]}),Object.keys(i).map(e=>(0,r.jsxs)("div",{className:"column",children:[(0,r.jsx)("h3",{children:e}),(0,r.jsx)("ul",{children:i[e].map(t=>(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/".concat(e.toLowerCase(),"/").concat(t.toLowerCase().replace(/ /g,"-")),children:t})},t))})]},e))]})}},4793:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});var r=n(4848),i=n(5892);function o(e){let{title:t}=e;return(0,r.jsxs)("header",{children:[(0,r.jsx)("div",{className:"logo",children:(0,r.jsx)("img",{src:"/mon-expert.png",alt:"Logo"})}),(0,r.jsx)("nav",{children:(0,r.jsx)("ul",{children:Object.keys(i).map(e=>(0,r.jsxs)("li",{children:[(0,r.jsx)("a",{href:"/".concat(e.toLowerCase()),children:e}),(0,r.jsx)("ul",{className:"sub-menu",children:i[e].map(t=>(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/".concat(e.toLowerCase(),"/").concat(t.toLowerCase().replace(/ /g,"-")),children:t})},t))})]},e))})})]})}},6825:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return r}});let r=n(7677)._(n(6540)).default.createContext({})},8721:(e,t)=>{"use strict";function n(e){let{ampFirst:t=!1,hybrid:n=!1,hasQuery:r=!1}=void 0===e?{}:e;return t||n&&r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return n}})},6085:(e,t,n)=>{"use strict";var r=n(2649);Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return g},defaultHead:function(){return p}});let i=n(7677),o=n(544),s=n(4848),a=o._(n(6540)),u=i._(n(5076)),c=n(6825),l=n(1215),d=n(8721);function p(e){void 0===e&&(e=!1);let t=[(0,s.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,s.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}n(7679);let m=["name","httpEquiv","charSet","itemProp"];function h(e,t){let{inAmpMode:n}=t;return e.reduce(f,[]).reverse().concat(p(n).reverse()).filter(function(){let e=new Set,t=new Set,n=new Set,r={};return i=>{let o=!0,s=!1;if(i.key&&"number"!=typeof i.key&&i.key.indexOf("$")>0){s=!0;let t=i.key.slice(i.key.indexOf("$")+1);e.has(t)?o=!1:e.add(t)}switch(i.type){case"title":case"base":t.has(i.type)?o=!1:t.add(i.type);break;case"meta":for(let e=0,t=m.length;e<t;e++){let t=m[e];if(i.props.hasOwnProperty(t)){if("charSet"===t)n.has(t)?o=!1:n.add(t);else{let e=i.props[t],n=r[t]||new Set;("name"!==t||!s)&&n.has(e)?o=!1:(n.add(e),r[t]=n)}}}}return o}}()).reverse().map((e,t)=>{let i=e.key||t;if(r.env.__NEXT_OPTIMIZE_FONTS&&!n&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,a.default.cloneElement(e,t)}return a.default.cloneElement(e,{key:i})})}let g=function(e){let{children:t}=e,n=(0,a.useContext)(c.AmpStateContext),r=(0,a.useContext)(l.HeadManagerContext);return(0,s.jsx)(u.default,{reduceComponentsToState:h,headManager:r,inAmpMode:(0,d.isInAmpMode)(n),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5076:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let r=n(6540),i=r.useLayoutEffect,o=r.useEffect;function s(e){let{headManager:t,reduceComponentsToState:n}=e;function s(){if(t&&t.mountedInstances){let i=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(n(i,e))}}return i(()=>{var n;return null==t||null==(n=t.mountedInstances)||n.add(e.children),()=>{var n;null==t||null==(n=t.mountedInstances)||n.delete(e.children)}}),i(()=>(t&&(t._pendingUpdate=s),()=>{t&&(t._pendingUpdate=s)})),o(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},7679:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},3368:(e,t,n)=>{e.exports=n(6085)},2649:e=>{var t,n,r,i=e.exports={};function o(){throw Error("setTimeout has not been defined")}function s(){throw Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===o||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:o}catch(e){t=o}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var u=[],c=!1,l=-1;function d(){c&&r&&(c=!1,r.length?u=r.concat(u):l=-1,u.length&&p())}function p(){if(!c){var e=a(d);c=!0;for(var t=u.length;t;){for(r=u,u=[];++l<t;)r&&r[l].run();l=-1,t=u.length}r=null,c=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new f(e,t)),1!==u.length||c||a(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}},5892:e=>{"use strict";e.exports=JSON.parse('{"Services":["Juridique","Financier","Administratif","Technique","Marketing","Sant\xe9 et bien-\xeatre","Alimentation","Retraites","Entreprendre","Comptabilit\xe9","Gestion de patrimoine","Informatique","Logistique","S\xe9curit\xe9 du domicile","Cybers\xe9curit\xe9","Assistance virtuelle","R\xe9servation","Immobilier","Remboursements","Financements","Location","Recrutement","Intelligence artificielle"],"D\xe9marches":["Juridique","Financi\xe8res","Administratives","Techniques","Marketing","Sant\xe9 et bien-\xeatre","Retraites","Entrepreneuriat","Comptabilit\xe9","Gestion de patrimoine","Informatique","Logistiques","S\xe9curit\xe9 du domicile","Cybers\xe9curit\xe9","Immobili\xe8res","Remboursements","Financements","Locations","Recrutement","E-commerce","Subventions publiques","Demandes d\'aides sociales"],"Assistance":["Juridique","Financier","Administratif","Technique","Marketing","Sant\xe9 et bien-\xeatre","Informatique","S\xe9curit\xe9 et cybers\xe9curit\xe9","R\xe9servation","Immobilier","Logistique","E-commerce","Comptabilit\xe9","Gestion de patrimoine","Recrutement","Formation continue","Support logiciel","Optimisation fiscale","R\xe9daction de documents professionnels"]}')}}]);