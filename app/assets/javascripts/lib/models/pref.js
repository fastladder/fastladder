(function(){
	LDR.VARS = {
		LeftpaneWidth   : 250, // マイフィードの幅
		DefaultPrefetch : 2,   // デフォルトの先読み件数
		MaxPrefetch     : 5,   // 最大先読み件数
		PrintFeedFirstNum : 3, // 初回に描画する件数
		PrintFeedDelay  : 500, // 2件目以降を描画するまでの待ち時間
		PrintFeedDelay2 : 100, // 21件目以降を描画するまでの待ち時間
		PrintFeedNum    : 20,  // 一度に描画する件数
		SubsLimit1      : 100, // 初回にロードするSubsの件数
		SubsLimit2      : 200, // 二回目以降にロードするSubsの件数
		ViewModes : ['flat','folder','rate','subscribers']
	};

	LDR.KeyHelpOrder = [
		[ 'read_next_subs', 'scroll_next_item', 'pin' ],
		[ 'read_prev_subs', 'scroll_prev_item', 'open_pin'],
		[ 'reload_subs',    'unsubscribe', 'view_original'],
		[ 'read_head_subs', 'scroll_next_page', 'feed_next'],
		[ 'read_end_subs', 'scroll_prev_page', 'feed_prev'],
		[ 'compact', 'toggle_leftpane', 'focus_findbox'],
	];

	LDR.DefaultConfig = {
		current_font   : 14,
		use_autoreload : 0,
		autoreload     : 60,
		view_mode      : 'folder',
		sort_mode      : 'modified_on',
		touch_when     : 'onload',
		reverse_mode   : false,
		keep_new       : false,
		show_all       : true,
		max_pin        : 5,
		prefetch_num   : 2,
		use_wait       : false,
		scroll_type    : 'px',
		scroll_px      : 100,
		limit_subs     : 100,
		use_pinsaver   : 1,
		use_prefetch_hack : false,
		use_scroll_hilight: 0,
		use_instant_clip : -1,
		use_inline_clip : 1,
		use_custom_clip : "off",
		use_clip_public : "on",
		use_limit_subs : 0,
		clip_tags : "",
		instant_clip_tags : "",
		use_instant_clip_public : "on",
		use_clip_ratecopy : 1,
		use_instant_clip_ratecopy : 1,
		default_public_status : 1
	};

	LDR.TypeofConfig = {
		keep_new       : 'Boolean',
		show_all       : 'Boolean',
		use_autoreload : 'Boolean',
		use_wait       : 'Boolean',
		use_pinsaver   : 'Boolean',
		use_scroll_hilight: 'Boolean',
		use_prefetch_hack : 'Boolean',
		use_clip_ratecopy : 'Boolean',
		use_instant_clip_ratecopy : 'Boolean',
		reverse_mode   : 'Boolean',
		use_inline_clip : 'Boolean',
		use_limit_subs  : 'Boolean',
		default_public_status : 'Boolean',
		current_font   : 'Number',
		autoreload     : 'Number',
		scroll_px      : 'Number',
		wait           : 'Number',
		max_pin        : 'Number',
		max_view       : 'Number',
		items_per_page : 'Number',
		prefetch_num   : 'Number',
		use_instant_clip : 'Number',
		limit_subs     : 'Number',
		view_mode      : 'String',
		sort_mode      : 'String',
		touch_when     : 'String',
		scroll_type    : 'String'
	};

	LDR.KeyConfig = {
		 'read_next_subs'   : 's|shift+ctrl|shift+down',
		 'read_prev_subs'   : 'a|ctrl+shift|shift+up',
		 'read_head_subs'   : 'w|shift+home',
		 'read_end_subs'    : 'W|shift+end',
		 'feed_next'        : '>|J',
		 'feed_prev'        : '<|K',
		 'reload_subs'      : 'r',
		 'scroll_next_page' : 'space|pagedown',
		 'scroll_prev_page' : 'shift+space|pageup',
		 'pin'              : 'p',
		 'open_pin'         : 'o',
		 'view_original'    : 'v|ctrl+enter',
		 'scroll_next_item' : 'j|enter',
		 'scroll_prev_item' : 'k|shift+enter',
		 'compact'          : 'c',
		 'focus_findbox'    : 'f',
		 'blur_findbox'     : 'esc',
		 'unsubscribe'      : 'delete',
		 'toggle_leftpane'  : 'z',
		 'toggle_fullscreen': 'Z',
		 'toggle_keyhelp'   : '?'
	};

	LDR.KeyHelp = (function() {
		var options = {scope: "key_help"};
		return {
			'scroll_next_item' : "Next item",
			'scroll_prev_item' : "Previous item",
			'scroll_next_page' : "Scroll down",
			'scroll_prev_page' : "Scroll up",
			'feed_next'        : "Older items",
			'feed_prev'        : "Newer items",
			'view_original'    : "Open item",
			'pin'              : "Pin",
			'open_pin'         : "Open pinned items",
			'toggle_clip'      : "Bookmark",
			'instant_clip'     : "Quick bookmark",
			'compact'          : "Collapse/Expand item",
			'unsubscribe'      : "Unsubscribe",
			'reload_subs'      : "Reload left pane",
			'toggle_leftpane'  : "Colapse/Expand left pane",
			'focus_findbox'    : "Focus to search box",
			'read_next_subs'   : "Next feed",
			'read_prev_subs'   : "Previous feed",
			'read_head_subs'   : "Move to the top of unread feed",
			'read_end_subs'    : "Move to the bottom of unread feed",
			'toggle_keyhelp'   : "Open this menu",
		};
	})();

	// menu
	var options = {scope: "menu_items"};
	LDR.VARS.MenuItems = [
		{title: "Quick Guide", action:"init_guide()"},
		{title: "Settings", action:"init_config()"},
		{title: "Edit Subscription list", action:"init_manage()"},
		'-----',
		{title: "Expanded view / List view", action:"Control.compact()"},
		{title: "Toggle order", action:"Control.reverse()"},
		'-----',
		{title: "Mark all feeds as read", action:"Control.mark_all_read()"}
	];
}).call(LDR);


