if(typeof Language != "undefined" && Language == 'English'){

setText({
	'flat'        : 'Flat',
	'folder'      : 'Folder',
	'rate'        : 'Rate',
	'subscribers' : 'Subscribers',
	'domain'      : 'Domain'
});

// sort
setText({
	'modified_on'          : 'By Recency',
	'modified_on:reverse'  : 'By Age',
	'unread_count'         : 'Many unreads',
	'unread_count:reverse' : 'Less unread',
	'title:reverse'        : 'By Title',
	'rate'                 : 'By Rate',
	'subscribers_count'    : 'Many subscribers',
	'subscribers_count:reverse'  : 'Less subscribers'
});

// api
setText({
	'set_rate_complete'      : 'change rate',
	'create_folder_complete' : 'I created folder',
	'print_discover_loading' : 'I am looking for feed. Please wait a little.',
	'print_discover_notfound': 'Umm. I can not find valid feed.'
});

setText({
	'prefetching'       : 'prefetching.',
	'prefetch_complete' : 'prefetching done.'
});

// errors
setText({
	'cannot_popup' : 'Please disable the pop up block for this domain to use this function.'
})

} else {
// japanese resource
// mode
setText({
	'flat'        : 'フラット',
	'folder'      : 'フォルダ',
	'rate'        : 'レート',
	'subscribers' : '購読者数',
	'domain'      : 'ドメイン'
});

// sort
setText({
	'modified_on'          : '新着順',
	'modified_on:reverse'  : '旧着順',
	'unread_count'         : '未読が多い',
	'unread_count:reverse' : '未読が少ない',
	'title:reverse'        : 'タイトル',
	'rate'                 : 'レート',
	'subscribers_count'    : '読者が多い',
	'subscribers_count:reverse'  : '読者が少ない'
});

// api
setText({
	'set_rate_complete'      : 'レートを変更しました',
	'create_folder_complete' : 'フォルダを作成しました',
	'print_discover_loading' : 'フィードを探しています',
	'print_discover_notfound': '登録可能なフィードが見つかりませんでした'
});

setText({
	'prefetching'       : '先読み中',
	'prefetch_complete' : '先読み完了'
});

// errors
setText({
	'cannot_popup' : 'この機能を使うにはポップアップブロックを解除してください。'
})

// keyboard help
setText({
	'close' : '閉じる',
	'show more' : 'もっと表示',
	'hide' : '隠す',
	'open in window' : '別ウィンドウで開く'
});
}

/*
 system default
*/
var LDR_VARS = {
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

var DefaultConfig = {
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

var TypeofConfig = {
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

var KeyConfig = {
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

var KeyHelp = {
	 'scroll_next_item' : '次のアイテム',
	 'scroll_prev_item' : '前のアイテム',
	 'scroll_next_page' : '下にスクロール',
	 'scroll_prev_page' : '上にスクロール',
	 'feed_next'        : '過去の記事に移動',
	 'feed_prev'        : '未来の記事に移動',
	 'view_original'    : '元記事を開く',
	 'pin'              : 'ピンを付ける / 外す',
	 'open_pin'         : 'ピンを開く',
	 'toggle_clip'      : 'クリップボタン',
	 'instant_clip'     : '一発クリップ',
	 'compact'          : '本文の表示 / 非表示',
	 'unsubscribe'      : '購読停止',
	 'reload_subs'      : 'フィード一覧の更新',
	 'toggle_leftpane'  : 'マイフィードを畳む / 戻す',
	 'focus_findbox'    : '検索ボックスに移動',
	 'read_next_subs'   : '次のフィードに移動',
	 'read_prev_subs'   : '前のフィードに移動',
	 'read_head_subs'   : '最初の未読に移動',
	 'read_end_subs'    : '最後の未読に移動',
	 'toggle_keyhelp'   : 'ヘルプを表示 / 非表示'
};

var KeyHelpOrder = [
	[ 'read_next_subs', 'scroll_next_item', 'pin' ],
	[ 'read_prev_subs', 'scroll_prev_item', 'open_pin'],
	[ 'reload_subs',    'unsubscribe', 'view_original'],
	[ 'compact', 'scroll_next_page', 'feed_next'],
	[ '', 'scroll_prev_page', 'feed_prev'],
	[ '', 'toggle_leftpane', 'focus_findbox'],
	[ '', 'toggle_clip', 'instant_clip']
];
