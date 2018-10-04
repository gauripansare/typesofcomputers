var _Caching = (function () {
    var local_assets = ['images/back-button-v2.png', 'images/barrelfish.png', 'images/barrelSticks.png', 'images/brush.png', 'images/castawaySprites.png', 'images/choppingSprites.png', 'images/down-chevron.png', 'images/firePit1.png', 'images/firePitGlow2.png', 'images/fishBarrelRaft.png', 'images/fishing1Sprites.png', 'images/flameHiSprites.png', 'images/friday-raftSprites.png', 'images/fridaySprites.png', 'images/gatheringSprites.png', 'images/icon-graph-format.png', 'images/icon-table-format.png', 'images/img-stranded-island.png', 'images/lowFlame.png', 'images/menu-icon.png', 'images/next-button-v2.png', 'images/pondFish.png', 'images/question.png', 'images/slider-arrow.png', 'images/stickBarrelRaft.png', 'images/up-chevron.png'];
    return {
        GetUrlExtension: function () {
            var urlextension = '';
            if (!_Settings.enableCache) {
                urlextension = "?npage=" + Math.random();
            }
            return urlextension;
        },
        InitPageCaching: function () {
            var _htmlData = _Navigator.Get();
            for (var i in _htmlData) {
                var pageUrl = _Settings.dataRoot + _htmlData[i].dataurl;
                this.Cache(pageUrl);
                if (_htmlData[i].questions.length > 0) {
                    for (var j = 0; j < _htmlData[i].questions.length; j++) {
                        var pageUrl = _Settings.dataRoot + _htmlData[i].questions[j].dataurl;
                        this.Cache(pageUrl);
                    }
                }
            }
        },
        InitAssetsCaching: function () {
            for (var k = 0; k < local_assets.length; k++) {
                var pageUrl = _Settings.assetsRoot + local_assets[k];
                this.Cache(pageUrl);
            }
        },
        Cache: function (url) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.send(null);
        }
    }
})();