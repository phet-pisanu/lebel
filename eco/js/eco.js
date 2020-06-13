$(function () {
	//accordion
	var isOpen = false;
	$('.accordion_area').each(
		function () {
			$(this).hide();
		}
	);
	$('.accordion_link li > a').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).next('.accordion_area').slideToggle();
		var num = $('.accordion_link li > a.active').length;

		if (num == 1 && isOpen == false) {
			$('.content > .image_list').hide();
			$(this).parents('.accordion_link').find('.toggle').toggleClass('off');
			isOpen = true;
		} else if (num == 0 && isOpen == true) {
			$('.content > .image_list').show();
			$(this).parents('.accordion_link').find('.toggle').toggleClass('off');
			isOpen = false;
		}

		return (false);
	})

	/**
	 * 内部リンクの処理
	 *
	 */
	$("#sideGlobalMenu .main_menu a[href^='#']").click(function () {

		// アンカーの値取得
		var href = $(this).attr("href");

		$("html,body").animate({
			scrollTop: $(href).offset().top - 100
		}, 600);

		return false;

	});

});