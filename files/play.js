// $(".playlists header dl").html("<dt>管道一</dt><dt>管道二</dt><dt>管道三</dt><dt>管道四</dt><dt>管道五</dt>");
// $(".playlists .bd").html("<li><a href='javascript:;' onclick='play(4,0);'>第01集</a></li><li><a href='javascript:;' onclick='play(4,1);'>第02集</a></li><li><a href='javascript:;' onclick='play(4,2);'>第03集</a></li><li><a href='javascript:;' onclick='play(4,3);'>第04集</a></li><li><a href='javascript:;' onclick='play(4,4);'>第05集</a></li>");
TouchSlide({slideCell:"#slider",titCell:"header dt",mainCell:".bd",effect:"leftLoop"})

var urls = [
"https://a.mahua-kb.com/20200417/bNUSK8xw/index.m3u8", "https://a.mahua-kb.com/20200520/KzlV3l9H/index.m3u8", "https://a.mahua-kb.com/20200524/MwnAse2O/index.m3u8", "https://b.mahua-kb.com/20200621/RYzXlaNO/index.m3u8", "https://b.mahua-kb.com/20200624/VxiaV400/index.m3u8", 
"https://www.dandanzan.com/https://cnc2.88zyw.net/20190906/金瓶梅/新金瓶梅1/index.m3u8", "https://cnc2.88zyw.net/20190906/金瓶梅/新金瓶梅2/index.m3u8", "https://cnc2.88zyw.net/20190906/金瓶梅/新金瓶梅3/index.m3u8", 
"https://v.js4177.org/share/0F83o9k9dhPJmaox", "https://cnc2.88zyw.net/20190906/金瓶梅/新金瓶梅5/index.m3u8", 
"https://yong.yongjiu6.com/20171220/9rPZR8mW/index.m3u8", "https://yong.yongjiu6.com/20171220/gKL5kP35/index.m3u8", "https://yong.yongjiu6.com/20171220/2Phie70E/index.m3u8", 
"https://yong.yongjiu6.com/20171220/PMqicUGI/index.m3u8", "https://yong.yongjiu6.com/20171220/4Ml2bcxP/index.m3u8", 
"https://youku.cdn-163.com/20180514/7365_f7f32d6b/index.m3u8", "https://youku.cdn-163.com/20180514/7366_7a261844/index.m3u8", "https://youku.cdn-163.com/20180514/7367_9ad92b2c/index.m3u8", 
"https://youku.cdn-163.com/20180514/7364_de20cdc6/index.m3u8", "https://youku.cdn-163.com/20180514/7363_b5504ecd/index.m3u8", 
"https://bobo.kkpp.space/20171003/X4D8VFE8/index.m3u8", "https://bobo.kkpp.space/20171003/sWECmN80/index.m3u8", "https://bobo.kkpp.space/20171003/EafcAyGR/index.m3u8", 
"https://bobo.kkpp.space/20171003/TpebRnGX/index.m3u8|第05集$https://bobo.kkpp.space/20171003/VJDl7eW4/index.m3u8"];

var episodes_num = 5;

function play(num1, num2) {
m3u8=urls[episodes_num * num1 + num2];
// "https://cnc2.88zyw.net/20190906/金瓶梅/新金瓶梅2/index.m3u8"
var video=document.getElementById('video');
var hls;
if (!jQuery.isEmptyObject(hls)) {
	hls.destroy();
}
if(Hls.isSupported()&&m3u8.indexOf(".mp4")==-1) {
	var engine=new p2pml.hlsjs.Engine();
	engine.loader.settings.cachedSegmentsCount=2000;
	engine.loader.settings.cachedSegmentExpiration=20000000;
	engine.loader.settings.requiredSegmentsPriority=100;
	engine.loader.settings.simultaneousHttpDownloads=10;
	engine.loader.settings.httpUseRanges=true;
	engine.loader.settings.httpFailedSegmentTimeout=1000;
	engine.loader.settings.p2pSegmentDownloadTimeout=1000;
	engine.loader.settings.httpDownloadInitialTimeout=1000;
	engine.loader.settings.httpDownloadInitialTimeoutPerSegment=1000;
	engine.loader.settings.trackerAnnounce=["wss://tracker.openwebtorrent.com","wss://tracker.btorrent.xyz","wss://tracker.fastcast.nz","wss://tracker.novage.com.ua"];
	var hlsjsConfig={maxBufferLength:9999999999999,
					 maxBufferSize:9999999999999,
					 maxMaxBufferLength:9999999999999,
					 fragLoadingTimeOut:1000,
					 manifestLoadingTimeOut:1000,
					 levelLoadingTimeOut:1000,
					 levelLoadingMaxRetry:30,
					 levelLoadingMaxRetryTimeout:1000,
					 fragLoadingMaxRetry:30,
					 fragLoadingMaxRetryTimeout:1000,
					 manifestLoadingMaxRetry:30,
					 manifestLoadingRetryDelay:1000,
					 liveSyncDurationCount:10,
					 loader:engine.createLoaderClass()};
	hls=new Hls(hlsjsConfig);
	p2pml.hlsjs.initHlsJsPlayer(hls);
	hls.loadSource(m3u8);
	hls.attachMedia(video);
	hls.on(Hls.Events.MANIFEST_PARSED,function(){video.play();});
	hls.once(Hls.Events.ERROR,function(event,data){
									switch(data.details){
										case"manifestLoadError":
											errorcount++;
											if(errorcount<30) {play(num1,num2);}
											if(errorcount==30) {
												$.post("/e/enews/index.php",{enews:"AddError",id:infoid,classid:classid,cid:1,errortext:'m3u8加载失败 '+m3u8});
												hls.destroy();
												errorcount=0;
												lgyPl_v2.toast("资源暂时无法播放,请切换资源!",5);}
											break;
										case"keyLoadError":
											errorcount++;
											play(num1,num2);
											if(errorcount==30) {
												errorcount=0;
												$.post("/e/enews/index.php",{enews:"AddError",id:infoid,classid:classid,cid:1,errortext:'key加载失败 '+m3u8});
												hls.destroy();
												lgyPl_v2.toast("资源暂时无法播放,请切换资源!",5);}
											break;
										case"manifestParsingError":
											$.post("/e/enews/index.php",{enews:"AddError",id:infoid,classid:classid,cid:1,errortext:'m3u8清单错误 '+m3u8});
											hls.destroy();lgyPl_v2.toast("资源暂时无法播放,请切换资源!",5);
											break;
										default:
											break;
									}
									}
		);
	} else if(video.canPlayType('application/vnd.apple.mpegurl')||m3u8.indexOf(".mp4")!=-1){
		video.src=m3u8;
		video.addEventListener('loadedmetadata',function(){video.play();});
	}  			
}