var Platform=cc.Class({properties:{_basePath:"",_enviormentType:1,enviormentType_cocos:1,enviormentType_rrxiu:2,_pluginGameHelper:null,_gameColor:"",_gameThinColor:"",_gameSkins:{default:function(){return{images:{},audios:{},texts:{},jsons:{}}}},_gameMode:1,_gameLevel:0,_gameLevelTotal:12,_cocosResourcePath:""},isRRX(){return this._enviormentType==this.enviormentType_rrxiu},canRRXEvent(){return!this._isEdit&&this.isRRX()},setPluginContext(e,t=null){this.setContext(e,t)},setContext(e){this._enviormentType=this.enviormentType_rrxiu,this._pluginContext=e,this._basePath=this._pluginContext._basePath,this._isEdit=this._pluginContext.isEdit,this._api=this._pluginContext.api,this._pluginGameHelper=this._pluginContext.pluginGameHelper,this._pluginContext.gameMode&&(this._gameMode=this._pluginContext.gameMode),this._pluginContext.gameLevel&&(this._gameLevel=this._pluginContext.gameLevel),this._pluginContext.gameLevelTotal&&(this._gameLevelTotal=this._pluginContext.gameLevelTotal)},getContext(){return this._pluginContext},getGameStrategyApi(){return this._pluginGameHelper.strategyEvent},getGameMode(){return this._gameMode},getGameLevel(){return this._gameLevel},getGameLevelTotal(){return this._gameLevelTotal},async initPluginResource(e=null){let t=this.isRRX();console.log("\u662f\u5426\u662fRRX:"+t),await this.cocosEnviormentLoad(t),t&&await this.rrxiuEnviormentLoad(),e&&e()},async cocosEnviormentLoad(e){console.log("\u5f00\u59cb\u52a0\u8f7dCocos\u8d44\u6e90")},async rrxiuEnviormentLoad(){var e=this;return new Promise(function(t,i){let o=e.getGameAPI().themeDict;o?(e._gameSkins.texts=o.dict,console.log(o.courseStyle),e.loadGameResource(o.courseStyle,function(i){e._gameSkins.images=i,e.loadGameResourceAudio(o.audioStyle,function(i){e._gameSkins.audios=i,e.loadGameResourceJson(function(i){e._gameSkins.jsons=i,t(e._gameSkins),e.isLoadOver(),console.info("\u6e38\u620f\u76ae\u80a4_gameSkins",e._gameSkins)})})})):i("\u89e3\u6790\u8d44\u6e90\u5931\u8d25")})},isLoadOver(){if(!this.canRRXEvent())return!0;this.getGameStrategyApi().isLoadOver()},getPluginFiles(e,t){return this.isRRX()?this.getContext().getFile(e,t):t+"/"+e},loadGameResource(e,t){let i={};if(e&&0!=e.length){var o=this,s=0;(function n(){o.getResourceImage(e[s].value,function(o){o&&(i[e[s].key]=o),++s>e.length-1?t&&t(i):n()})})()}else t&&t(i)},async getResourceImage(e,t){await this.getImage(e).then(function(e){t&&t(e)}).catch(function(){t&&t()})},getImage:async(e,t)=>new Promise(function(i,o){e=t?e+"?v="+t:e,cc.assetManager.loadRemote(e,{ext:".jpg"},function(e,t){e?(console.log("\u52a0\u8f7d\u8fdc\u7a0b\u56fe\u7247\u8d44\u6e90\u5931\u8d25\uff1a"+e),o(e)):i(t)})}),loadGameResourceAudio(e,t){let i={};if(e&&0!=e.length){var o=this,s=0;(function n(){o.getResourceAudio(e[s].value,function(o){i[e[s].key]=o,++s>e.length-1?t&&t(i):n()})})()}else t&&t(i)},getResourceAudio(e,t){cc.assetManager.loadRemote(e,function(e,i){e?console.log(e,"\u83b7\u53d6\u97f3\u9891\u8d44\u6e90\u5931\u8d25"):t&&t(i)})},loadGameResourceJson(e){let t=[],i={};if(t&&0!=t.length){var o=this,s=0;(function n(){let a=o.getPluginFiles(t[s].src,"resource/assets")+"?v="+location.host;console.log(a),o.getResourceJson(a,function(o){i[t[s].id]=o,++s>t.length-1?e&&e(i):n()})})()}else e&&e(i)},async getRes(e,t="image",i=""){let o=this;return this.isRRX()?new Promise(function(i,s){i(o.getGameSkins(e,t))}):new Promise(function(o,s){switch(t){case"image":""==i&&(i="images"),cc.resources.load(i+"/"+e,function(t,i){console.log("\u52a0\u8f7d\u672c\u5730\u56fe\u7247\u8d44\u6e90: "+e),t?(console.log("\u52a0\u8f7d\u672c\u5730\u56fe\u7247\u8d44\u6e90\u5931\u8d25\uff1a"+t),s(t)):(console.log(i,"\u52a0\u8f7d\u672c\u5730\u56fe\u7247\u8d44\u6e90\u6210\u529f"),o(i))});break;case"audio":""==i&&(i="audios"),cc.resources.load(i+"/"+e,function(t,i){console.log("\u52a0\u8f7d\u672c\u5730\u97f3\u9891\u8d44\u6e90: "+e),t?(console.log("\u52a0\u8f7d\u672c\u5730\u97f3\u9891\u8d44\u6e90\u5931\u8d25\uff1a"+t),s(t)):(console.log(i,"\u52a0\u8f7d\u672c\u5730\u97f3\u9891\u8d44\u6e90\u6210\u529f"),o(i))})}})},getGameSkins(e,t="image"){if(this._gameSkins)switch(t){case"image":if(this._gameSkins.images&&this._gameSkins.images[e])return this._gameSkins.images[e];break;case"audio":if(this._gameSkins.audios&&this._gameSkins.audios[e])return this._gameSkins.audios[e];break;case"text":if(this._gameSkins.texts&&e)return this._gameSkins.texts[e];break;case"json":if(this._gameSkins.jsons&&this._gameSkins.jsons[e])return this._gameSkins.jsons[e]}return null},getColor(){return this._gameColor||(this.isRRX()?(this._gameColor=this.getGamePageApi().getBasicColor(),this._gameColor=GameUtils.color2Num(this._gameColor)):(this._gameColor="#d16b1e",this._gameColor=GameUtils.color2Num(this._gameColor))),this._gameColor},getThinColor(){return this._gameThinColor||(this._gameThinColor=GameUtils.color2Shade(this.getColor(),.4)),this._gameThinColor},getWireColor(){let e="#8fd6ff";if(this.isRRX()){let t="tx_wire";e=this.getGameSkins(t,"text").color}return e=GameUtils.color2Num(e)},startGame(){window.gameUtil.setGameStart(!0)},submitGameScore(e,t=0){if(console.log("\u63d0\u4ea4\u5206\u6570:"+e+", \u6e38\u620f\u8bc4\u661f:"+t),!this.isRRX())return console.log("\u8fd9\u662fCocos\u672c\u5730\u73af\u5883\uff0c\u8bf7\u81ea\u884c\u968f\u4fbf\u5904\u7406\u63d0\u4ea4\u5206\u6570\u903b\u8f91"),2==this.gameMode&&(this.gameLevel++,console.log("\u8fd9\u662f\u95ef\u5173\u6a21\u5f0f\uff0c\u63d0\u4ea4\u5206\u6570\u540e\u8fdb\u5165\u4e0b\u4e00\u5173"+this.gameLevel)),!0;this.getGameStrategyApi().addScore(e,t)},showMsg(e){this.canMiniEvent()?this.getGamePageApi().infoMsg(e):alert(e)},getGameAPI(){return this._pluginGameHelper}});console.log("\u5f00\u59cb\u6302\u8f7dwindow.Platform"),window.platform=new Platform;