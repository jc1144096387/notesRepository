
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"fixedit{width:100%; position:fixed; z-index:99; left:0; top:0;}\n.",[1],"grace-news-list-imgs{max-height:68px; overflow:hidden;}\n",],undefined,{path:"./pages/index/index.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/index/index.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      