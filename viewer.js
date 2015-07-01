var LAST_KEY = '0';

function parseQuery(){
    var queries = document.location.search.substring(1).split("&");
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

function updateQuery(){
    var query = $.map(GET,function(v,k){
        if (v){
            return k+"="+v
        } else {
            return
        }
    }).join("&")
    history.pushState({},"",document.location.pathname+"?"+query)
}

GET = {};
function popevent(event){
    GET = $.extend({
        filter:"",
        view:"",
        edit:""
    },parseQuery());
    $("#filter").val(GET["filter"]);
    updateFilter();
}

window.onpopevent = popevent;

function updateFilter(){
    GET["filter"] = $("#filter").val();
    LAST_KEY = '0';
    $("#viewTable tr:not(:first-child)").remove();
    updateQuery();
    loadMoreCards();
}

function loadMoreCards(){
    $.get("dbInterface.php",{
        "view":LAST_KEY,
        "amount":50,
        "filter":GET["filter"],
        "setView":GET["view"],
        "setEdit":GET["edit"]
    },function(r){
        var d = JSON.parse(r);
        LAST_KEY = d[d.length-1].viewkey
        $.each(d,function(_,i){
            var key = i.viewkey;

            //Build the icon sets
            var iconCell = $("<td class='icons'>")
            var type = i.classes.match(/pony|start|ship|goal/)[0];
            var mappings = [{
                goal:"resources/symbols/Symbol-Goal.png",
                ship:"resources/symbols/Symbol-Ship.png",
            }];
            if (type == "pony" || type == "start"){
                if (i.classes.indexOf("changeling") == -1){
                    mappings.push({
                        unicorn:"resources/symbols/Symbol-Unicorn.png",
                        earthPony:"resources/symbols/Symbol-Earth-Pony.png",
                        pegasus:"resources/symbols/Symbol-Pegasus.png",
                        alicorn:"resources/symbols/Symbol-Alicorn.png"
                    })
                } else {
                    mappings.push({
                        unicorn:"resources/symbols/Symbol-ChangelingUnicorn.png",
                        earthPony:"resources/symbols/Symbol-ChangelingEarthPony.png",
                        pegasus:"resources/symbols/Symbol-ChangelingPegasus.png",
                        alicorn:"resources/symbols/Symbol-ChangelingAlicorn.png"
                    })
                }
                mappings.push({
                    maleFemale:"resources/symbols/Symbol-MaleFemale.png",
                    male:"resources/symbols/Symbol-male.png",
                    female:"resources/symbols/Symbol-Female.png"
                })
                mappings.push({time:"resources/symbols/symbol-dystopian-future.png"})
            } else if (type=="goal") {
                mappings.push({
                    s0:"resources/symbols/symbol-0.png",
                    s1:"resources/symbols/symbol-1.png",
                    s2:"resources/symbols/symbol-2.png",
                    s3:"resources/symbols/symbol-3.png"
                })
            }
            $.each(mappings,function(_,map){
                $.each(map,function(k,v){
                    if (i.classes.indexOf(k) > -1){
                        iconCell.append($("<img/>").attr("src",v))
                        return false;
                    }
                })
            })

            var chkBox = $("<input>").attr("type","checkbox");

            $("<tr>").append(
                $("<td>").text(i.name)
            ).append(iconCell).append(
                $("<td>").text(i.attr)
            ).append(
                $("<td>").text(i.copyright)
            ).append(
                $("<td>").append(
                    $("<i class='fa fa-picture-o'>")
                    .attr("data-original-title","<img style='max-width:184px;' src='"+i.image.replace(/'/g,"")+"'/>")
                    .attr("data-html","1")
                    .attr("data-placement","left")
                    .tooltip()
                )
            ).append(
                $("<td>").append(
                    $('<a>').attr("href","./#view:"+i.viewkey).append(
                        $('<i class="fa fa-external-link">')
                    )
                )
            ).append(
                $("<td>").addClass("setOnly").append(
                    $("<div>").addClass("togglebutton").append(
                        $("<label>").append(chkBox)
                    )
                )
            ).appendTo("#viewTable")
            $.material.togglebutton(chkBox)
        })
    })
}
