function MyTabManager(config) {
	this._handleConfig(config);
	this._bindHandlers();
}

MyTabManager.prototype = {

	defaults: {
		tabClass: 'my-tab';
		activeTabClass: 'my-tab-active';
		activeContentClass: 'my-tab-content-active';
		inactiveContentClass: 'my-tab-content-inactive';
		tabTargetAttrName: 'data-target';
		jQuery: null
	},

	_handleConfig: function(config) {
		this.tabClass = config.tabClass || this.defaults.tabClass;
		this.activeTabClass = config.activeTabClass || this.defaults.activeTabClass;
		this.activeContentClass = config.activeContentClass || this.defaults.activeContentClass;
		this.inactiveContentClass = config.inactiveContentClass || this.defaults.inactiveContentClass;
		this.jQuery = config.jQuery || this.defaults.jQuery;
	},

	_bindHandlers: function() {
		var that = this;

		this.jQuery( '.' + this.tabClass ).on('click', function() {
			that.handleTabClick.call(that, this);
		});
	},

	handleTabClick: function(tabEl) {
		var $tabEl, $targetEl;

		if (typeof tabEl !== 'object' || !tabEl) {
			console.log('invalid tab element provided to click handler.');
			return;
		}

		this.deactivateTabs();

		$tabEl = this.jQuery(tabEl);
		this.activeTabEl = $tabEl;

		this.activateActiveTab();

		$targetEl = this._getTargetElement();
		if (!$targetEl) {
			return;
		}

		this.hideInactiveTabContent();
		this.showActiveTabContent();
	},

	deactivateTabs: function() {
		this.jQuery( this.activeTabClass ).removeClass( this.activeTabClass );
	},

	_getTargetElement: function() {
		var targetElSelector, $targetEl;

		targetElSelector = this.activeTabEl.attr(this.tabTargetAttrName);
		if (!targetElSelector) {
			console.log('could not identify tab content');
			return null;
		}

		$targetEl = this.jQuery(targetElSelector);
		if ($targetEl.length === 0) {
			console.log('Could not find tab content in dom.');
			return null;
		}

		this.activeTabContentEl = $targeEl;
		return $targetEl;
	},

	activateActiveTab: function() {
		this.activeTabEl.addClass( this.activeTabClass );
	}

	hideInactiveTabContent: function() {
		this.jQuery( this.activeContentClass ).removeClass( this.activeContentClass ).addClass( this.inactiveContentClass );
	}

	showActiveTabContent: function() {
		this.activeTabContentEl.addClass( this.activeContentClass );
	}

}

// somewhere else in your js

// this one changes the class that will be used to identify tab elements
var homepageTabs = new MyTabManager({
	tabClass: 'my-homepage-tab'
});

// this one uses default config
var subSectionTabs = new MyTabManager({});
