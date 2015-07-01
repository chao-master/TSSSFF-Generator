var GET={};

function parseQuery(){
    var queries;
    queries = document.location.search.substring(1).split("&");
    var parsed = {};
    for(var i=0;i<queries.length;i++){
        var q = queries[i],
            eAt = q.indexOf("=");
        if (eAt == -1){
            parsed[q] = null;
        } else {
            var k = q.substr(0,eAt),
                v = q.substr(eAt+1);
            parsed[k] = v
        }
    }
    return parsed;
}

function updateFields(newGet){
    var oldGet = $.extend({},GET);
    $.extend(GET,newGet);
    var query = $.map(GET,function(v,k){
        if (v){
            return k+"="+v
        } else {
            return
        }
    }).join("&");
    history.pushState({},"",document.location.pathname+"?"+query)
    $(document).trigger("state:adjust",[GET,oldGet]);
}

window.onpopstate = function(event){
    var oldGet = $.extend({},GET);
    var GET = parseQuery();
    $(document).trigger("state:adjust",[GET,oldGet]);
}

$(document).ready(function(){
    var GET = parseQuery();
    $(document).trigger("state:adjust",[GET,{}]);
})
