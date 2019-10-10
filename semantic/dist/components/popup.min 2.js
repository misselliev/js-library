!function(N,V,W,M){"use strict";V=void 0!==V&&V.Math==Math?V:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),N.fn.popup=function(x){var k,t=N(this),E=N(W),S=N(V),A=N("body"),F=t.selector||"",O=(new Date).getTime(),D=[],j=x,H="string"==typeof j,R=[].slice.call(arguments,1);return t.each(function(){var u,p,t,e,o,c,d=N.isPlainObject(x)?N.extend(!0,{},N.fn.popup.settings,x):N.extend({},N.fn.popup.settings),i=d.selector,f=d.className,g=d.error,h=d.metadata,n=d.namespace,r="."+d.namespace,a="module-"+n,m=N(this),s=N(d.context),l=N(d.scrollContext),v=N(d.boundary),b=d.target?N(d.target):m,w=0,y=!1,P=!1,C=this,T=m.data(a);c={initialize:function(){c.debug("Initializing",m),c.createID(),c.bind.events(),!c.exists()&&d.preserve&&c.create(),d.observeChanges&&c.observeChanges(),c.instantiate()},instantiate:function(){c.verbose("Storing instance",c),T=c,m.data(a,T)},observeChanges:function(){"MutationObserver"in V&&((t=new MutationObserver(c.event.documentChanged)).observe(W,{childList:!0,subtree:!0}),c.debug("Setting up mutation observer",t))},refresh:function(){d.popup?u=N(d.popup).eq(0):d.inline&&(u=b.nextAll(i.popup).eq(0),d.popup=u),d.popup?(u.addClass(f.loading),p=c.get.offsetParent(),u.removeClass(f.loading),d.movePopup&&c.has.popup()&&c.get.offsetParent(u)[0]!==p[0]&&(c.debug("Moving popup to the same offset parent as target"),u.detach().appendTo(p))):p=d.inline?c.get.offsetParent(b):c.has.popup()?c.get.offsetParent(u):A,p.is("html")&&p[0]!==A[0]&&(c.debug("Setting page as offset parent"),p=A),c.get.variation()&&c.set.variation()},reposition:function(){c.refresh(),c.set.position()},destroy:function(){c.debug("Destroying previous module"),t&&t.disconnect(),u&&!d.preserve&&c.removePopup(),clearTimeout(c.hideTimer),clearTimeout(c.showTimer),c.unbind.close(),c.unbind.events(),m.removeData(a)},event:{start:function(t){var e=N.isPlainObject(d.delay)?d.delay.show:d.delay;clearTimeout(c.hideTimer),P||(c.showTimer=setTimeout(c.show,e))},end:function(){var t=N.isPlainObject(d.delay)?d.delay.hide:d.delay;clearTimeout(c.showTimer),c.hideTimer=setTimeout(c.hide,t)},touchstart:function(t){P=!0,c.show()},resize:function(){c.is.visible()&&c.set.position()},documentChanged:function(t){[].forEach.call(t,function(t){t.removedNodes&&[].forEach.call(t.removedNodes,function(t){(t==C||0<N(t).find(C).length)&&(c.debug("Element removed from DOM, tearing down events"),c.destroy())})})},hideGracefully:function(t){var e=N(t.target),o=N.contains(W.documentElement,t.target),n=0<e.closest(i.popup).length;t&&!n&&o?(c.debug("Click occurred outside popup hiding popup"),c.hide()):c.debug("Click was inside popup, keeping popup open")}},create:function(){var t=c.get.html(),e=c.get.title(),o=c.get.content();t||o||e?(c.debug("Creating pop-up html"),t=t||d.templates.popup({title:e,content:o}),u=N("<div/>").addClass(f.popup).data(h.activator,m).html(t),d.inline?(c.verbose("Inserting popup element inline",u),u.insertAfter(m)):(c.verbose("Appending popup element to body",u),u.appendTo(s)),c.refresh(),c.set.variation(),d.hoverable&&c.bind.popup(),d.onCreate.call(u,C)):0!==b.next(i.popup).length?(c.verbose("Pre-existing popup found"),d.inline=!0,d.popup=b.next(i.popup).data(h.activator,m),c.refresh(),d.hoverable&&c.bind.popup()):d.popup?(N(d.popup).data(h.activator,m),c.verbose("Used popup specified in settings"),c.refresh(),d.hoverable&&c.bind.popup()):c.debug("No content specified skipping display",C)},createID:function(){o=(Math.random().toString(16)+"000000000").substr(2,8),e="."+o,c.verbose("Creating unique id for element",o)},toggle:function(){c.debug("Toggling pop-up"),c.is.hidden()?(c.debug("Popup is hidden, showing pop-up"),c.unbind.close(),c.show()):(c.debug("Popup is visible, hiding pop-up"),c.hide())},show:function(t){if(t=t||function(){},c.debug("Showing pop-up",d.transition),c.is.hidden()&&(!c.is.active()||!c.is.dropdown())){if(c.exists()||c.create(),!1===d.onShow.call(u,C))return void c.debug("onShow callback returned false, cancelling popup animation");d.preserve||d.popup||c.refresh(),u&&c.set.position()&&(c.save.conditions(),d.exclusive&&c.hideAll(),c.animate.show(t))}},hide:function(t){if(t=t||function(){},c.is.visible()||c.is.animating()){if(!1===d.onHide.call(u,C))return void c.debug("onHide callback returned false, cancelling popup animation");c.remove.visible(),c.unbind.close(),c.restore.conditions(),c.animate.hide(t)}},hideAll:function(){N(i.popup).filter("."+f.popupVisible).each(function(){N(this).data(h.activator).popup("hide")})},exists:function(){return!!u&&(d.inline||d.popup?c.has.popup():1<=u.closest(s).length)},removePopup:function(){c.has.popup()&&!d.popup&&(c.debug("Removing popup",u),u.remove(),u=M,d.onRemove.call(u,C))},save:{conditions:function(){c.cache={title:m.attr("title")},c.cache.title&&m.removeAttr("title"),c.verbose("Saving original attributes",c.cache.title)}},restore:{conditions:function(){return c.cache&&c.cache.title&&(m.attr("title",c.cache.title),c.verbose("Restoring original attributes",c.cache.title)),!0}},supports:{svg:function(){return"undefined"==typeof SVGGraphicsElement}},animate:{show:function(t){t=N.isFunction(t)?t:function(){},d.transition&&N.fn.transition!==M&&m.transition("is supported")?(c.set.visible(),u.transition({animation:d.transition+" in",queue:!1,debug:d.debug,verbose:d.verbose,duration:d.duration,onComplete:function(){c.bind.close(),t.call(u,C),d.onVisible.call(u,C)}})):c.error(g.noTransition)},hide:function(t){t=N.isFunction(t)?t:function(){},c.debug("Hiding pop-up"),!1!==d.onHide.call(u,C)?d.transition&&N.fn.transition!==M&&m.transition("is supported")?u.transition({animation:d.transition+" out",queue:!1,duration:d.duration,debug:d.debug,verbose:d.verbose,onComplete:function(){c.reset(),t.call(u,C),d.onHidden.call(u,C)}}):c.error(g.noTransition):c.debug("onHide callback returned false, cancelling popup animation")}},change:{content:function(t){u.html(t)}},get:{html:function(){return m.removeData(h.html),m.data(h.html)||d.html},title:function(){return m.removeData(h.title),m.data(h.title)||d.title},content:function(){return m.removeData(h.content),m.data(h.content)||d.content||m.attr("title")},variation:function(){return m.removeData(h.variation),m.data(h.variation)||d.variation},popup:function(){return u},popupOffset:function(){return u.offset()},calculations:function(){var t,e=c.get.offsetParent(u),o=b[0],n=v[0]==V,i=d.inline||d.popup&&d.movePopup?b.position():b.offset(),r=n?{top:0,left:0}:v.offset(),a={},s=n?{top:S.scrollTop(),left:S.scrollLeft()}:{top:0,left:0};if(a={target:{element:b[0],width:b.outerWidth(),height:b.outerHeight(),top:i.top,left:i.left,margin:{}},popup:{width:u.outerWidth(),height:u.outerHeight()},parent:{width:p.outerWidth(),height:p.outerHeight()},screen:{top:r.top,left:r.left,scroll:{top:s.top,left:s.left},width:v.width(),height:v.height()}},e.get(0)!==p.get(0)){var l=e.offset();a.target.top-=l.top,a.target.left-=l.left,a.parent.width=e.outerWidth(),a.parent.height=e.outerHeight()}return d.setFluidWidth&&c.is.fluid()&&(a.container={width:u.parent().outerWidth()},a.popup.width=a.container.width),a.target.margin.top=d.inline?parseInt(V.getComputedStyle(o).getPropertyValue("margin-top"),10):0,a.target.margin.left=d.inline?c.is.rtl()?parseInt(V.getComputedStyle(o).getPropertyValue("margin-right"),10):parseInt(V.getComputedStyle(o).getPropertyValue("margin-left"),10):0,t=a.screen,a.boundary={top:t.top+t.scroll.top,bottom:t.top+t.scroll.top+t.height,left:t.left+t.scroll.left,right:t.left+t.scroll.left+t.width},a},id:function(){return o},startEvent:function(){return"hover"==d.on?"mouseenter":"focus"==d.on&&"focus"},scrollEvent:function(){return"scroll"},endEvent:function(){return"hover"==d.on?"mouseleave":"focus"==d.on&&"blur"},distanceFromBoundary:function(t,e){var o,n,i={};return o=(e=e||c.get.calculations()).popup,n=e.boundary,t&&(i={top:t.top-n.top,left:t.left-n.left,right:n.right-(t.left+o.width),bottom:n.bottom-(t.top+o.height)},c.verbose("Distance from boundaries determined",t,i)),i},offsetParent:function(t){var e=(t!==M?t[0]:b[0]).parentNode,o=N(e);if(e)for(var n="none"===o.css("transform"),i="static"===o.css("position"),r=o.is("body");e&&!r&&i&&n;)e=e.parentNode,n="none"===(o=N(e)).css("transform"),i="static"===o.css("position"),r=o.is("body");return o&&0<o.length?o:N()},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(t){var e=t.split(" "),o=e[0],n=e[1],i="top"==o||"bottom"==o,r=!1,a=!1,s=!1;return y||(c.verbose("All available positions available"),y=c.get.positions()),c.debug("Recording last position tried",t),y[t]=!0,"opposite"===d.prefer&&(s=(s=[{top:"bottom",bottom:"top",left:"right",right:"left"}[o],n]).join(" "),r=!0===y[s],c.debug("Trying opposite strategy",s)),"adjacent"===d.prefer&&i&&(s=(s=[o,{left:"center",center:"right",right:"left"}[n]]).join(" "),a=!0===y[s],c.debug("Trying adjacent strategy",s)),(a||r)&&(c.debug("Using backup position",s),s={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"}[t]),s}},set:{position:function(t,e){if(0!==b.length&&0!==u.length){var o,n,i,r,a,s,l,p;if(e=e||c.get.calculations(),t=t||m.data(h.position)||d.position,o=m.data(h.offset)||d.offset,n=d.distanceAway,i=e.target,r=e.popup,a=e.parent,c.should.centerArrow(e)&&(c.verbose("Adjusting offset to center arrow on small target element"),"top left"!=t&&"bottom left"!=t||(o+=i.width/2,o-=d.arrowPixelsFromEdge),"top right"!=t&&"bottom right"!=t||(o-=i.width/2,o+=d.arrowPixelsFromEdge)),0===i.width&&0===i.height&&!c.is.svg(i.element))return c.debug("Popup target is hidden, no action taken"),!1;switch(d.inline&&(c.debug("Adding margin to calculation",i.margin),"left center"==t||"right center"==t?(o+=i.margin.top,n+=-i.margin.left):"top left"==t||"top center"==t||"top right"==t?(o+=i.margin.left,n-=i.margin.top):(o+=i.margin.left,n+=i.margin.top)),c.debug("Determining popup position from calculations",t,e),c.is.rtl()&&(t=t.replace(/left|right/g,function(t){return"left"==t?"right":"left"}),c.debug("RTL: Popup position updated",t)),w==d.maxSearchDepth&&"string"==typeof d.lastResort&&(t=d.lastResort),t){case"top left":s={top:"auto",bottom:a.height-i.top+n,left:i.left+o,right:"auto"};break;case"top center":s={bottom:a.height-i.top+n,left:i.left+i.width/2-r.width/2+o,top:"auto",right:"auto"};break;case"top right":s={bottom:a.height-i.top+n,right:a.width-i.left-i.width-o,top:"auto",left:"auto"};break;case"left center":s={top:i.top+i.height/2-r.height/2+o,right:a.width-i.left+n,left:"auto",bottom:"auto"};break;case"right center":s={top:i.top+i.height/2-r.height/2+o,left:i.left+i.width+n,bottom:"auto",right:"auto"};break;case"bottom left":s={top:i.top+i.height+n,left:i.left+o,bottom:"auto",right:"auto"};break;case"bottom center":s={top:i.top+i.height+n,left:i.left+i.width/2-r.width/2+o,bottom:"auto",right:"auto"};break;case"bottom right":s={top:i.top+i.height+n,right:a.width-i.left-i.width-o,left:"auto",bottom:"auto"}}if(s===M&&c.error(g.invalidPosition,t),c.debug("Calculated popup positioning values",s),u.css(s).removeClass(f.position).addClass(t).addClass(f.loading),l=c.get.popupOffset(),p=c.get.distanceFromBoundary(l,e),c.is.offstage(p,t)){if(c.debug("Position is outside viewport",t),w<d.maxSearchDepth)return w++,t=c.get.nextPosition(t),c.debug("Trying new position",t),!!u&&c.set.position(t,e);if(!d.lastResort)return c.debug("Popup could not find a position to display",u),c.error(g.cannotPlace,C),c.remove.attempts(),c.remove.loading(),c.reset(),d.onUnplaceable.call(u,C),!1;c.debug("No position found, showing with last position")}return c.debug("Position is on stage",t),c.remove.attempts(),c.remove.loading(),d.setFluidWidth&&c.is.fluid()&&c.set.fluidWidth(e),!0}c.error(g.notFound)},fluidWidth:function(t){t=t||c.get.calculations(),c.debug("Automatically setting element width to parent width",t.parent.width),u.css("width",t.container.width)},variation:function(t){(t=t||c.get.variation())&&c.has.popup()&&(c.verbose("Adding variation to popup",t),u.addClass(t))},visible:function(){m.addClass(f.visible)}},remove:{loading:function(){u.removeClass(f.loading)},variation:function(t){(t=t||c.get.variation())&&(c.verbose("Removing variation",t),u.removeClass(t))},visible:function(){m.removeClass(f.visible)},attempts:function(){c.verbose("Resetting all searched positions"),w=0,y=!1}},bind:{events:function(){c.debug("Binding popup events to module"),"click"==d.on&&m.on("click"+r,c.toggle),"hover"==d.on&&m.on("touchstart"+r,c.event.touchstart),c.get.startEvent()&&m.on(c.get.startEvent()+r,c.event.start).on(c.get.endEvent()+r,c.event.end),d.target&&c.debug("Target set to element",b),S.on("resize"+e,c.event.resize)},popup:function(){c.verbose("Allowing hover events on popup to prevent closing"),u&&c.has.popup()&&u.on("mouseenter"+r,c.event.start).on("mouseleave"+r,c.event.end)},close:function(){(!0===d.hideOnScroll||"auto"==d.hideOnScroll&&"click"!=d.on)&&c.bind.closeOnScroll(),c.is.closable()?c.bind.clickaway():"hover"==d.on&&P&&c.bind.touchClose()},closeOnScroll:function(){c.verbose("Binding scroll close event to document"),l.one(c.get.scrollEvent()+e,c.event.hideGracefully)},touchClose:function(){c.verbose("Binding popup touchclose event to document"),E.on("touchstart"+e,function(t){c.verbose("Touched away from popup"),c.event.hideGracefully.call(C,t)})},clickaway:function(){c.verbose("Binding popup close event to document"),E.on("click"+e,function(t){c.verbose("Clicked away from popup"),c.event.hideGracefully.call(C,t)})}},unbind:{events:function(){S.off(e),m.off(r)},close:function(){E.off(e),l.off(e)}},has:{popup:function(){return u&&0<u.length}},should:{centerArrow:function(t){return!c.is.basic()&&t.target.width<=2*d.arrowPixelsFromEdge}},is:{closable:function(){return"auto"==d.closable?"hover"!=d.on:d.closable},offstage:function(t,o){var n=[];return N.each(t,function(t,e){e<-d.jitter&&(c.debug("Position exceeds allowable distance from edge",t,e,o),n.push(t))}),0<n.length},svg:function(t){return c.supports.svg()&&t instanceof SVGGraphicsElement},basic:function(){return m.hasClass(f.basic)},active:function(){return m.hasClass(f.active)},animating:function(){return u!==M&&u.hasClass(f.animating)},fluid:function(){return u!==M&&u.hasClass(f.fluid)},visible:function(){return u!==M&&u.hasClass(f.popupVisible)},dropdown:function(){return m.hasClass(f.dropdown)},hidden:function(){return!c.is.visible()},rtl:function(){return"rtl"==m.css("direction")}},reset:function(){c.remove.visible(),d.preserve?N.fn.transition!==M&&u.transition("remove transition"):c.removePopup()},setting:function(t,e){if(N.isPlainObject(t))N.extend(!0,d,t);else{if(e===M)return d[t];d[t]=e}},internal:function(t,e){if(N.isPlainObject(t))N.extend(!0,c,t);else{if(e===M)return c[t];c[t]=e}},debug:function(){!d.silent&&d.debug&&(d.performance?c.performance.log(arguments):(c.debug=Function.prototype.bind.call(console.info,console,d.name+":"),c.debug.apply(console,arguments)))},verbose:function(){!d.silent&&d.verbose&&d.debug&&(d.performance?c.performance.log(arguments):(c.verbose=Function.prototype.bind.call(console.info,console,d.name+":"),c.verbose.apply(console,arguments)))},error:function(){d.silent||(c.error=Function.prototype.bind.call(console.error,console,d.name+":"),c.error.apply(console,arguments))},performance:{log:function(t){var e,o;d.performance&&(o=(e=(new Date).getTime())-(O||e),O=e,D.push({Name:t[0],Arguments:[].slice.call(t,1)||"",Element:C,"Execution Time":o})),clearTimeout(c.performance.timer),c.performance.timer=setTimeout(c.performance.display,500)},display:function(){var t=d.name+":",o=0;O=!1,clearTimeout(c.performance.timer),N.each(D,function(t,e){o+=e["Execution Time"]}),t+=" "+o+"ms",F&&(t+=" '"+F+"'"),(console.group!==M||console.table!==M)&&0<D.length&&(console.groupCollapsed(t),console.table?console.table(D):N.each(D,function(t,e){console.log(e.Name+": "+e["Execution Time"]+"ms")}),console.groupEnd()),D=[]}},invoke:function(n,t,e){var i,r,o,a=T;return t=t||R,e=C||e,"string"==typeof n&&a!==M&&(n=n.split(/[\. ]/),i=n.length-1,N.each(n,function(t,e){var o=t!=i?e+n[t+1].charAt(0).toUpperCase()+n[t+1].slice(1):n;if(N.isPlainObject(a[o])&&t!=i)a=a[o];else{if(a[o]!==M)return r=a[o],!1;if(!N.isPlainObject(a[e])||t==i)return a[e]!==M&&(r=a[e]),!1;a=a[e]}})),N.isFunction(r)?o=r.apply(e,t):r!==M&&(o=r),N.isArray(k)?k.push(o):k!==M?k=[k,o]:o!==M&&(k=o),r}},H?(T===M&&c.initialize(),c.invoke(j)):(T!==M&&T.invoke("destroy"),c.initialize())}),k!==M?k:this},N.fn.popup.settings={name:"Popup",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"popup",observeChanges:!0,onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onUnplaceable:function(){},onHidden:function(){},on:"hover",boundary:V,addTouchEvents:!0,position:"top left",variation:"",movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,content:!1,html:!1,title:!1,closable:!0,hideOnScroll:"auto",exclusive:!1,context:"body",scrollContext:V,prefer:"opposite",lastResort:!1,arrowPixelsFromEdge:20,delay:{show:50,hide:70},setFluidWidth:!0,duration:200,transition:"scale",distanceAway:0,jitter:2,offset:0,maxSearchDepth:15,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"Popup does not fit within the boundaries of the viewport",method:"The method you called is not defined.",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",notFound:"The target or popup you specified does not exist on the page"},metadata:{activator:"activator",content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",basic:"basic",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible",popupVisible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(t)?t.replace(/[&<>"'`]/g,function(t){return e[t]}):t},popup:function(t){var e="",o=N.fn.popup.settings.templates.escape;return typeof t!==M&&(typeof t.title!==M&&t.title&&(t.title=o(t.title),e+='<div class="header">'+t.title+"</div>"),typeof t.content!==M&&t.content&&(t.content=o(t.content),e+='<div class="content">'+t.content+"</div>")),e}}}}(jQuery,window,document);