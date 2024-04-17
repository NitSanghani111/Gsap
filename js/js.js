document.addEventListener("DOMContentLoaded", function () {

	'use strict';



	Splitting();
	luxy.init();
	gsap.registerPlugin(ScrollTrigger);

	const gTl = gsap.timeline();
	gTl.from(".title .char", 1, { opacity: 0, yPercent: 130, stagger: 0.06, ease: "back.out" });
	gTl.to(".header__img", 2, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, ease: "expo.out" }, "-=1");
	gTl.from(".header__marq", 2, { opacity: 0, yPercent: 100, ease: "expo.out" }, "-=1.5");

	const gsapSq = gsap.utils.toArray('.section-title__square');
	gsapSq.forEach((gSq, i) => {
		const rotat = gsap.from(gSq, 3, { rotation: 720 });
		ScrollTrigger.create({
			trigger: gSq,
			animation: rotat,
			start: 'top bottom',
			scrub: 1.9
		});
	});


	function header() {
		gsap.to('.title_paralax', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			yPercent: -150
		})
		gsap.to('.header .stroke', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			xPercent: 50
		})
		gsap.to('.header__img', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			xPercent: -70
		})
		gsap.to('.header__img img', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			scale: 1.3
		})
		gsap.to('.header__marq-wrapp', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			xPercent: -50
		})
		gsap.to('.header__marq-star img', {
			scrollTrigger: {
				trigger: '.header',
				start: 'top top',
				scrub: 1.9
			},
			rotate: -720
		})
	}
	header();


	
	function about() {
		gsap.from('.about__img', {
			scrollTrigger: {
				trigger: '.about',
				start: 'top bottom',
				scrub: 1.9
			},
			yPercent: 80
		})
		gsap.from('.about__img img', {
			scrollTrigger: {
				trigger: '.about',
				start: 'top bottom',
				scrub: 1.9
			},
			scale: 1.6
		})
		gsap.to('.about__txt', {
			scrollTrigger: {
				trigger: '.about__wrapp',
				start: 'top bottom',
				scrub: 1.9
			},
			yPercent: 50
		})
	}
	about();


	
	function benefits() {
		gsap.from('.benefits__num', {
			x: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))),
			scrollTrigger: {
				trigger: '.benefits__list',
				start: 'top bottom',
				scrub: 1.9
			}
		})
	}
	benefits();


	function portfolio() {
		gsap.from('.work__item, .work__item-num', {
			y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))),
			scrollTrigger: {
				trigger: '.work',
				start: 'top bottom',
				scrub: 1.9
			}
		})
		gsap.from('.work__item-img img', {
			scale: 1.6,
			scrollTrigger: {
				trigger: '.work__wrapp',
				start: 'top bottom',
				scrub: 1.9
			}
		})
	}
	portfolio();



	function serv() {
		gsap.from('.serv__item-arrow', {
			x: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))),
			scrollTrigger: {
				trigger: '.serv__list',
				start: 'top bottom',
				scrub: 1.9
			}
		})
	}
	serv();



	function footer() {
		gsap.from('.footer__div span', {
			y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed'))),
			opacity: 0,
			scrollTrigger: {
				trigger: '.footer',
				start: 'top bottom',
				end: 'bottom bottom',
				scrub: 1.9
			}
		})
	}
	footer();
});


