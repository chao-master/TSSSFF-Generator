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
    CONTEXT.font = element.css("font");
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
        img = new Image();
    if (element.hasClass("card")){
        position = {top:0,left:0}
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
    img.src = src;
}

function redraw(){
    $(".card").css("transform","")
    drawImageElement($(".card"),function(){
        $(".card>*:visible:not(.type)").each(function(){
            var t=$(this);
            if (t.css("background-image") == "none"){
                drawTextElement(t);
            } else {
                drawImageElement(t);
            }
        })
        $(window).resize()
    })
}
