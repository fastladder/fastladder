/*
 reader widgets
*/
function setup_widgets(){
	channel_widgets.sep = "&nbsp;&nbsp;|&nbsp;&nbsp;"
	entry_widgets.sep = "";

	entry_widgets.add('created_on', function(feed, item){
		return '投稿: ' + new DateTime(item.created_on * 1000).toString();
	});

	entry_widgets.add('modified_on', function(feed, item){
		if(item.created_on == item.modified_on) return;
		return '更新: ' + new DateTime(item.modified_on * 1000).toString();
	});

	entry_widgets.add('subs_button', function(feed, item){
		var channel_domain = get_domain(feed.channel.link);
		var subs_button = function(url){
			return '<a href="' + url + '" rel="discover">登録</a>';
		};
		return (channel_domain != get_domain(item.link)) ? subs_button(item.link) : "";
	});

	channel_widgets.add('offset', function(feed, items){
		var subscribe_id = feed.subscribe_id;
		var info = subs_item(subscribe_id);
		var size = items.length;
		var range,range_text;
		if(app.state.viewrange.start == 0){
			range_text = "新着";
			range = ""
		} else {
			range_text = "過去";
			range = (app.state.viewrange.start + 1) + "-" + app.state.viewrange.end;
		}
		return	[
			'<span style="background:url(\'',info.icon,'\') no-repeat 0 0;padding-left:22px">',
			,range_text,': ',range,
			,' <span class="num"><span id="scroll_offset"></span>',size,'</span> entry</span>'
		].join("");
	});

	channel_widgets.add('subscriber', function(feed){
		return [
			'<span class="subscriber" style="background:url(\'/img/icon/subscriber.gif\') no-repeat 0 0;padding-left:22px">',
			'<span class="num">', feed.channel.subscribers_count, '</span> users</span>'
		].join("");
	});

	channel_widgets.add('about', function(feed, items){
		return '<a href="/about/'+feed.channel.feedlink+'" style="background-image:url(/img/icon/about.gif);background-position:0 0;background-repeat:no-repeat;padding:0 0 4px 20px;">フィード詳細</a>';
	});

	channel_widgets.add('touch_button', function(feed){
		if(app.config.touch_when != "manual") return;
		return [
			"<span class='button' onclick='touch_all(\"",feed.subscribe_id,"\")'>既読にする</span>"
		].join("");
	});

}
setup_widgets();
/* just a example:
	entry_widgets.add('clip_counter', function(feed, item){
		var link = item.link.replace(/#/g,'%23');
		var link_encoded = encodeURIComponent(item.link);
		var tmpl = [
			'http://clip.livedoor.com/clip/add?',
			'mode=confirm&title=[[title]]&link=[[url]]&tags=[[tags]]&public=[[public]]'
		].join("");
		var add_link = tmpl.fill({
			url   : encodeURIComponent(item.link.unescapeHTML()),
			title : encodeURIComponent(item.title.unescapeHTML()),
			tags  : app.config.clip_tags,
			"public" : app.config.use_clip_public
		});
		return [
			'<a href="', add_link, '">','<img src="http://parts.blog.livedoor.jp/img/cmn/clip_16_12_w.gif" border=0></a>',
			'<a href="http://clip.livedoor.com/page/', link, '">',
			'<img style="border:none;margin-left:3px" ',
			'src="http://image.clip.livedoor.com/counter/', link, '">','</a>'
		].join('');
	});

	entry_widgets.add('hb_counter', function(feed, item){
		var link = item.link.replace(/#/g,'%23');
		return [
			'<a href="http://b.hatena.ne.jp/entry/', link, '">',
			'<img src="http://d.hatena.ne.jp/images/b_entry.gif" border=0><img style="border:none;margin-left:3px;" ',
			'src="http://b.hatena.ne.jp/entry/image/',link, '"></a>'
		].join('');
	}, 'はてなブックマークにブックマークされている件数です');

	channel_widgets.add('feedlink', function(feed, items){
		return '<a href="'+feed.channel.feedlink+'"><img src="/img/icon/feed.gif" border=0 style="vertival-align:middle"></a>';
	});

	channel_widgets.add('hb_counter', function(feed){
		return [
			'<a href="http://b.hatena.ne.jp/entrylist?url=', feed.channel.link, '">',
			'<img style="vertical-align:middle;border:none;" src="http://b.hatena.ne.jp/bc/', feed.channel.link, '">',
			'</a>'
		].join("");
	});
*/

