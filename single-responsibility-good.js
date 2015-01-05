/* More verbose, but could easily support reuse and customization via config parameters.
 This version is easy to build on, modify, and write tests against. */
 
var selectableMgr = {

	selectorAttr: 'data-type',
	controlSelector: '.type-selector',
	areaSelector: '.selectable',
	activeClass: 'active',

	init: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		var that = this;
		jQuery(this.controlSelector).on('click', function() {
			that.handleSelectorClick.call(that, this);
		});
	},

	handleSelectorClick: function(clicked) {
		this.setActive(clicked);
		this.deselectAll();
		this.selectActive();
	},

	setActive: function(clicked) {
		var selectedType;
		if (typeof clicked !== 'object' || !clicked) {
			return;
		}
		selectedType = jQuery(clicked).attr(this.selectorAttr);
		this.active = selectedType;
	},

	deselectAll: function() {
		jQuery(this.areaSelector).removeClass(this.activeClass);
	},

	selectActive: function() {
		jQuery('.' + this.active).addClass(this.activeClass);
	}

}

selectableMgr.init();