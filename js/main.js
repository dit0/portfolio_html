/**

 */
 (function() {

 	var bodyEl = document.body,
 	docElem = window.document.documentElement,
 	support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		onEndTransition = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.transitions ) {
					if( ev.target != this ) return;
					this.removeEventListener( transEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(this); }
			};
			if( support.transitions ) {
				el.addEventListener( transEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		},
		gridEl = document.getElementById('theGrid'),
		sidebarEl = document.getElementById('theSidebar'),
		gridItemsContainer = gridEl.querySelector('section.grid'),
		contentItemsContainer = gridEl.querySelector('section.content'),
		gridItems = gridItemsContainer.querySelectorAll('.grid__item'),
		contentItems = contentItemsContainer.querySelectorAll('.content__item'),
		closeCtrl = contentItemsContainer.querySelector('.close-button'),
		current = -1,
		lockScroll = false, xscroll, yscroll,
		isAnimating = false,
		menuCtrl = document.getElementById('menu-toggle'),
		menuCloseCtrl = sidebarEl.querySelector('.close-button');


	/**
	 * gets the viewport width and height
	 * based on http://responsejs.com/labs/dimensions/
	 */
	 function getViewport( axis ) {
	 	var client, inner;
	 	if( axis === 'x' ) {
	 		client = docElem['clientWidth'];
	 		inner = window['innerWidth'];
	 	}
	 	else if( axis === 'y' ) {
	 		client = docElem['clientHeight'];
	 		inner = window['innerHeight'];
	 	}

	 	return client < inner ? inner : client;
	 }
	 function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
	 function scrollY() { return window.pageYOffset || docElem.scrollTop; }

	 function init() {
	 	initEvents();
	 }
	 function botoes(){
	 	botoesEvents();
	 }

	 function initEvents() {
	 	[].slice.call(gridItems).forEach(function(item, pos) {
			// grid item click event
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				if(isAnimating || current === pos) {
					return false;
				}
				isAnimating = true;
				// index of current item
				current = pos;
				// simulate loading time..
				//classie.add(item, 'grid__item--loading');
				$(item).addClass('grid__item--loading');
				setTimeout(function() {
					//classie.add(item, 'grid__item--animate');
					$(item).addClass('grid__item--animate');
					// reveal/load content after the last element animates out (todo: wait for the last transition to finish)
					setTimeout(function() { loadContent(item); }, 500);
				}, 1000);
			});
		});

	 	closeCtrl.addEventListener('click', function() {
			// hide content
			hideContent();
		});

		//botao next
/*		[].slice.call(proximo).forEach(function(item, pos) {
			item.addEventListener('click', function(ev) {
				ev.preventDefault();
				var contentItem = contentItems[current], gridItem = gridItems[current];
				current = pos;
				//alterar o numero, mesmo numero para posts/jobs -1
				if(current !== 9) {
					//console.log(current);
					//console.log(contentItem);
					//console.log(gridItem);
					//console.log('frente / pos: '+pos+ ' current: '+current+ ' contentItem: '+contentItem);

					//classie.add(gridItems[current+1], 'grid__item--loading');
					//classie.add(gridItems[current+1], 'grid__item--animate');
					$(gridItems[current+1]).addClass('grid__item--loading grid__item--animate')
					
					//classie.removeClass(gridItems[current], 'grid__item--loading');
					//classie.removeClass(gridItems[current], 'grid__item--animate');
					$(gridItems[current]).removeClass('grid__item--loading grid__item--animate')
					
					//classie.add(contentItems[current + 1], 'content__item--show');
					$(contentItems[current + 1]).addClass('content__item--show');
					
					//classie.removeClass(contentItems[current], 'content__item--show');
					$(contentItems[current]).removeClass('content__item--show');
					console.log('next0');
				} else {
					//console.log('fim / pos: '+pos+ ' current: '+current)
					//desabilitar o botão
					$(item).addClass('disabled');
					console.log('next1');
				}
			})
		});

		//botao previous
		[].slice.call(anterior).forEach(function(item, pos) {
			console.log('previous0');
			item.addEventListener('click', function(ev) {
				console.log('previous0');
				ev.preventDefault();
				var contentItem = contentItems[current], gridItem = gridItems[current];
				current = pos;
				if(current !== -0) {
					//console.log(current);
					//classie.add(gridItems[current-1], 'grid__item--loading');
					//classie.add(gridItems[current-1], 'grid__item--animate');
					$(gridItems[current-1]).addClass('grid__item--loading grid__item--animate');
					
					//classie.removeClass(gridItems[current], 'grid__item--loading');
					//classie.removeClass(gridItems[current], 'grid__item--animate');
					$(gridItems[current]).removeClass('grid__item--loading grid__item--animate');

					//classie.add(contentItems[current - 1], 'content__item--show');
					$(contentItems[current - 1]).addClass('content__item--show');
					
					//classie.removeClass(contentItems[current], 'content__item--show');
					$(contentItems[current]).removeClass('content__item--show');
					console.log('previous0');
				}else{
					//desabilitar o botao 
					$(item).addClass('disabled');
					console.log('previous1');
				}
			})
		});
		
		
/*		var currentItem = $('article.content__item');
		$.get('./jobs/job_'+current+'.html?asdas', function(respons) {
			
			$(currentItem).html(respons);// = $.parseHTML(respons);
			console.log(currentItem);
		});  */

		// keyboard esc - hide content
		document.addEventListener('keydown', function(ev) {
			if(!isAnimating && current !== -1) {
				var keyCode = ev.keyCode || ev.which;
				if( keyCode === 27 ) {
					ev.preventDefault();
					if ("activeElement" in document)
						document.activeElement.blur();
					hideContent();
				}
			}
		} );
		
		// hamburger menu button (mobile) and close cross
		menuCtrl.addEventListener('click', function() {
			if( !$(sidebarEl).hasClass('sidebar--open') /*classie.has(sidebarEl, 'sidebar--open')*/ ) {
				//classie.add(sidebarEl, 'sidebar--open');	
				$(sidebarEl).addClass('sidebar--open');
			}
		});

		menuCloseCtrl.addEventListener('click', function() {
			if( $(sidebarEl).hasClass('sidebar--open') /*classie.has(sidebarEl, 'sidebar--open')*/ ) {
				//classie.remove(sidebarEl, 'sidebar--open');
				$(sidebarEl).removeClass('sidebar--open');
				
			}
		});
	}

	function loadContent(item) {
		// add expanding element/placeholder 
		var dummy = document.createElement('div');
		dummy.className = 'placeholder';

		// set the width/heigth and position
		dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';
		dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';

		// add transition class 
		$(dummy).addClass('placeholder--trans-in');

		// insert it after all the grid items
		gridItemsContainer.appendChild(dummy);
		
		//botao next
		function next(){
			proximo = contentItemsContainer.querySelectorAll('.proximo');
			[].slice.call(proximo).forEach(function(item) {
				item.addEventListener('click', function(ev) {
					ev.preventDefault();
					//remove a classe do item atual
					//$(currentItem).removeClass( "content__item--show" );
					if(current !== 9) {
						$(contentItemsContainer).removeClass('content--show');
						$(gridItems[current+1]).addClass('grid__item--loading grid__item--animate');
						$(gridItems[current]).removeClass('grid__item--loading grid__item--animate');
						$(contentItems[current + 1]).addClass('content__item--show');
						$(contentItems[current]).removeClass('content__item--show');
						current = ++current;	
						$.get('./jobs/job_'+ current+'.html?', function(respons) {
							$(currentItem).html(respons);
							//faz o efeito do proximo item
							$(currentItem).addClass( "content__item--show" );
							$(contentItemsContainer).addClass('content--show');
							next();
							previous();
						});		
					} else {
						//desabilitar o botão
						$(item).addClass('disabled');
					}
					console.log("current é final é: "+current);
				});
			});
		};
		//botao previous
		function previous(){
			anterior = contentItemsContainer.querySelectorAll('.anterior');
			[].slice.call(anterior).forEach(function(item) {
				item.addEventListener('click', function(ev) {
					ev.preventDefault();
					if(current !== 0) {
						$(contentItemsContainer).removeClass('content--show');
						$(gridItems[current-1]).addClass('grid__item--loading grid__item--animate');
						$(gridItems[current]).removeClass('grid__item--loading grid__item--animate');
						$(contentItems[current - 1]).addClass('content__item--show');
						$(contentItems[current]).removeClass('content__item--show');
						current = --current;	
						$.get('./jobs/job_'+ current+'.html?', function(respons) {
							$(currentItem).html(respons);
							//faz o efeito do proximo item
							$(currentItem).addClass( "content__item--show" );
							$(contentItemsContainer).addClass('content--show');
							previous();
							next();
						});		
					} else {
						//desabilitar o botao 
						$(item).addClass('disabled');
					}
					console.log("current é final é: "+current);
				})
			});
		};
		
		// body overlay
		$(bodyEl).addClass('view-single');
		var currentItem = $('article.content__item');
		$.get('./jobs/job_'+current+'.html?', function(respons) {
			
			$(currentItem).html(respons);// = $.parseHTML(respons);
			console.log(currentItem);			
			next();
			previous();
			
		});

		setTimeout(function() {
			// expands the placeholder
			dummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
			dummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
			// disallow scroll
			window.addEventListener('scroll', noscroll);
		}, 25);

		onEndTransition(dummy, function() {
			// add transition class 
			$(dummy).removeClass('placeholder--trans-in').addClass('placeholder--trans-out');
			// position the content container
			contentItemsContainer.style.top = scrollY() + 'px';

			// show the main content container
			$(contentItemsContainer).addClass('content--show');
			
			// show content item:
			$( currentItem ).addClass( "content__item--show" );
			
			// show close control
			$(closeCtrl).addClass('close-button--show');
			// sets overflow hidden to the body and allows the switch to the content scroll
			$(bodyEl).addClass('noscroll');

			isAnimating = false;
		});
	}

	function hideContent() {
		//var currentItem = $('#'+ --current);
		//var gridItem = gridItems[current], contentItem = contentItems[current];
		var gridItem = gridItems[current], contentItem = $('article.content__item');// contentItems[current];

		$(contentItem).removeClass('content__item--show');
		$(contentItemsContainer).removeClass('content--show');
		$(closeCtrl).removeClass('close-button--show');
		$(bodyEl).removeClass('view-single');
		

		setTimeout(function() {
			var dummy = gridItemsContainer.querySelector('.placeholder');
			$(bodyEl).removeClass('noscroll');

			dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
			dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';

			onEndTransition(dummy, function() {
				// reset content scroll..
				//contentItem.parentNode.scrollTop = 0;
				gridItemsContainer.removeChild(dummy);
				$(gridItem).removeClass('grid__item--loading grid__item--animate');
				lockScroll = false;
				window.removeEventListener( 'scroll', noscroll );
				/*remove todas as classes do site quando fecha, funciona quando não chama por ajax os jobs */
				/*[].slice.call(contentItems).forEach(function(item, pos) {
					current = pos;
					$(gridItem).removeClass('content__item--show');
					$(gridItem).removeClass('grid__item--loading grid__item--animate');
				})*/
			});
			// reset current
			current = -1;
		}, 300);
	}


	function noscroll() {
		if(!lockScroll) {
			lockScroll = true;
			xscroll = scrollX();
			yscroll = scrollY();
		}
		window.scrollTo(xscroll, yscroll);
	}

	init();

})();