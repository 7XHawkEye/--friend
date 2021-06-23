// var swiper = new Swiper('.blog-slider', {
//     spaceBetween: 30,
//     effect: 'fade',
//     loop: true,
//     mousewheel: {
//       invert: false,
//     },
//     // autoHeight: true,
//     pagination: {
//       el: '.blog-slider__pagination',
//       clickable: true,
//     }
//   });

$(window).on("hashchange", function(){
	if(location.hash.slice(1)=="login"){
		$(".card").addClass("extend");
		$("#register").removeClass("selected");
		$("#login").addClass("selected");
	} else {
		$(".card").removeClass("extend");
		$("#register").addClass("selected");
		$("#login").removeClass("selected");
	}
});
$(window).trigger("hashchange");