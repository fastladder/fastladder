/*
 reader widgets
*/
function setup_widgets(){
	channel_widgets.sep = "&nbsp;&nbsp;|&nbsp;&nbsp;"
	entry_widgets.sep = "";

	entry_widgets.add('created_on', function(feed, item){
		return 'posted: ' + new DateTime(item.created_on * 1000).toString();
	});

	entry_widgets.add('modified_on', function(feed, item){
		if(item.created_on == item.modified_on) return;
		return 'modified: ' + new DateTime(item.modified_on * 1000).toString();
	});

	entry_widgets.add('subs_button', function(feed, item){
		var channel_domain = get_domain(feed.channel.link);
		var subs_button = function(url){
			return '<a href="' + url + '" rel="discover">add</a>';
		};
		return (channel_domain != get_domain(item.link)) ? subs_button(item.link) : "";
	});

	channel_widgets.add('offset', function(feed, items){
		var subscribe_id = feed.subscribe_id;
		var info = subs_item(subscribe_id);
		var size = items.length;
		var range,range_text;
		var et = (size > 1) ? 'items' : 'item';
		if(State.viewrange.start == 0){
			range_text = "Updated";
			range = ""
			return	[
				'<span style="background:url(\'',info.icon,'\') no-repeat 0 0;padding-left:22px">',
				,range_text,': ',range,
				,' <span class="num"><span id="scroll_offset"></span>',size,'</span> ', et, '</span>'
			].join("");
		} else {
			range_text = "Archived";
			range = (State.viewrange.start + 1) + "-" + State.viewrange.end;
			return	[
				'<span style="background:url(\'',info.icon,'\') no-repeat 0 0;padding-left:22px">',
				,range_text,': ',
				,' <span class="num"><span id="scroll_offset"></span>',size,'</span> (',range,') ', et, '</span>'
			].join("");
		}
	});

	channel_widgets.add('subscriber', function(feed){
		var count = feed.channel.subscribers_count;
		return [
			'<span class="subscriber" style="background:url(\'/img/icon/subscriber.gif\') no-repeat 0 0;padding-left:22px">',
			'<span class="num">', count, (count == 1 ? '</span> user</span>' : '</span> users</span>')
		].join("");
	});

	channel_widgets.add('about', function(feed, items){
		return (
			'<a href="/about/' 
			+ feed.channel.feedlink
			+ '" style="background-image:url(/img/icon/about.gif);background-position:0 0;background-repeat:no-repeat;padding:0 0 4px 20px;">'
			+ 'about feed' 
			+ '</a>'
		);
	});

	channel_widgets.add('touch_button', function(feed){
		if(Config.touch_when != "manual") return;
		return [
			"<span class='button' onclick='touch_all(\"",feed.subscribe_id,"\")'>mark as read</span>"
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
			tags  : Config.clip_tags,
			"public" : Config.use_clip_public
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

