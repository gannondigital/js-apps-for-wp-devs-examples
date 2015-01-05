/* Concise, but hard to modify/extend/reuse/test.

 (In reality, something as simple as this might be ok. 
 But you never know when that simple code you wrote might
 need to be modified/extended/reused...) */
jQuery('.type-selector').on('click', function() {
	
	var selectedType = jQuery(this).attr('data-type');
	if (selectedType) {
		jQuery('.selectable').removeClass('active').hide();
		jQuery('.' + selectedType)addClass('active').show();
	}

});