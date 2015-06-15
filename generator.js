var CANVAS = $("#exportImg"),
    CONTEXT = CANVAS[0].getContext("2d")

function drawTextElement(element){
    var words = (element.val() || element.text()).split(/ /),
        lineHeight = element.css("line-height").slice(0,-2)*1,
        line = words[0],
        width = element.width(),
        y = element.position().top,
        x = element.position().left;

    CONTEXT.textAlign = element.css("text-align");
    CONTEXT.font = element.css("font-size") + " " + element.css("font-family");
    CONTEXT.fillStyle = element.css("color");
    CONTEXT.textBaseline = "top";

    if (CONTEXT.textAlign == "center") {
        x += width/2;
    } else if (CONTEXT.textAlign == "right") {
        x += width;
    }

    for(var i=1;i<words.length;i++){
        var test = line + ' ' + words[i];
        if (CONTEXT.measureText(test).width > width){
            CONTEXT.fillText(line,x,y);
            line = words[i];
            y += lineHeight;
        } else {
            line = test;
        }
    }
    CONTEXT.fillText(line,x,y);
}

function drawImageElement(element,after){
    var src = element.css("background-image").slice(4,-1),
        width = element.innerWidth(),
        height = element.innerHeight(),
        position = element.position(),
        img = new Image()
        $(img).attr("crossorigin","anonymous")
    if (src.substr(0,1) == '"' || src.substr(0,1) == "'"){
        src = src.slice(1,-1)
    }
    if (element.hasClass("card")){
        position = {top:0,left:0}
    }
    if (!src){
        if(after){after()}
        return;
    }
    if (!src.match(document.location.origin) && src.match(/https?:\/\//)){
        src = "imgProxy.php?img="+encodeURIComponent(src)
    }
    img.onload = function() {
        var sWidth = img.width,
            sHeight = img.height,
            sX = 0, sY = 0,
            dRatio = width/height,
            sRatio = sWidth/sHeight
        if (sRatio > dRatio){ //Image is wider
            sWidth = sHeight*dRatio;
            sX = (img.width-sWidth)/2
        } else { //Image is taller
            sHeight = sWidth/dRatio;
            sY = (img.height-sHeight)/2
        }
        CONTEXT.drawImage(img,sX,sY,sWidth,sHeight,position.left,position.top,width,height);
        if(after){after()}
    }
    img.onerror = function(){
        mayError({
            error:"Failed to load image "+$(this).attr("src"),
            details:"Image could not be loaded to generate the export image, If the image otherwise loads normally then the server has CROS disabled. Try a host like imgur which dosen't, or derpibooru which is specially allowed."
        })
    }
    img.src = src
}

function redraw(){
    $(".card").css("transform","")
    drawImageElement($(".card"),function(){
        $(".name, .image, .attrs,.card .effect,.card .flavour, .copyright").each(function(){
            drawTextElement($(this));
        })
        drawImageElement($(".image"),function(){
            var toDo = 5;
            $(".iconCard,.iconGender,.iconRace,.iconGoal,.iconTime").each(function(){
                drawImageElement($(this),function(){
                    toDo--;
                    if(!toDo){
                        $(window).resize();
                    }
                });
            })
        })
    })
    $("#canvasExport")
        .attr("download",$(".name").text()+".png")
        .attr("href",CANVAS[0].toDataURL())
}

$(document).ready(function(){
    $("#canvasExport").mousedown(redraw)
})
