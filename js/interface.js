$('#scrollspy-nav .nav-link').on('click', function (e) {
	console.log(e)
	var anchor = $(this);
	$('html, body').stop().animate({
		scrollTop: $(anchor.attr('href')).offset().top - 0
	}, 1000, "easeInSine");
	e.preventDefault();
});
	
	function contactForm(){
		if ($('.js-ajax-form').length) {
			$('.js-ajax-form').each(function(){
				$(this).validate({
					errorClass: 'error wobble-error',
					submitHandler: function(form){
						$.ajax({
							type: "POST",
							url:"https://formspree.io/f/mnqwropn",
							data: $(form).serialize(),
							crossDomain: true,
							success: function() {
								$('.modal').modal('hide');
								$('#success').modal('show');
							},
	
							error: function(){
								$('.modal').modal('hide');
								$('#error').modal('show');
							}
						});
					}
				});
			});
		}
	}

	function testimonials(){
		$.getJSON('data/testimonials.json', function(res){
			res[0]['testimonials'].forEach(ele => {
				$('.review-carousel').append(`
					<div class="review">
					  <div class="row m-0 text-center d-flex justify-content-center align-items-center">
						  <div class="review-img bg-white">
							<img alt="" class="img-circle" src="${ele['client_image']}">
						</div>
						
						<div class="col text-dark">
						  <p class="small mb-0">${ele['client_feedback']}</p>
						  <h6 class="text-end small mb-0 mt-2">- ${ele['client_name']}</h6>
						</div>
					  </div>
					</div>
			`)
			});
			res[0]['recog'].forEach(ele => {
				$('.recog-carousel').append(`
					<div class="review">
					  <div class="row m-0 text-center d-flex justify-content-center align-items-center">
						  
						<div class="col text-dark">
						  
						  <p class="text-start small mb-0">${ele['desc']}</p>
						  <h6 class="text-end h6 mb-0"><strong>- ${ele['org']}</strong></h6>
						</div>
					  </div>
					</div>
			`)
			});
			$(".review-carousel, .recog-carousel").owlCarousel({
				animateOut : 'slideOutDown',
				animateIn : 'flipInX',
				singleItem : true,
				autoHeight : true
			});
			
		})
	}

	function aboutConstruct(){
		var aboutData = [
			{'id': 'exp', 'title': 'Experience', 'size': 1, color: 'rgba(217, 0, 172, 0.8)', 'top': '0px'},
			{'id': 'bio', 'title': 'Bio', 'size': 0.8, color: 'rgba(0, 14, 179, 0.8)', 'top': '40px'},
			{'id': 'skills', 'title': 'Skills', 'size': 1, color : 'rgba(0, 233, 233, 0.5)', 'top': '60px'},
			{'id': 'hobbies', 'title': 'Interests', 'size': 0.6, color: 'rgba(255, 212, 0, 0.5)', 'top': '10px'}
		]
		aboutData.forEach(obj => {
			$('#area').append(`
			<div class="about-sec-title text-uppercase text-center text-white px-3 mx-2 mb-0 d-flex align-items-center position-relative" id="${obj.id}" style="background-color: ${obj.color}; margin-top: ${obj.top}">
				<h1 class="m-0">${obj.title}</h1>
				<div id="${obj.id}_child" style="display:none" class="flex-grow-1 about_childs">
					<div class="default_close position-absolute top-0 end-0 p-4">X</div>
				</div>
			</div>
			`)
		});

		$('.default_close').click(function(e){
			$('.about-sec-title').removeClass('flex-grow-1')
			$('.about_childs').hide()
			e.stopPropagation();
		})

		$('.about-sec-title').click(function(){
			$('.about-sec-title').removeClass('flex-grow-1')
			$('.about_childs').hide()
			$(this).addClass('flex-grow-1')
			$(this).children(`#${$(this).attr('id')}_child`).show()
			if($(this).attr('id') == 'exp'){
				$.getJSON('data/experience.json').then(res => {
					res.forEach(o => {
						o['start'] = new Date(o['start'])
						o['end'] = o['end'] == 'present' ? new Date() : new Date(o['end'])
					});
					draw_exp_chart(res)
				})
			}
		})
	}

	function portfolioConstruct(){
		var data = [
			{id: '1', imgUrl: 'img/portfolio/promotel.png', title: 'Strengthening Start Up..', desc: 'Promotel is a digital marketing agency, was ready to launch and needed an online presence for their startup. Developed a simple website to provide user a quick insight of their services and work done which would eventually make users opt their services.', link: 'https://www.promotel.in/'},
			{id: '2', imgUrl: 'img/portfolio/petswonder.png', title: 'Pet Store Online Ordering...', desc: 'Petswonder is an established local pet store business, however missed online ordering and was confined to offline sales only. Provided the client with cost effective solution to for their online ordering.', link: 'https://www.promotel.in/'},
			{id: '3', imgUrl: 'img/portfolio/rotary.png', title: 'Contribution to NGO firm..', desc: 'Trust Rotary is a regional branch of well known Rotary Foundation. Built a simple informative website for their online presence.', link: 'https://www.promotel.in/'},
			{id: '4', imgUrl: 'img/portfolio/ridge.png', title: 'One Page Infra..', desc: 'Ridge Sports Infra is well established team that creates most initiative and well-built courts for sportsmen. Gathered and organized all the information in a one page website suitable for their needs.', link: 'https://www.promotel.in/'}
		]

		data.forEach((obj, i) => {
			$('#portfolio-indicators').append(`
				<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="bg-dark rounded-circle ${i == 0 ? 'active' : ''}" aria-current="true"></button>
			`)
			$('#portfolio-items').append(`
				<div class="carousel-item bg-white rounded ${i == 0 ? 'active' : ''} shadow">
					<div class="row align-items-center">
						<div class="col-md-6 text-center" data-animation="animated fadeInLeft">
							<div class=" mx-auto p-3">
								<img src="${obj.imgUrl}" class="img-responsive py-4">
							</div>
						</div>
						<div class="col-md-6" data-animation="animated fadeInRight">
							<div class="px-4">
								<h2>${obj.title}</h2>
								<p>${obj.desc}</p>
								<a href="${obj.link}" target="blank">View Project</a>
							</div>
						</div>
					
					</div>
				</div>
			`)
		});

		function doAnimations(elems) {
			

			var animEndEv = 'webkitAnimationEnd animationend';
		  
			elems.each(function () {
			  var $this = $(this),
				  $animationType = $this.data('animation');
		  
			  $this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			  });
			});
		  }

		  var $myCarousel = $('#carouselExampleIndicators');
		  
		  var $firstAnimatingElems = $myCarousel.find('.carousel-item:first')
			.find('[data-animation ^= "animated"]');
		  
		  doAnimations($firstAnimatingElems);
		  
		  $myCarousel.on('slide.bs.carousel', function (e) {
			var $animatingElems = $(e.relatedTarget)
			  .find("[data-animation ^= 'animated']");
			doAnimations($animatingElems);
		  });
	}

	// contactForm()
	testimonials()
	// aboutConstruct()
	portfolioConstruct()

	function draw_exp_chart(data){
		$('#exp_child svg').remove()
		const svg = d3.select('#exp_child').append('svg').attr('height', '500px').attr('width', '100%');
			width = $('#exp_child svg').width()
			height=500
			margin = ({top: 80, right: 80, bottom: 80, left: 80})

			x = d3.scaleTime()
		.domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
		.range([margin.left, width - margin.right])

		console.log([d3.min(data, d => d.start), d3.max(data, d => d.end)])

		y = d3.scaleBand()
		// .domain(data.map(d => d.start))
		.range([height - margin.bottom, margin.top])
		.padding(0.1)

		xAxis = g => g
		.attr("transform", `translate(0,${height - margin.bottom})`)
		.call(d3.axisBottom(x)
			.tickSizeOuter(0))

		yAxis = g => g
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(y))
		.call(g => g.select(".domain").remove())


			svg.append("g")
			.attr("fill", "steelblue")
			.selectAll("rect").data(data).enter()
			.append("rect")
			.attr("x", d => x(d.start))
			.attr("y", height - margin.bottom - margin.bottom/2)
			.attr("height", margin.bottom/2)
			.attr("width", d => x(d.end) - x(d.start))
			
		
			svg.append('g')
			.selectAll("text").data(data).enter()
			.append('text')
			.html(d => d.role)
			.attr("x", d => x(d.start))
			.attr("y", height - margin.bottom - margin.bottom/2 + 20) 
			.attr('font-size', '11px')
			
		
			svg.append("g")
				.call(xAxis);
			
			svg.append("g")
				.call(yAxis);
			
			return svg.node();
		// })
	}


	


// })(jQuery);
