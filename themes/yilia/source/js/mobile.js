define([],function(){var e,t,n,i,d,o,s,a,l=!1,c=function(){d=document.body.scrollHeight/document.body.scrollWidth,o=document.body.scrollWidth,s=0},r=function(){e&&(document.getElementById("js-mobile-tagcloud").innerHTML=e.innerHTML),t&&(document.getElementById("js-mobile-aboutme").innerHTML=t.innerHTML),n&&(document.getElementById("js-mobile-friends").innerHTML=n.innerHTML)},m=function(){var i=document.createElement("div");i.id="viewer",i.className="hide",e=document.getElementById("js-tagcloud"),t=document.getElementById("js-aboutme"),n=document.getElementById("js-friends");var d=e?'<span class="viewer-title">标签</span><div class="viewer-div tagcloud" id="js-mobile-tagcloud"></div>':"",o=n?'<span class="viewer-title">友情链接</span><div class="viewer-div friends" id="js-mobile-friends"></div>':"",s=t?'<span class="viewer-title">关于我</span><div class="viewer-div aboutme" id="js-mobile-aboutme"></div>':"";i.innerHTML='<div id="viewer-box">		<div class="viewer-box-l">			<div class="viewer-box-wrap">'+s+o+d+'</div>		</div>		<div class="viewer-box-r"></div>		</div>',document.getElementsByTagName("body")[0].appendChild(i);var l=document.getElementById("viewer-box");a=l,l.style.height=document.body.scrollHeight+"px"},u=function(){document.getElementById("viewer").className="",setTimeout(function(){a.className="anm-swipe"},0),l=!0,document.ontouchstart=function(e){return"A"!=e.target.tagName?!1:void 0}},v=function(){document.getElementById("viewer-box").className="",l=!1,document.ontouchstart=function(){return!0}},f=function(){document.getElementById("viewer-box").addEventListener("webkitTransitionEnd",function(){0==l&&(document.getElementById("viewer").className="hide",l=!0)},!1),i.addEventListener("touchend",function(){u()},!1);var e,t,n=document.getElementsByClassName("viewer-box-r")[0];n.addEventListener("touchstart",function(){e=+new Date},!1),n.addEventListener("touchend",function(){t=+new Date,300>t-e&&v(),e=0,t=0},!1);var d=$("#mobile-nav .overlay"),o=$(".js-mobile-header");window.onscroll=function(){var e=document.documentElement.scrollTop+document.body.scrollTop;e>=69?d.addClass("fixed"):d.removeClass("fixed"),e>=160?o.removeClass("hide").addClass("fixed"):o.addClass("hide").removeClass("fixed")},o[0].addEventListener("touchstart",function(){$("html, body").animate({scrollTop:0},"slow")},!1)},g=function(){var e=$(".tagcloud a");e.css({"font-size":"12px"});for(var t=0,n=e.length;n>t;t++){var i=e.eq(t).html().length%5+1;e[t].className="",e.eq(t).addClass("color"+i)}};return{init:function(){i=document.getElementsByClassName("slider-trigger")[0],c(),m(),r(),f(),g()}}});