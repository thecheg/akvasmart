/*! Collapsable blocks */
function collapseInit(coll) {
	var collPrefix = 'ui-collapse',
		hidd = coll.find('.' + collPrefix + '__hidden'),
		trig = coll.find('.' + collPrefix + '__trigger'),
		trigText = trig.find('.' + collPrefix + '__trigger-text'),
		closedText = trig.attr('data-closed-text'),
		openedText = trig.attr('data-opened-text');

	trigText.text(closedText);

	trig.on('click', function () {
		if (!coll.hasClass('active')) {
			coll.addClass('active');
			hidd.slideDown(400);
			trigText.text(openedText);
		} else {
			//var collPos = coll.offset().top - scrollOffset - 30;
			//$('html, body').animate({scrollTop:collPos},500);
			coll.removeClass('active');
			hidd.slideUp(400);
			trigText.text(closedText);
		}
	});
}