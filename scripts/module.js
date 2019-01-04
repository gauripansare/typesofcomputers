jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
        if (isIE11version) {
            if ($(this).attr("type") != undefined && $(this).attr("type") == "radio")
                return;
            $(this).removeAttr("disabled")
        }
        return;
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});
var _ModuleCommon = (function () {
    var reviewData = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.nextPageId != undefined && currentPageData.nextPageId != "") {
                $("#linknext").k_enable();
            }
        },
        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }

        },
        GetReviewData: function () {
            return reviewData;
        },
        SetReviewData: function (rData) {
            reviewData = rData;
        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function () {
            var pageData = this.GetPageDetailData();
            var reviewData = this.GetPageReviewData();
            var fdkurl = "";
            if (pageData != undefined && reviewData != undefined) {
                fdkurl = reviewData.fdkurl;

                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                    //this.SetFeedbackTop()
                    /*$("body").animate({
                        scrollTop: $(document).height()
                    }, 1000);*/
                });
            }
        },
        SetRadioboxPosition: function () {
            var radiobtns = $('input[type="radio"]');
            for (var i = 0; i < radiobtns.length; i++) {
                var css1 = $("#" + radiobtns[i].id).next("label").position();
                $("#" + radiobtns[i].id).css({ "left": (Number(css1.left) + 100), "top": (Number(css1.top) + 15) });
            }
        },
        DisplayUserReviewMode: function () {
            $("input").k_disable();
            this.DisplayCorrectIncorrect();
            this.ShowFeedbackReviewMode();

        },
        DisplayCorrectIncorrect: function () {
            var pageDetailData = this.GetPageDetailData();
            var pageReviewData = this.GetPageReviewData();
            if (reviewData != undefined) {
                $("#" + pageReviewData.radio).prop("checked", "true");
                $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                if (pageDetailData.radio == pageReviewData.radio) {

                    $("#" + pageDetailData.radio).next("label").find("span").before(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
                    $("#" + pageDetailData.radio).addClass("correct");
                }
                else {

                    $("#" + pageReviewData.radio).next("label").find("span").before(' <i class="fa radio-fa-check-incorrect fa-times" style="font-size:20px;color:#B22222"></i>');
                    $("#" + pageReviewData.radio).addClass("incorrect");
                    $("#" + pageDetailData.radio).next("label").find("span").before(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
                    $("#" + pageDetailData.radio).addClass("correct");
                }

                for (var i = 0; i < pageReviewData.checkbox.length; i++) {
                    $("#" + pageReviewData.checkbox[i]).prop("checked", "true");
                    if (pageDetailData.checkbox.indexOf(pageReviewData.checkbox[i]) >= 0) {
                        $(".checkmark").hide();
                        $("#" + pageReviewData.checkbox[i]).next("label").append(' <i class="fa fa-check" style="font-size:20px;color:#01662C;"></i>');
                        $("#" + pageReviewData.checkbox[i]).addClass("correct");
                        $("#" + pageReviewData.checkbox[i]).next("label").css({ "font-weight": "bold" })
                    }
                    else {
                        $(".checkmark").hide();
                        $("#" + pageReviewData.checkbox[i]).next("label").append(' <i class="fa fa-times" style="font-size:20px;color:#B22222"></i>');
                        $("#" + pageReviewData.checkbox[i]).addClass("incorrect");
                        $("#" + pageReviewData.checkbox[i]).next("label").css({ "font-weight": "bold" })
                    }
                    $("#" + pageReviewData.checkbox[i]).next("label").find(".checkmark").removeClass("checkmark");
                }
                for (var i = 0; i < pageDetailData.checkbox.length; i++) {
                    if ($("#" + pageDetailData.checkbox[i]).next("label").find(".checkmark").length > 0) {
                        $("#" + pageDetailData.checkbox[i]).addClass("correct");
                        $("#" + pageDetailData.checkbox[i]).next("label").append(' <i class="fa fa-check" style="font-size:20px;color:#01662C;"></i>');
                        //$("#" + pageDetailData.checkbox[i]).addClass("correct");
                        $("#" + pageDetailData.checkbox[i]).next("label").find(".checkmark").removeClass("checkmark");
                        //$("#" + pageDetailData.checkbox[i]).closest("label").css({ "font-weight": "bold" })
                    }
                }
            }
            this.SetAccessibility();
            if (isFirefox || isIE11version) {
                this.SetCustomarialabelforRadio();
            }
        },
        DisplayReviewForOneIncorrect: function () {
            var chkboxarray = $("input[type='checkbox']:checked").map(function () {
                return $(this).attr("id");
            }).get();
            var pageDetailData = this.GetPageDetailData();
            var radio = $("input[type='radio']:checked").attr("id")
            correctcnt = 0;
            if (pageDetailData.radio == radio) {
                $("#" + pageDetailData.radio).next("label").find("span").before(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
                $("#" + pageDetailData.radio).addClass("correct");
            }
            else {
                $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                $("#" + radio).next("label").find("span").before(' <i class="fa radio-fa-check-incorrect fa-times" style="font-size:20px;color:#B22222"></i>');
                $("#" + radio).addClass("incorrect");
            }

            $(".checkmark").hide();
            for (var i = 0; i < chkboxarray.length; i++) {
                if (pageDetailData.checkbox.indexOf(chkboxarray[i]) >= 0) {
                    $("#" + chkboxarray[i]).next("label").append(' <i class="fa fa-check" style="font-size:20px;color:#01662C;"></i>');
                    $("#" + chkboxarray[i]).addClass("correct");
                    correctcnt++;
                }
                else {
                    $("#" + chkboxarray[i]).next("label").append(' <i class="fa fa-times" style="font-size:20px;color:#B22222"></i>');
                    $("#" + chkboxarray[i]).addClass("incorrect");
                }

                $("#" + chkboxarray[i]).next("label").find(".checkmark").removeClass("checkmark");
            }

            this.Applycss();
            this.SetAccessibility();
            if (isFirefox || isIE11version) {
                this.SetCustomarialabelforRadio();
            }
        },
        SetAccessibility: function () {
            var radio = $("input[type='radio']:checked").attr("id")
            var rarialabel = "";
            if ($("#" + radio).hasClass("correct")) {
                rarialabel = "Correct option selected" + $("#" + radio).next("label").text();
                $("#" + radio).next("label").attr("aria-hidden", "true");
            }
            else {
                var rarialabel_c = $("input[type='radio'].correct").next("label").text();
                $("input[type='radio'].correct").next("label").attr("aria-hidden", "true");
                $("input[type='radio'].correct").attr("aria-label", "Correct option"+rarialabel_c);
                rarialabel = "Incorrect option selected " + $("#" + radio).next("label").text();
                $("#" + radio).next("label").attr("aria-hidden", "true");
            }
            $("#" + radio).attr("aria-label", rarialabel);
            var chkboxarray = $("input[type='checkbox']").map(function () {
                return $(this).attr("id");
            }).get();
            var carialabel = "";
            for (var i = 0; i < chkboxarray.length; i++) {
                carialabel = "";
                if ($("#" + chkboxarray[i]).hasClass("correct")) {
                    if ($("#" + chkboxarray[i]).prop("checked")){
                        $("#" + chkboxarray[i]).attr("cheked", "true");
                        carialabel = "Correct option selected " + $("#" + chkboxarray[i]).next("label").text();
                        $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    }
                    else{
                        $("#" + chkboxarray[i]).attr("cheked", "true");
                        carialabel = "Correct option  " + $("#" + chkboxarray[i]).next("label").text();
                        $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    }
                    
                }
                else if ($("#" + chkboxarray[i]).hasClass("incorrect")) {
                    carialabel = "Incorrect option selected " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                }
                $("#" + chkboxarray[i]).attr("aria-label", carialabel);
            }

        },
        SetCustomarialabelforRadio: function () {
            $("input[type='radio']").each(function () {
                var ischecked = "\n radio button unavailable"
                if ($(this).prop("checked") == "true" || $(this).prop("checked") == true) {
                    ischecked = ischecked + " checked "
                }
                else {
                    ischecked = ischecked + " not checked "
                }
                var radioalabel = "";
                if ($(this).hasClass("correct")) {
                    radioalabel = ischecked + " correct option " + $(this).next("label").text();
                }
                else if ($(this).hasClass("correct") && $(this).prop("checked")) {
                    radioalabel = ischecked + " correct option selected" + $(this).next("label").text();
                }
                else if ($(this).hasClass("incorrect") && $(this).prop("checked")) {
                    radioalabel = ischecked + " incorrect option selected" + $(this).next("label").text();
                }
                else {
                    radioalabel = ischecked + $(this).next("label").text();
                }
                radioalabel = radioalabel;
                $(this).next("label").after("<label class='ffreading'>" + radioalabel + "</label>");
                $(this).attr("aria-hidden", "true");
                $(this).next("label").attr("aria-hidden", "true");
                //$(this).closest("div").find("*").attr("aria-hidden", "true")

            });

            var chkboxarray = $("input[type='checkbox']").map(function () {
                return $(this).attr("id");
            }).get();
            var carialabel = "";
            for (var i = 0; i < chkboxarray.length; i++) {
                var ischecked = "\n checkbox unavailable"
                carialabel = "";
                if ($("#" + chkboxarray[i]).prop("checked") == "true" || $("#" + chkboxarray[i]).prop("checked") == true) {
                    ischecked = ischecked + " checked "
                }
                else {
                    ischecked = ischecked + " not checked "
                }
                if ($("#" + chkboxarray[i]).hasClass("correct")) {
                    carialabel = ischecked + " Correct option  " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                }
                else if ($("#" + chkboxarray[i]).hasClass("correct") && $(this).prop("checked")) {
                    $("#" + chkboxarray[i]).attr("checked", "true");
                    carialabel = ischecked + " Correct option selected " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                }
                else if ($("#" + chkboxarray[i]).hasClass("incorrect")) {
                    carialabel = ischecked + " Incorrect option selected " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                }
                else {
                    carialabel = ischecked + $("#" + chkboxarray[i]).next("label").text();
                }
                $("#" + chkboxarray[i]).next("label").after("<label class='ffreading'>" + carialabel + "</label>")
                $("#" + chkboxarray[i]).attr("aria-hidden", "true");
                $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
            }
            //$("#ffread").text(carialabel).css({"opacity":"0","font-size":"0"});
        },
        OnPageLoad: function () {
            var pageDetailData = this.GetPageDetailData();
            var currentPageData = _Navigator.GetCurrentPage();
            this.ApplycontainerWidth();
            $("#div_feedback").hide();
            if (pageDetailData != undefined && pageDetailData.radio != undefined) {
                $("input[type='checkbox']").addClass("pagecheckbox");
                $("input[type='radio']").addClass("pageradio");
                $("#submitbtn").k_disable();
            }
            if (_Navigator.IsAnswered() && !_Navigator.GetCurrentPage().isStartPage) {
                this.DisplayUserReviewMode();
            }
            if (_Navigator.IsPresenterMode() == true) {
                //$(".startbtn").k_disable();
                $("#linknext").k_enable();

                if (currentPageData.pageId != "p8" && currentPageData.pageId != "p1") {
                    this.LoadPresenterMod();
                }
            }

            if (currentPageData.pageId != "p8" && currentPageData.pageId != "p1") {
                this.SetRadioboxPosition();
            }

        },
        LoadPresenterMod: function () {
          /*  var pageDetailData = this.GetPageDetailData();
            $("#" + pageDetailData.radio).next("label").find("span").before(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
            $("#" + pageDetailData.radio).addClass("correct").attr('checked', 'checked');
            $("input[type='radio']").k_disable();
            $("input[type='checkbox']").next("label").find("span").hide();
            for (var i = 0; i < pageDetailData.checkbox.length; i++) {
                $("#" + pageDetailData.checkbox[i]).next("label").find("span").before(' <i class="fa radio-fa-check fa-check" style="font-size:20px;color:#01662C;"></i>');
                $("#" + pageDetailData.checkbox[i]).addClass("correct").attr('checked', 'checked');
                $("#" + pageDetailData.checkbox[i]).next("label").css("font-weight", "bold");
                $("input[type='checkbox']").k_disable();
                $("input[type='checkbox']").next("label").find(".checkmark").removeClass("checkmark");
            }
            this.SetAccessibility();
            if(pageDetailData.pageId != "p8"){
            _Navigator.SetPageStatus(true);
            }
            if (isFirefox || isIE11version) {
                this.SetCustomarialabelforRadio();
            }
*/
        },
        Applycss: function () {

            var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
            if (/Edge/.test(navigator.userAgent) || isIE11version) {
                $('input[type="radio"]:checked').closest("label").find(".radio-fa-check").css("bottom", "7px")
            }
        },
        EnableSubmit: function () {
            var pageData = this.GetPageDetailData();
            if ($("input[type='checkbox']:checked").length > 0 && $("input[type='checkbox']:checked").length == pageData.checkbox.length && $("input[type='radio']:checked").length) {
                $("#submitbtn").k_enable();
            }
            else {
                $("#submitbtn").k_disable();
            }
        },
        CalculateScore: function () {
            var pageData = this.GetPageDetailData();
            var score = 0;
            if ($("input[type='radio']:checked").attr("id") == pageData.radio) {
                score += 1;
            }
            var chkboxarray = $("input[type='checkbox']:checked").map(function () {
                return $(this).attr("id");
            }).get();

            for (var i = 0; i < chkboxarray.length; i++) {
                if (pageData.checkbox.indexOf(chkboxarray[i]) >= 0) {
                    score += 1;
                }
            }
            return score

        },
        OnSubmit: function () {
            var pageData = this.GetPageDetailData();
            var fdbkUrl = "";
            _Navigator.IncrementCounter();
            if ($("input[type='radio']:checked").attr("id") == pageData.radio) {
                $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                if (this.CalculateScore() == 3) {
                    fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.correctfeedback;
                }
                else {
                    if (_Navigator.GetCounter() == 1) {
                        fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.partialfeedback1;
                        this.DisplayReviewForOneIncorrect();
                    }
                    else {
                        fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.partialfeedback;
                    }
                }
                if (this.CalculateScore() == 3 || _Navigator.GetCounter() > 1) {
                    $("#" + pageData.radio).attr("checked", "checked");
                    this.AddReviewData(true, fdbkUrl);
                    this.DisplayCorrectIncorrect();
                    _Navigator.SetPageScore(this.CalculateScore())
                    _Navigator.SetPageStatus(true);
                    this.EnableNext();
                    _Navigator.GetBookmarkData();
                }

            }
            else {

                if (_Navigator.GetCounter() == 1) {
                    this.AddReviewData(false);
                    this.DisplayReviewForOneIncorrect();
                    fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.incorrectfeedback;
                }
                else {
                    fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.incorrectfeedback1;
                    this.AddReviewData(false, fdbkUrl);
                    this.DisplayCorrectIncorrect();
                    _Navigator.SetPageScore(this.CalculateScore())
                    _Navigator.SetPageStatus(true);
                    this.EnableNext();
                    _Navigator.GetBookmarkData();
                }
            }
            $("#div_feedback").show();
            $("input").k_disable();
            $("#div_feedback").css("display", "inline-block");

            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                $("#div_feedback p:first").attr("tabindex", "0")
                if (isIOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                window.scrollTo(0, document.body.scrollHeight)
                $("#div_feedback p:first").focus();
                // if (isIE11version) {
                //     $("#div_feedback .div_fdkcontent p:first").focus();
                //     $('html,body').animate({ scrollTop: document.body.scrollHeight }, animTime, function () {
                //     });
                // }
                // else {
                //     $('html,body').animate({ scrollTop: document.body.scrollHeight }, animTime, function () {
                //         $("#div_feedback .div_fdkcontent p:first").focus();

                //     });
                // }
            });

        },
        OnContinue: function () {
            $(".checkmark").show();
            $('input[type="checkbox"].incorrect').next("label").find("span").removeClass("without-before");
            $('input[type="checkbox"].incorrect').next("label").css({ "font-weight": "normal" })
            $("input[type='checkbox']:not(.correct)").k_enable();
            $("input[type='checkbox']:not(.correct)").removeAttr("checked");
            $("input[type='checkbox']:not(.correct)").removeAttr("aria-label")
            $("input[type='checkbox']:not(.correct)").next("label").find("span").addClass("checkmark")
            $("input[type='checkbox']:not(.correct)").next("label").find("i").remove();
            $('input[type="checkbox"]').removeAttr("aria-hidden");

            
            if (isFirefox || isIE11version) {
                $('input[type="checkbox"].correct').attr("aria-hidden","true");
                $('input[type="checkbox"]:not(.correct)').next("label").removeAttr("aria-hidden");
                $('input[type="checkbox"]:not(.correct)').next("label").next(".ffreading").remove();
                //$('input[type="checkbox"]:not(.correct)').next(".ffreading").remove();
                if (!$('input[type="radio"]:checked').hasClass("correct")){
                    $('input[type="radio"]').removeAttr("aria-hidden");
                    $('input[type="radio"]').next("label").next(".ffreading").remove();
                    $('input[type="radio"]:not(.correct)').next("label").removeAttr("aria-hidden");
                }
            }
            if (!$('input[type="radio"]:checked').hasClass("correct")) {
                $('input[type="radio"]:checked').next("label").find("span").removeClass("without-before")
                $('input[type="radio"]:checked').next("label").find("i").remove();
                $("input[type='radio']").k_enable();
                $("input[type='radio']").removeAttr("checked");
                $('input[type="radio"]').removeAttr("aria-label");
                $('input[type="radio"]').next("label").removeAttr("aria-label");
            }
            $('input[type="radio"].incorrect').removeAttr("aria-label");
            $('input[type="radio"].incorrect').next("label").removeAttr("aria-hidden");
            $("input[type='radio']").removeClass("incorrect");
            //$('input[type="radio"]').removeAttr("aria-hidden");
            
            $("#div_feedback .div_fdkcontent").html("");
            $("#div_feedback").hide();
            $(".checkmark").show();
            

            $("#radio-elements legend").attr("tabindex", "-1")
            if (isIOS) {
                $("#radio-elements legend").attr("role", "text")
            }
            // $('html,body').animate({ scrollTop: document.body.scrollHeight}, 500, function () {
            //     $("#radio-elements legend").focus();
            // });
            window.scrollTo(0,document.body.scrollHeight)
            $("#radio-elements legend").focus();
        },
        AddReviewData: function (isCorrect, fdkurl) {
            var pageData = this.GetPageDetailData();
            var currentPageData = _Navigator.GetCurrentPage();
            var found = false;
            var index = 0;
            for (var i = 0; i < reviewData.length; i++) {
                if (currentPageData.pageId == reviewData[i].pageId) {
                    index = i;
                    found = true;
                    break;
                }
            }
            if (found) {
                reviewData[i].radio = $("input[type='radio']:checked").attr("id")
                reviewData[i].checkbox = $("input[type='checkbox']:checked").map(function () {
                    return $(this).attr("id");
                }).get();
                reviewData[i].isCorrect = isCorrect;
                reviewData[i].fdkurl = fdkurl;
            }
            else {
                var obj = {};
                obj.pageId = currentPageData.pageId;
                obj.radio = $("input[type='radio']:checked").attr("id");
                obj.checkbox = $("input[type='checkbox']:checked").map(function () {
                    return $(this).attr("id");
                }).get();
                obj.isCorrect = isCorrect;
                obj.fdkurl = fdkurl;
                reviewData.push(obj)
            }
        },

        ApplycontainerWidth: function () {

            var innerWidth = $(window).width();

            $("#header-title img").attr("src", "assets/images/logo.png")

            if (innerWidth < 850) {
                if ($(".activityContainer").find(".activityimg").length > 0) {
                    var marginleft = $(".intro-content:first").css("margin-left");
                    marginleft = marginleft.substring(0, marginleft.indexOf("px"))

                    var imgcntwidth = innerWidth - (marginleft * 2);
                    $(".activity").css({ "width": imgcntwidth + "px" })
                }
                if (innerWidth <= 500) {
                    $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
                }
            }
            else {
                $(".activity").css({ "width": "auto" })
            }

        },
        OrientationChange: function () {
            this.ApplycontainerWidth();
        },
        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },
        AppendFooter: function () {           
                $("#header-progress .presentationModeFooter").show();             
                
                $("footer").show();
                $("#linknext").k_enable();           
            
        },
AppendScormReviewFooter: function () {
            $(".presentationModeFooter").html('Review Mode');
            $("#header-progress .presentationModeFooter").show();           
                
                $("footer").show();
                $("#linknext").k_enable();   
            /*
            if ($(".ScormReviewFooter").length == 0) {
                var str = '<div class="ScormReviewFooter"> Review Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }*/
        

        },
        IECustomCheckboxAccessbility: function () {
            var chkboxarray = $("input[type='checkbox']").map(function () {
                return $(this).attr("id");
            }).get();
            var labeltext = "";
            for (var i = 0; i < chkboxarray.length; i++) {
                labeltext = "";
                if ($("#" + chkboxarray[i]).hasClass("correct")) {
                    $("#" + chkboxarray[i]).attr("checked", "true");
                    labeltext = " Correct option selected " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    $("#" + chkboxarray[i]).attr("aria-hidden", "true");
                }
                else if ($("#" + chkboxarray[i]).hasClass("incorrect")) {
                    labeltext = " Incorrect option selected " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    $("#" + chkboxarray[i]).attr("aria-hidden", "true");
                }
                else {
                    labeltext = "checkbox not Checked " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    $("#" + chkboxarray[i]).attr("aria-hidden", "true");
                }
                $("#" + chkboxarray[i]).next("label").after("<label class='ffreading'>" + labeltext + "</label>")

            }
        },

    }
})();
$(document).ready(function () {

    _Navigator.Initialize();
    //$("h1:first").focus();

    //if (_Settings.enableCache) {
    //    _Caching.InitAssetsCaching();
    //    _Caching.InitPageCaching();
    //}
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});