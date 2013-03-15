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

/*
 Error message
*/
var error_message = {};
error_message.login = {
	title : "You need to sign in to Fastladder",
	body : "<p>" + "Please reload the browser and sign in again" + "</p>"
};
error_message.xmlhttp = {
	title : "Your browser is not supported by Fastladder",
	body : "<p>" + "Your browser is out of date.  (Please upgrade your browser.)" + "</p>"
};
error_message.busy = {
	title : "Failed to retrieve data.",
	body : "<p>" + "Our servers might be busy.  Please try again later." + "</p>"
};

var KeyHelpOrder = [
	[ 'read_next_subs', 'scroll_next_item', 'pin' ],
	[ 'read_prev_subs', 'scroll_prev_item', 'open_pin'],
	[ 'reload_subs',    'unsubscribe', 'view_original'],
	[ 'read_head_subs', 'scroll_next_page', 'feed_next'],
	[ 'read_end_subs', 'scroll_prev_page', 'feed_prev'],
	[ 'compact', 'toggle_leftpane', 'focus_findbox'],
	[ '', 'toggle_clip', 'instant_clip']
];

if(typeof Language != "undefined" && Language == 'English'){

setText({
	'flat'        : 'Flat',
	'folder'      : 'Folder',
	'rate'        : 'Rating',
	'subscribers' : 'Subscribers',
	'domain'      : 'Domain'
});

// sort
setText({
	'modified_on'          : 'New',
	'modified_on:reverse'  : 'Old',
	'unread_count'         : 'Unread items (desc.)',
	'unread_count:reverse' : 'Unread items (asc.)',
	'title:reverse'        : 'Title',
	'rate'                 : 'Rating',
	'subscribers_count'    : 'Subscribers (desc.)',
	'subscribers_count:reverse'  : 'Subscribers (asc.)'
});

// api
setText({
	'set_rate_complete'      : 'Rating have been changed.',
	'create_folder_complete' : 'I created folder',
	'print_discover_loading' : 'Finding a feed. Please wait.',
	'print_discover_notfound': 'I could not find a valid feed.'
});

setText({
	'prefetching'       : 'prefetching.',
	'prefetch_complete' : 'prefetching done.'
});

setText({
	'unread_count_tmpl': '[[feed_count]] feeds&nbsp;&nbsp;|&nbsp;&nbsp;[[count]] items',
	'unread_count_title_tmpl': "Fastladder ([[count]])",
	'mark_all_read_tmpl': " are you sure to mark [[count]] feeds as read?",
	'manage_unsubscribe_confirm_tmpl': 'Are you sure to remove [[ count ]] feed(s) from your subscription?',
	'manage_unsubscribe_progress_tmpl': 'Removing feeds: [[ remain ]] items to go',
	'manage_folder_delete_confirm': 'Are you sure to remove "[[folder]]"?  (Items inside won\'t be removed)',
	'show_all_help_message_tmpl': 'Show only updated feeds: [[ state ]]',
	'unsubscribe_confirm': 'Are you sure to remove [[title]] from your subscription?',
	'unsubscribe_confirm2': 'Are you sure to unsubscribe this feed?'
});

// errors
setText({
	'cannot_popup' : 'Please disable the pop up block for this domain to use this function.'
})

// menu
LDR_VARS.MenuItems = [
			{title:"Quick Guide", action:"init_guide()"},
			{title:"Settings", action:"init_config()"},
			{title:"Edit Subscription list", action:"init_manage()"},
			'-----',
			{title:"Expanded view / List view", action:"Control.compact()"},
			{title:"Toggle order", action:"Control.reverse()"},
			'-----',
			{title:"Mark all feeds as read", action:"Control.mark_all_read()"}
];

var KeyHelpOrder = [
	[ 'read_next_subs', 'scroll_next_item', 'pin' ],
	[ 'read_prev_subs', 'scroll_prev_item', 'open_pin'],
	[ 'reload_subs',    'unsubscribe', 'view_original'],
	[ 'read_head_subs', 'scroll_next_page', 'feed_next'],
	[ 'read_end_subs', 'scroll_prev_page', 'feed_prev'],
	[ 'compact', 'toggle_leftpane', 'focus_findbox']
];

} else {
// japanese resource

error_message.login = {
	title : "ログインしてください",
	body : "<p>" + "ブラウザをリロードして再度ログインしてください。" + "</p>"
};
error_message.xmlhttp = {
	title : "お使いのブラウザは動作対象外です",
	body : "<p>" + "ブラウザのバージョンが古いためご利用いただけません。" + "</p>"
};
error_message.busy = {
	title : "データの受信に失敗しました",
	body : "<p>" + "サーバーが混雑している可能性があります。<br>しばらく時間をおいてから再度アクセスしてください。" + "</p>"
};

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
	'print_discover_notfound': '登録可能なフィードが見つかりませんでした',
	'this is the last item' : '最後だよ',
	'End of feeds.  Press s to return to the top.' : "最後のフィードです。sキーで先頭に戻ります"
});

