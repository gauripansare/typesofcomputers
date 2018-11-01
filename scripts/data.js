ColorCodes = {
    black: "#00000",
    white: "#FFFFFF",
    red: "#B22222",
    green: "#01662C",
    blue: "#4E7092",
}

var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CurClientWidth = window.innerWidth;
var Macbrowser = navigator.userAgent.indexOf('Chrome');
var Macos = navigator.userAgent.indexOf('Mac');
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isIpad = userAgentCustom.match(/iPad/i)
var isIphone = (navigator.userAgent.match(/iPhone/i))
var isIEEdge = /Edge/.test(navigator.userAgent)
var isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)
var animTime = 1000;

if (isIphone != null) {
animTime = 3000;
}

var _Settings = {
    dataRoot: "pagedata/",
    assetsRoot: "assets/",
    enableCache: true,
    topMargin: 144,
    minHeight: 437
}


var _PData = {
    "p2": {
        checkbox: [
            "c1","c2"
        ],
        radio: "radio6",      
        correctfeedback: "feedbckcp1.htm",
        incorrectfeedback: "feedbckip1.htm",
        incorrectfeedback1: "feedbcki2p1.htm",
        partialfeedback: "feedbckpp1.htm",
        partialfeedback1:"feedbckp1p1.htm",
        score: 3

    },
    "p3": {
        checkbox: [
            "c4", "c5"
        ],
        radio: "radio2",
        correctfeedback: "feedbckcp2.htm",
        incorrectfeedback: "feedbckip2.htm",
        incorrectfeedback1: "feedbcki2p2.htm",
        partialfeedback: "feedbckpp2.htm",
        partialfeedback1: "feedbckp1p2.htm",
        score: 3
    },
    "p4": {
        checkbox: [
            "c1", "c6"
        ],
        radio: "radio5",
        correctfeedback: "feedbckcp3.htm",
        incorrectfeedback: "feedbckip3.htm",
        incorrectfeedback1: "feedbcki2p3.htm",
        partialfeedback: "feedbckpp3.htm",
        partialfeedback1: "feedbckp1p3.htm",
        score:3
    },
    "p5": {
        checkbox: [
            "c3", "c5"
        ],
        radio: "radio1",
        correctfeedback: "feedbckcp4.htm",
        incorrectfeedback: "feedbckip4.htm",
        incorrectfeedback1: "feedbcki2p4.htm",
        partialfeedback: "feedbckpp4.htm",
        partialfeedback1: "feedbckp1p4.htm",
        score:3
    },
    "p6": {
        checkbox: [
            "c3", "c6"
        ],
        radio: "radio3",
        correctfeedback: "feedbckcp5.htm",
        incorrectfeedback: "feedbckip5.htm",
        incorrectfeedback1: "feedbcki2p5.htm",
        partialfeedback: "feedbckpp5.htm",
        partialfeedback1: "feedbckp1p5.htm",
        score:3
    },
    "p7": {
        checkbox: [
            "c1", "c5"
        ],
        radio: "radio4",
        correctfeedback: "feedbckcp6.htm",
        incorrectfeedback: "feedbckip6.htm",
        incorrectfeedback1: "feedbcki2p6.htm",
        partialfeedback: "feedbckpp6.htm",
        partialfeedback1: "feedbckp1p6.htm",
        score:3
    }
   
}

