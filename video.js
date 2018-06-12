(function ($) {
    if (typeof ($.onestop) != "undefined" && typeof ($.onestop.videoPlayer) != "undefined") return;
    var videoplayer = function () {
        var self = this;

        this.player = null;
        this.currentVideoUrl = '';
        this.firstLoad = true;

        this.triggerVideo = function (videoUrl) {
            var videoAbsoluteUrl = "";

            if (videoUrl.slice(0, 7) !== 'http://' && videoUrl.slice(0, 8) !== 'https://' && videoUrl.slice(0, 2) !== '//') {
                videoAbsoluteUrl += '//';

                if (videoUrl.slice(0, window.location.hostname.length - 1) !== window.location.hostname) {
                    videoAbsoluteUrl += window.location.hostname;

                    if (videoUrl.slice(0, 1) !== '/')
                        videoAbsoluteUrl += '/';
                }
            }

            videoAbsoluteUrl += videoUrl;
            self.currentVideoUrl = videoAbsoluteUrl;
            $('#ViewVideo').modal('show');
        };
        this.loadVideo = function (videoUrl) {
            videoUrl = videoUrl || self.currentVideoUrl;
            self.player.jPlayer("setMedia", {
                m4v: videoUrl
            });
            self.player.jPlayer("load").jPlayer("play");
        }
        this.initialize = function (options) {
            self.player = options.player;
            $('#ViewVideo')
                .on('shown.bs.modal', function (e) {
                    self.loadVideo();
                })
                .on('hidden.bs.modal', function (e) {
                    self.player.jPlayer("clearMedia");
                });
        };
    };
    $.extend(true, {
        onestop: {
            fn: {
                VideoPlayer: videoplayer
            },

            videoPlayer: {
                initialize: function (options) {
                    $.onestop.videoPlayer.service = new $.onestop.fn.VideoPlayer();
                    $.onestop.videoPlayer.service.initialize(options);
                }
            }
        }

    });


})(jQuery);