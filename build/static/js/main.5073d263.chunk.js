(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(t,e,n){t.exports=n(80)},45:function(t,e,n){},76:function(t,e){},79:function(t,e,n){},80:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),o=n(13),r=n.n(o),s=(n(45),n(1)),c=n(2),u=n(4),h=n(3),l=n(5),d=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).state={space:n.props.space||20},n.grid=a.a.createRef(),n}return Object(l.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.ctx=this.grid.current.getContext("2d"),this.ctx.bounds=this.grid.current.getBoundingClientRect(),this.ctx.strokeStyle="#888888",this.ctx.lineWidth=1,this.ctx.lineCap="round",this.ctx.width=window.innerWidth,this.ctx.height=window.innerHeight,this.renderGrid(this.ctx)}},{key:"renderGrid",value:function(t){if(t){t.bounds=this.grid.current.getBoundingClientRect(),t.clearRect(0,0,t.bounds.width,t.bounds.height),t.lineWidth=1,t.strokeStyle="#888888",t.lineCap="round",t.beginPath(),t.moveTo(0,0);for(var e=0;e<=t.bounds.width;e+=this.props.space)t.moveTo(e,0),t.lineTo(e,t.bounds.height),t.closePath(),t.stroke();for(var n=0;n<=t.bounds.height;n+=this.props.space)t.moveTo(0,n),t.lineTo(t.bounds.width,n),t.closePath(),t.stroke()}}},{key:"render",value:function(){return this.renderGrid(this.ctx),a.a.createElement("canvas",{width:this.props.window.x,height:this.props.window.y,style:{border:"1px solid red",pointerEvents:"none",position:"absolute"},ref:this.grid})}}]),e}(i.Component),v=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).state={drawing:!1},n.canvas=a.a.createRef(),n}return Object(l.a)(e,t),Object(c.a)(e,[{key:"shouldComponentUpdate",value:function(t,e){return!t.clear||(this.canvasContext.clear(),!1)}},{key:"componentDidMount",value:function(){this.canvasContext=this.canvas.current.getContext("2d"),this.canvasContext.bounds=this.canvas.current.getBoundingClientRect(),this.canvasContext.strokeStyle="#000000",this.canvasContext.lineWidth=1,this.canvasContext.lineCap="round",this.canvasContext.width=window.innerWidth,this.canvasContext.height=window.innerHeight,this.canvasContext.clear=function(){this.clearRect(0,0,this.bounds.width,this.bounds.height)}}},{key:"disableDraw",value:function(t){this.setState({drawing:!1})}},{key:"triggerDraw",value:function(t){var e=this.calcPath(t);this.canvasContext.beginPath(),this.canvasContext.moveTo(e.x,e.y),this.setState({drawing:!0})}},{key:"onDrag",value:function(t){if(this.state.drawing){var e=this.calcPath(t);this.canvasContext.lineTo(e.x,e.y),this.canvasContext.stroke()}}},{key:"calcPath",value:function(t){var e=this.canvasContext.bounds;return{x:t.clientX-e.x,y:t.clientY-e.y}}},{key:"render",value:function(){var t=this;return a.a.createElement("canvas",{ref:this.canvas,onMouseLeave:function(e){return t.disableDraw(e)},onMouseDown:function(e){return t.triggerDraw(e)},onMouseMove:function(e){return t.onDrag(e)},onMouseUp:function(e){return t.disableDraw(e)},width:this.props.window.x,height:this.props.window.y,style:{position:"absolute"}})}}]),e}(i.Component),p=n(19),w=n(20);function f(){var t=Object(p.a)(["\n    background-color: #1b1b1b;\n    display: flex;\n    flex-direction: column;\n    position: relative;\n"]);return f=function(){return t},t}function b(){var t=Object(p.a)(["\n    clip-path: polygon(0 35%, 100% 0, 100% 100%, 0 65%);\n    display: inline-block;\n    width: 25px;\n    height: 60px;\n    background: #1b1b1b;\n"]);return b=function(){return t},t}var g=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).state={expanded:!0},n}return Object(l.a)(e,t),Object(c.a)(e,[{key:"expand",value:function(){this.setState({expanded:!0})}},{key:"contract",value:function(){this.setState({expanded:!1})}},{key:"render",value:function(){var t=this;return a.a.createElement("div",{style:m(this.state),onMouseEnter:function(){return t.expand()},onMouseLeave:function(){return t.contract()}},a.a.createElement(x,null),a.a.createElement(y,null,this.props.children))}}]),e}(i.Component),x=w.a.div(b()),y=w.a.div(f()),m=function(t){return{display:"flex",width:"auto",position:"fixed",right:t.expanded?0:-135,top:0,bottom:0,margin:"auto",height:"fit-content",padding:"22px 0px",borderRadius:"4px"}},C=(n(50),n(79),function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).state={window:{x:window.innerWidth,y:window.innerHeight},space:60},n}return Object(l.a)(e,t),Object(c.a)(e,[{key:"actions",value:function(t){switch(t){case"clear":this.clearCanvas()}}},{key:"clearCanvas",value:function(){var t=this;this.setState({clear:!0},function(){return t.setState({clear:!1})})}},{key:"setBounds",value:function(){this.setState({window:{x:window.innerWidth,y:window.innerHeight}})}},{key:"render",value:function(){var t=this;return a.a.createElement(k,null,a.a.createElement(v,{clear:this.state.clear,window:this.state.window}),a.a.createElement(d,{window:this.state.window,space:this.state.space}),a.a.createElement(g,null,a.a.createElement("input",{type:"range",value:this.state.space,min:"60",max:"200",onChange:function(e){return t.setState({space:parseInt(e.target.value)})}}),a.a.createElement("button",{onClick:function(){return t.clearCanvas()}}," Clear "),a.a.createElement("button",{onClick:function(){return t.setBounds()}}," Set Screen ")))}}]),e}(i.Component)),k=function(t){return a.a.createElement("div",null,t.children)},j=C;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[40,1,2]]]);
//# sourceMappingURL=main.5073d263.chunk.js.map