(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	}
	else if (typeof exports === 'object') {
		// COMMONJS
		module.exports = factory();
	}
	else {
		// BROWSER
		root.luxy = factory();
	}
}(this, function() {

	'use strict';
	
		var defaults = {
			wrapper: '#luxy',
			targets : '.luxy-el',
			wrapperSpeed: 0.08,
			targetSpeed: 0.02,
			targetPercentage: 0.1
		};

 		var requestAnimationFrame = 
			window.requestAnimationFrame || window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			window.requestAnimationFrame = requestAnimationFrame;
		var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	
		var extend = function () {

			
			var extended = {};
			var deep = false;
			var i = 0;
			var length = arguments.length;

			
			var merge = function (obj) {
				for (var prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						extended[prop] = obj[prop];
					}
				}
			};

						for ( ; i < length; i++ ) {
				var obj = arguments[i];
				merge(obj);
			}

			return extended;

		};

		var Luxy = function(){
			this.Targets = [];
			this.TargetsLength = 0;
			this.wrapper = '';
			this.windowHeight = 0;
			this.wapperOffset = 0;
		};
		Luxy.prototype = {
			isAnimate: false,
			isResize : false,
			scrollId: "",
			resizeId: "",
			init : function(options){
				this.settings = extend(defaults, options || {});
				this.wrapper = document.querySelector(this.settings.wrapper);

				if(this.wrapper==="undefined"){
					return false;
				}
				this.targets = document.querySelectorAll(this.settings.targets);
				document.body.style.height = this.wrapper.clientHeight + 'px';

				this.windowHeight = window.clientHeight;
				this.attachEvent();
				this.apply(this.targets,this.wrapper);
				this.animate();
				this.resize();
			},
			apply : function(targets,wrapper){
				this.wrapperInit();
				
				this.targetsLength = targets.length;
				for (var i = 0; i < this.targetsLength; i++) {
					var attr = {
						offset : targets[i].getAttribute('data-offset'),
						speedX : targets[i].getAttribute('data-speed-x'),
						speedY : targets[i].getAttribute('data-speed-Y'),
						percentage : targets[i].getAttribute('data-percentage'),
						horizontal : targets[i].getAttribute('data-horizontal')
					};
					this.targetsInit(targets[i],attr);
				}
			},
			wrapperInit: function(){
				this.wrapper.style.width = '100%';
				this.wrapper.style.position = 'fixed';
			},
			targetsInit: function(elm,attr){
				
				this.Targets.push({
					elm : elm,
					offset : attr.offset ? attr.offset : 0,
					horizontal : attr.horizontal ? attr.horizontal : 0,
					top : 0,
					left : 0,
					speedX : attr.speedX ? attr.speedX : 1,
					speedY : attr.speedY ? attr.speedY : 1,
					percentage :attr.percentage ? attr.percentage : 0
				});
			},
			scroll : function(){
				var scrollTopTmp = document.documentElement.scrollTop || document.body.scrollTop;
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var offsetBottom = this.scrollTop + this.windowHeight;
				this.wrapperUpdate(this.scrollTop);
				for (var i = 0; i < this.Targets.length; i++) {
					this.targetsUpdate(this.Targets[i]);
				}
			},
			animate : function(){
				this.scroll();
				this.scrollId = requestAnimationFrame(this.animate.bind(this));
			},
			wrapperUpdate : function(){
				
				this.wapperOffset += (this.scrollTop - this.wapperOffset) * this.settings.wrapperSpeed;
				this.wrapper.style.transform = 'translate3d(' + 0 + ',' +  Math.round(-this.wapperOffset* 100) / 100 + 'px ,' + 0 + ')';
			},
			targetsUpdate : function(target){
				target.top += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedY) - target.top) * this.settings.targetPercentage;
				target.left += (this.scrollTop * Number(this.settings.targetSpeed) * Number(target.speedX) - target.left) * this.settings.targetPercentage;
				var targetOffsetTop = ( parseInt(target.percentage) - target.top - parseInt(target.offset) );
				var offsetY = Math.round(targetOffsetTop * -100) / 100;
				var offsetX = 0;
				if(target.horizontal){
					var targetOffsetLeft = ( parseInt(target.percentage) - target.left - parseInt(target.offset) );
					offsetX = Math.round(targetOffsetLeft * -100) / 100;
				}
				target.elm.style.transform = 'translate3d(' + offsetX + 'px ,' + offsetY + 'px ,' + 0 +')';
			},
			resize: function(){
				var self = this;
				self.windowHeight = (window.innerHeight || document.documentElement.clientHeight || 0);
				if( parseInt(self.wrapper.clientHeight) != parseInt(document.body.style.height)){
					document.body.style.height = self.wrapper.clientHeight + 'px';
				}
				self.resizeId = requestAnimationFrame(self.resize.bind(self));
			},
			attachEvent : function(){
				var self = this;
				window.addEventListener('resize',function(){
					if(!self.isResize){
						cancelAnimationFrame(self.resizeId);
						cancelAnimationFrame(self.scrollId);
						self.isResize = true;
						setTimeout(function(){
							self.isResize = false;
							self.resizeId = requestAnimationFrame(self.resize.bind(self));
							self.scrollId = requestAnimationFrame(self.animate.bind(self));
						},200);
					}
				});
				
			},
			cancel: function() {
				cancelAnimationFrame(this.resizeId);
				cancelAnimationFrame(this.scrollId);
				this.wrapper.removeAttribute('style');
				for (var i = 0; i < this.Targets.length; i++) {
					this.Targets[i].elm.removeAttribute('style');
				}
				this.wrapper = '';
				this.Targets = [];
				this.windowHeight = 0;
				this.wapperOffset = 0;
				this.isResize = false;
				this.scrollId = "";
				this.resizeId = "";
			},
		};

		
		var luxy = new Luxy();

		return luxy;
	})
);
