//Display error
function mayError(errObj){
    if (errObj.error){
        console.log(errObj)
        $("#error strong").text(errObj.error);
        $("#error em").text(errObj.details);
        $("#error").show()
        return 1;
    } else {
        return 0;
    }
}

//Blanks the cards
function newCard(){
    var blankCard = LZString.compressToBase64(JSON.stringify({
        classes: "card pony maleFemale unicorn s0",
        name: "",
        attrs: "",
        effect: "",
        flavour: "",
        copyright: "",
    }))
    updateFields({card:blankCard})
}

//Loads a card
function load(string){
    var data = JSON.parse(LZString.decompressFromBase64(string))
    $(".card").attr("class",data.classes)
    $(".card .nameInput").val(data.name)
    $(".card .attrs").val(data.attrs)
    $(".card .effect").val(data.effect)
    $(".card .flavour").val(data.flavour)
    $(".card .copyright").val(data.copyright)
}

//Saves a card
function save(){
    var newString = LZString.compressToBase64(JSON.stringify({
        classes: $(".card").attr("class"),
        name: $(".card .nameInput").val(),
        attrs: $(".card .attrs").val(),
        effect: $(".card .effect").val(),
        flavour: $(".card .flavour").val(),
        copyright: $(".card .copyright").val(),
    }))
    updateFields({card:newString})
}

function cardSetup(){
    //On card button clicks, remove other classes and add new ones.
    //Unless it is changeling, special case, just toggle.
    $(".card button").click(function(){
        if ($(this).attr("value") == "changeling"){
            $(".card").toggleClass($(this).attr("value"));
        } else {
            $(this).parent().children("button").each(function(){
                if ($(this).attr("value") != "changeling"){
                    $(".card").removeClass($(this).attr("value"));
                }
            })
            $(".card").addClass($(this).attr("value"));
        }
    })

    //On Window resize we use css transformation to scale the card to fix
    //Yes it seems horrible but the alternative was somehting even more horrible!
    $(window).resize(function(){
        var f = ($(".cardwrapper").width())/788;
        $(".card").css("transform","scale("+f+")")
        $(".cardwrapper").height(1088*f);
    });

    //Constant infomation for special escape code handling.
    var SPECIAL_REGEX = /\\(malefemale|unicorn|pegasus|earth|alicorn|goal|time|female|male|ship|replace|swap|draw|newgoal|search|copy|changeling)/g
    var SPECIAL_REPLACE = {
        "\\male":"\u2642",
        "\\female":"\u2640",
        "\\malefemale":"\u26A4",
        "\\ship":"\u2764",
        "\\earth":"\uE000",
        "\\unicorn":"\uE001",
        "\\pegasus":"\uE002",
        "\\alicorn":"\uE003",
        "\\time":"\uE004",
        "\\replace":"(Replace): While in your hand, you may discard a Pony card from the grid and play this card in its place. This power cannot be copied.",
        "\\swap":"(Swap): You may swap 2 Pony cards on the shipping grid.",
        "\\draw":"(Draw): You may draw a card from the Ship or Pony deck.",
        "\\newgoal":"(New Goal): You may discard a Goal and draw a new one to replace it.",
        "\\search":"(Search): You may search the Ship or Pony discard pile for a card of your choice and play it.",
        "\\copy":"(Copy): You may copy the power of any Pony card currently on the shipping grid, except for Changelings.",
        "\\changeling":"Gains the name, keywords and symbols of any single [race] of your choice until the end of the turn. If this card is moved to a new place on the grid, the current player must select a new disguise that will last until the end of their turn, even if other cards say its power would not activate."
    }

    //Replace special escape codes when an input is updated
    $(".card input[type=text], .card textarea").on("change",function(){
        var txt = $(this).val();
        txt = txt.replace(SPECIAL_REGEX,function(t){
            return SPECIAL_REPLACE[t];
        });
        $(this).val(txt)
    })

    //Replace and create tooltip hints
    $.each(SPECIAL_REPLACE,function(key,replace){
        $("dt[data-original-title='\\"+key+"']").attr("data-original-title",replace).tooltip();
    })

    //When a text editor is updated resize it's helper to clone back the height.
    //This is because CSS Really hates working vertically
    $(".card textarea").on("change keyup paste",function(){
        var t = $(this),
            o = $(".cardHelper ." + t.attr("class"));
        o.text(t.val());
        t.height(o.height());
    });

    //We also use a simular system for the name, but since we dont need manual
    //line breaks it gets easiers
    $(".card .nameInput").on("change keyup paste",function(){
        var t = $(this),
            o = $(".card .name");
        o.toggleClass("small",t[0].scrollWidth > t.width()+1)
        o.text(t.val());
    });

    //Update image
    $("#image").change(function(){
        $(".card .image").css("background-image","url('"+$(this).val()+"')")
    })

    //Save, New & Export buttons
    $("#save").click(save)
    $("#new").click(newCard)

    //Inital call setup functions
    $(window).resize();
    $(".card textarea").change();

    //Check the hash to see if we are loading something
    if(document.location.hash){
        hs = document.location.hash.substr(1).split(":")
        if (hs.length==2 && (hs[0] == "view" || hs[0] == "edit")){
            load(hs[0],hs[1]);
        } else {
            document.location.hash = ""
        }
    }
};
