$(document).ready(function(){

	function updatePointsAndBoxes(){
		var points = $(".occupied").length;
		$("#points").text(points);
		$(".header_border div").removeClass('background');
		$(".header_border div").slice(0, points).addClass('background');
	}

	function handleWildcard(elem){
		var slot = elem.find('img').first();
		var item = slot.attr('id');
		var openSlot = $(".wildcards_list .itemSlot:not(.occupied)").first().attr('id');
		var wildcard, modal;

		item = item.replace('slot', '');
		//Yay if statements...
		if(item.indexOf("streak4")>-1){
			wildcard = $(".itemSelect[data-item='streaker']");
			modal = wildcard.parents('.modal');
			modal.attr("data-slot", openSlot);
			wildcard.trigger('click');
		}
	}

	$(".itemSwitch").on('click', function() {
		var targetSlot;
		if ($(this).hasClass('modSwitch')){
			targetSlot = $(this).find('img').attr('id');
		} else {
			targetSlot = $(this).parent().siblings('img').attr('id');
		}
		var modal = $($(this).attr('data-target'));
		modal.attr("data-slot", targetSlot);
	});

	$(".itemSelect").on('click', function() {
		var modal = $(this).parents('.modal');
		var targetSlot = $("#"+modal.attr("data-slot"));
		var url = $(this).find("img").attr("src");
		modal.modal("hide");
		targetSlot.attr('src', url)
		targetSlot.attr('data-item', $(this).attr('data-item'));

		//Extra stuff for setting the streak mods popup
		if($(this).hasClass('streakSelect')){
			targetSlot.parents('.strek_detail').find('.streak_mods a').attr('data-target', $(this).attr('data-popup'));
		}
		if(targetSlot.parents('.featured').length){
			handleWildcard(targetSlot.parents('.featured'));
		}
		if(!$(this).hasClass('noPoints')){
			targetSlot.addClass('occupied');
			updatePointsAndBoxes();
		}
		return false;
	});

	$(".close-modal").on("click", function() {
		$(this).parents('.modal').modal("hide");
	});
});
