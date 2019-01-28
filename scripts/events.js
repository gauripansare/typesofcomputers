var hotspotclicked = false;;
var hotspot;
var touchend = false;
var touchend1 = false;
$(document).on("click", ".divHotSpot", function (event) {
    if ($(this).k_IsDisabled()) return;
    event.preventDefault();
    $(this).k_disable()
    if (hotspotclicked || _Navigator.IsAnswered())
        return;
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function () {
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event);
       
    },400)
    
});

$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;    
    _Navigator.Next();
});
$(document).on("click", ".hintdoc", function (event) {
    if ($(this).k_IsDisabled()) return;
    if ($(this).hasClass("hintdoc")) {
        if ($(this).hasClass("expanded")) {
            $(this).removeClass("expanded")
            $(".hintcontainerdoc").hide();

            open = "close";
        }
        else {
            $(this).addClass("expanded")
            $(".hintcontainerdoc").show();

        }
    }
    if(touchend1){
        $(this).mouseout();
        touchend1 = false;
    }
    event.preventDefault();
    return;
});
$(document).on("click", ".hintlink", function (event) {
    if ($(this).k_IsDisabled()) return;
   var open = "open;"
    if ($(this).hasClass("expanded")) {
        $(this).removeClass("expanded")
        $(this).attr("aria-expanded", "false")
        $(".hintcontainer").slideUp(100);
        $(".pageheading").focus();
        open = "close";
    }
    else {
        $(this).addClass("expanded");
        $(this).attr("aria-expanded", "true");
        $(".hintcontainer").slideDown(100, function () {

            $(".hintcontainer .hintcontent").find("p:first").attr("tabindex", "-1")
            if (iOS) {
                $(".hintcontainer .hintcontent").find("p:first").attr("role", "text")
            }
            $(".hintcontainer .hintcontent").find("p:first").focus(); 
        });
    }
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint " + open)
    }
     if(touchend){
        $(this).mouseout();
        touchend = false;
    }

});

$(document).on("click", ".closehintdoc", function (event) {
    if ($(this).k_IsDisabled()) return;
    $(".hintdoc").removeClass("expanded")
    $(".hintcontainerdoc").hide();
   
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint closed")
    }
    event.preventDefault();
    return;

});
$(document).on("click", ".closehintlink", function (event) {
    if ($(this).k_IsDisabled()) return;
    $(".hintlink").removeClass("expanded")
    $(".hintlink").attr("aria-expanded", "false")
    $(".hintcontainer").slideUp(100,function(){$("h2.pageheading").focus();});
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint closed")
    }

});
$(document).on("keydown", "input.EmbededElement", function (event) {
    if ($(this).k_IsDisabled()) return;
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        _ModuleCommon.InputEnter($(this));
    }
});

$(window).resize(function () {
    _ModuleCommon.OrientationChange();
});



$(document).on('click', ".activityimg", function (event) {
    if ($(".divHotSpot").hasClass("disabled"))
        return;
    _ModuleCommon.AddEditPropertiesClick(event);
});


$(document).on('click', ".startbtn", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
});
$(document).on('click', "#submitbtn", function (event) {
    if ($(this).k_IsDisabled()) return;
    _ModuleCommon.OnSubmit();
});
$(document).on('click', "#continuebtn", function (event) {
    if ($(this).k_IsDisabled()) return;
    _ModuleCommon.OnContinue();
});


$(document).on('change', "input[type='checkbox'].pagecheckbox", function (event) {
    _ModuleCommon.EnableSubmit();
    if ($(this).prop("checked") == true) {
        $(this).next("label").css({ "font-weight": "bold" })
    }
    else
    {
        $(this).next("label").css({ "font-weight": "normal" })
    }
});
$(document).on('change', "input[type='radio'].pageradio", function (event) {
    _ModuleCommon.EnableSubmit();
     $('input[type="radio"]:checked').addClass('beforeClass');
});
$(document).on('click', ".reviewsubmit", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
});


$(document).on('touchstart', ".hintlink", function (event) {
    mouseenter($(this));
    touchend = false;
});

$(document).on('touchend ', ".hintlink", function (event) {
    mouseleave($(this));
    touchend = true;
});

$(document).on('touchstart', ".hintdoc", function (event) {
    mouseenter($(this));
    touchend1 = false;
});

$(document).on('touchend ', ".hintdoc", function (event) {
    mouseleave($(this));
    touchend1 = true;
});


$(document).on('mouseenter', ".hintlink", function (event) {
    mouseenter($(this));
});

$(document).on('mouseleave', ".hintlink", function (event) {
    mouseleave($(this));
});

$(document).on('mouseenter', ".hintdoc", function (event) {
    mouseenter($(this));
});

$(document).on('mouseleave', ".hintdoc", function (event) {
    mouseleave($(this));
});
function mouseenter(_ths) {
    _ths.find(".hintlinkspan").css({ "color": "#b22222", "border-bottom": "1px solid #b22222" })
    _ths.find("path").css({ "fill": "#b22222" })
}
function mouseleave(_ths) {
    _ths.find(".hintlinkspan").css({ "color": "#047a9c", "border-bottom": "1px solid #047a9c" })
    _ths.find("path").css({ "fill": "#047a9c" })
}


$(document).on("change", ".assessmentradio", function (event) {
    $(".assessmentSubmit").k_enable();  
  
});
$(document).on("click", ".assessmentSubmit", function (event) {
    if ($(this).k_IsDisabled()) return;
    gRecordData.Questions[currentQuestionIndex].UserSelectedOptionId = $("input[type='radio']:checked").attr("id") ;
    gRecordData.Questions[currentQuestionIndex].IsAnswered = true;
    var correctoption =   gRecordData.Questions[currentQuestionIndex].Options.filter(function (item) {
        return item.IsCorrect;
    })[0];
    gRecordData.Questions[currentQuestionIndex].IsCorrect = correctoption.OptionId == $("input[type='radio']:checked").attr("id") ? true : false;
    _Navigator.UpdateScore();
    _Navigator.Next();
});

$(document).on('click', ".inputcircle", function (event) {
    if ($(this).k_IsDisabled()) return;
    $(this).next(".inpputtext").trigger("click");
});

window.onload = function () {
    _ScormUtility.Init();
}

window.onunload = function () {
    _ScormUtility.End();
}

window.addEventListener("scroll", function () {
    $(".hintdoc").parent().hide();
    var target = $(".header-content-dock");

    var currPage = _Navigator.GetCurrentPage();
    if (currPage.pageId == "p1" ){
        target.css({ "visibility": "hidden", "top": "-80px"})
        $(".hintcontainerdoc").hide();
        $(".hintdoc").removeClass("expanded")
        return;
    }
    
    if (window.pageYOffset > $("#header-content").height() - 15) {
        var width = $("#wrapper").width();
        target.css({ "visibility": "visible", "top": "0px", "width": width + "px" })
    }
    else if (window.pageYOffset < $("#header-content").height() - 15) {
        target.css({ "visibility": "hidden", "top": "-80px"})
        $(".hintcontainerdoc").hide();
        $(".hintdoc").removeClass("expanded")
        $(".header-content-dock").find(".presentationModeFooter").hide();

    }
    if(_Navigator.IsPresenterMode() || _Navigator.IsReviewMode())
    {
        $(".header-content-dock").find(".presentationModeFooter").show();
        $(".header-content-dock .intro-content").css({"margin-top":"30px"})
    }
    

}, false);
