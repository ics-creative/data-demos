$(document).ready(function(){
    function loadPage(url)
    {
        url = "contents/"+url;
        $.ajax(url+"?"+parseInt((new Date)/1000))
        .success(function(data){
            setPage(data);
        });
    }

    function setPage(data)
    {
        loaded = true;
        $.pjax({
            parameter:index,
            container : '#changeContent',
            fragment : '#pjaxContent',
            timeout : 1000
        })
        .success(function(e){
            $("#changeContent").append(marked(data));
            setEvent();
            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        })
        .error(function(e){
        });
    }

    function setEvent()
    {
        $("a#link").click(function(e){
            e.preventDefault();
            if(index==0 && subIndex==0){
                scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            }
            setIndex($(this).attr("src"));
            loadPage(getPageURL());
        });
    }

    $("a#next").click(function(e){
        next();
    });
    $("a#prev").click(function(e){
        prev();
    });
    $("a#home").click(function(e){
        home();
    });

    // 履歴で戻った時
    $(window).on('popstate', function(e) {
        e.preventDefault();
        setEvent();
    });

    function setIndex(numSet){
        if(numSet.indexOf("_")>=0){
            numSet = numSet.split("_");
            index = Math.max(0, numSet[0]);
            if(numSet.length>0){
                subIndex = Math.max(0, numSet[1]);
            }
        }
        else{
            index = numSet;
        }
    }

    function getPageURL(){
        var url = contents[index][subIndex];
        return url;
    }
    function next(){
        //subIndex = ++subIndex < contents[index].length ? subIndex : 0;
        subIndex++;
        if(subIndex > contents[index].length-1) {
            subIndex = 0;
            index = ++index < contents.length ? index : 0;
        }
        loadPage(getPageURL());
    }
    function prev(){
        //subIndex = --subIndex < 0 ? contents[index].length-1:subIndex;
        subIndex--;
        if(subIndex < 0) {
            --index;
            if(index<0){
                index = 0;
                subIndex = 0;
                return;
            }
            subIndex = contents[index].length-1;
        }
        loadPage(getPageURL());
    }
    function home(){
        index = 0;
        subIndex = 0;
        loadPage(getPageURL());
    }
    function reflesh(){
        loadPage(getPageURL());
    }
    function exitPage(){
        history.back();
    }
    function setScroll(toY){
        window.scrollTo(0,toY);
    }


    $(window).keydown(function(e){
        trace(e.keyCode);
        switch (e.keyCode){
            // BACK
            case 8:
                return true;
                break;
            // BACK
            case 27:
                home();
                return false;
                break;
            // SPACE
            case 32:
                reflesh();
                return false;
                break;
            // RIGHT
            case 39:
                next();
                return false;
                break;
            // LEFT
            case 37:
                prev();
                return false;
                break;
        }
    });

    var loaded = false;
    var index = 0;
    var subIndex = 0;
    var scrollY = 0;

    if(!initialized){
        initialized = true;

        if(location.hash!=""){
            var numSet = location.hash.replace("#","");
            if(numSet.indexOf("_")>=0){
                numSet = numSet.split("_");
                index = Math.max(0, numSet[0]);
                if(numSet.length>0){
                    subIndex = Math.max(0, numSet[1]);
                }
            }
            else{
                index = numSet;
            }
        }
        loadPage(getPageURL());
        setEvent();
    }
    marked.setOptions({
        langPrefix: ''
    });
});
function trace(args){console.log(args);}
var initialized = false;