setText({
	'prefetching'       : '先読み中',
	'prefetch_complete' : '先読み完了',
	'Loading .. ' : 'ロード中',
	'Loading completed.' : 'ロード完了'
});

setText({
	'unread_count_tmpl': "未読 [[feed_count]]フィード&nbsp;&nbsp;|&nbsp;&nbsp;[[count]]エントリ",
	'unread_count_title_tmpl': "livedoor Reader ([[count]])",
	'mark_all_read_tmpl':	"[[count]]件のフィードを既読にします。よろしいですか？",
	'There is no item to mark as read':	'既読にすべきフィードがありません',
	'notice_ime_off': '※ショートカットキーが使えない場合は日本語入力を無効にしてみてください。',
	'manage_unsubscribe_confirm_tmpl': "[[ count ]]件のフィードの登録を解除します。よろしいですか？",
	'manage_unsubscribe_progress_tmpl': "フィードを削除しています:残り[[remain]]件",
	'manage_folder_delete_confirm': "[[folder]]を削除してよろしいですか？(中のアイテムは削除されません)",
	'unsubscribe_confirm': 	"「[[title]]」の登録を解除しますか？",
	'unsubscribe_confirm2': "登録を解除しますか？"
});

setText({
	'Unknown date' : "日時不明"
});


// errors
setText({
	'cannot_popup' : 'この機能を使うにはポップアップブロックを解除してください。'
})

// keyboard help
setText({
	'close' : '閉じる',
	'more' : 'もっと表示',
	'compact' : '隠す',
	'show in window' : '別ウィンドウで開く'
});

setText({
	'Now saving': '変更を保存しています',
	'Wait a minutes' : 'しばらくお待ち下さい',
	'Public' : '公開',
	'Private': '非公開',
	'leave it uncategorized' : '未分類',
	'uncategorized' : '未分類',
	'New Folder Name': '新しいフォルダ名を入力してください'
});


LDR_VARS.MenuItems = [
			{title:"livedoor Reader Guide", action:"init_guide()"},
			{title:"設定変更", action:"init_config()"},
			{title:"フィードの整理", action:"init_manage()"},
			'-----',
			{title:"本文の表示 / 非表示の切替", action:"Control.compact()"},
			{title:"新着順 / 旧着順表示の切替", action:"Control.reverse()"},
			'-----',
			{title:"全て読んだことにする", action:"Control.mark_all_read()"}
];

}

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


if(typeof Language != "undefined" && Language == 'English'){
	var KeyHelp = {
		 'scroll_next_item' : 'Next item',
		 'scroll_prev_item' : 'Previous item',
		 'scroll_next_page' : 'Scroll down',
		 'scroll_prev_page' : 'Scroll up',
		 'feed_next'        : 'Older items',
		 'feed_prev'        : 'Newer items',
		 'view_original'    : 'Open item',
		 'pin'              : 'Pin',
		 'open_pin'         : 'Open pinned items',
		 'toggle_clip'      : 'Bookmark',
		 'instant_clip'     : 'Quick bookmark',
		 'compact'          : 'Collapse/Expand item',
		 'unsubscribe'      : 'Unsubscribe',
		 'reload_subs'      : 'Reload left pane',
		 'toggle_leftpane'  : 'Collapse/Expand left pane',
		 'focus_findbox'    : 'Focus on search box',
		 'read_next_subs'   : 'Next feed',
		 'read_prev_subs'   : 'Previous feed',
		 'read_head_subs'   : 'Move to the top of unread feed',
		 'read_end_subs'    : 'Move to the bottom of unread feed',
		 'toggle_keyhelp'   : 'Open this menu'
	};

} else {
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
}
