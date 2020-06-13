$(function () {
	/*
		modalを開く
	*/
	var $modal = $("#modal"),
		$btnOpenList = $(".modal_link"),
		$btnClose = $("#modalClose, #closeArea"),
		$modalBg = $("#modalBg"),
		$modalContent = $("#modalContent"),
		$modalContentInner = $("#modalContentInner"),
		$modalItems = $modalContentInner.find(".article_list li"),
		$index = undefined,
		$modalArrow = $modalContentInner.find(".modal_arrow a"),
		current = 0;

	//バインド
	$btnOpenList.on("mousedown", openModal);
	$btnClose.on("click", closeModal);
	$modalBg.on("click", closeModal);
	$modalArrow.on("click", changeModal);

	//Modal表示
	function openModal(e) {
		var index = $(this).data("index");
		if (index != undefined) {
			$index = $("#index" + index);
			$index.removeClass("remove");
			if ($index.find("li").length > 0) {
				$modalItems = $index.find("li");
			}
		}
		var seq = $(this).data("seq");
		if (seq != undefined) {
			current = seq - 1;
			$($modalItems[current]).addClass("show");
		}

		var movie = $(this).data('movie');
		if (movie != undefined) {
			$modalContentInner.find('.youtube > iframe').attr('src', movie);
		}

		//モーダル表示
		$modal.show().css({
			opacity: 0
		});
		$modalBg.show();
		var st = $(window).scrollTop(),
			wh = $(window).height(),
			mh = $("#modalContent").height(),
			mt;
		if (wh > mh) {
			mt = $(window).scrollTop() + (($(window).height() / 2) - ($("#modalContent").height() / 2)) - 40;
		} else {
			mt = $(window).scrollTop() + 20;
		}
		$modal.css({
			top: mt + "px"
		});
		//フェードイン
		$modal.stop(true, false).animate({
			opacity: 1
		}, 300, "easeOutCubic");
		$modalBg.stop(true, false).animate({
			opacity: 0.7
		}, 300, "easeOutCubic");

		return (false);
	}

	//Modal閉じる
	function closeModal(e) {
		e.preventDefault();
		$modal.stop(true, false).animate({
			opacity: 0
		}, 300, "easeOutCubic", function () {
			$(this).hide();
			$modalItems.removeClass("show");
			if ($index != undefined) {
				$index.addClass("remove")
			}
		});
		//モーダル背景
		$modalBg.stop(true, false).animate({
			opacity: 0
		}, 300, "easeOutCubic", function () {
			$(this).hide()
		});

		return false;
	}

	//Modal表示変更
	function changeModal(e) {
		e.preventDefault();
		var dir = $(this).parent().data("direction");
		$($modalItems[current]).removeClass("show");
		current = current + ((dir == "right") - (dir == "left"));
		if (current == 10) {
			current = 0;
		} else if (current == -1) {
			current = 9;
		}
		$($modalItems[current]).addClass("show");
	}
});