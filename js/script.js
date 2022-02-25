!function($) {
    "undefined" != typeof NodeList && NodeList.prototype && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach),
    document.querySelectorAll(".ga-ce").forEach((function(e, i) {
        e.addEventListener("click", (function() {
            var category = this.dataset.category ? this.dataset.category : null
              , action = this.dataset.action ? this.dataset.action : null
              , label = this.dataset.label ? this.dataset.label : null
              , value = this.dataset.value ? this.dataset.value : 1;
            window.ga && ga.create && ga("send", "event", category, action, label, value, null)
        }
        ))
    }
    ));
    ({
        triggers: $(".share-popup"),
        init: function() {
            var self = this;
            self.triggers.click((function(e) {
                e.preventDefault(),
                self.popup($(this).attr("href"))
            }
            ))
        },
        popup: function(target) {
            popupWindow = window.open(target, "", "width=600,height=400"),
            popupWindow.focus()
        }
    }).init();
    var system = {
        view: $(".screen"),
        bios: $(".screen .bios"),
        started: !1,
        loading: {
            audio: !1,
            video: !1
        },
        ambientAudio: new Audio("sound/ambient.mp3"),
        audioPlayer: document.createElement("audio"),
        text: ["<p>LEW-OS</p><p>Copyright (c) 2021. All Rights Reserved</p><p>BIOS Version: 2021062221 Revision 01 Beta</p><br />", "<p>Initializing USB Controllers ... Done</p>", "<p>Memory Test: 1998K OK</p><br /><br />", "<p>Press Any Key to boot system</p>"],
        init: function() {
            var self = this;
            self.setBodyHeight();
            var agent = navigator.userAgent.toLowerCase();
            self.isIPhone = -1 != agent.indexOf("iphone"),
            self.displayTime(),
            setTimeout((function() {
                self.boot()
            }
            ), 100),
            $(window).on("keyup click", (function(e) {
                system.started || (self.bios.hide(),
                self.setLoading(!0),
                setTimeout((function() {
                    $(".login").addClass("loaded"),
                    self.setLoading(!1)
                }
                ), 1500),
                self.isIPhone || (self.ambientAudio.play(),
                $(self.ambientAudio).animate({
                    volume: .2
                }, 3e3)),
                system.started = !0)
            }
            )),
            self.ambientAudio.loop = !0,
            self.ambientAudio.volume = 0,
            self.ambientAudio.addEventListener("timeupdate", (function() {
                this.currentTime > this.duration - .44 && (this.currentTime = 0,
                this.play())
            }
            )),
            $(self.audioPlayer).on("ended", (function() {
                self.stopTrack()
            }
            )),
            $(self.audioPlayer).on("stalled", (function() {
                this.load()
            }
            )),
            $("#video").on("stalled", (function() {
                this.load()
            }
            )),
            "mediaSession"in navigator && (navigator.mediaSession.setActionHandler("pause", ()=>{
                self.pauseTrack()
            }
            ),
            navigator.mediaSession.setActionHandler("play", ()=>{
                self.resumeTrack()
            }
            ),
            navigator.mediaSession.setActionHandler("seekto", details=>{
                self.audioPlayer.currentTime = details.seekTime
            }
            ))
        },
        setBodyHeight: function() {
            $("body").css("height", window.innerHeight),
            setTimeout(this.setBodyHeight, 100)
        },
        setLoading: function(state) {
            state ? $("body").addClass("loading") : $("body").removeClass("loading")
        },
        formatAMPM: function(date) {
            var hours = date.getHours()
              , minutes = date.getMinutes()
              , ampm = hours >= 12 ? "PM" : "AM";
            return (hours = (hours %= 12) || 12) + ":" + (minutes = minutes < 10 ? "0" + minutes : minutes) + ampm + "<span> - " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()] + ". " + date.getDate() + ", 2021</span>"
        },
        displayTime: function() {
            var self = this
              , time = self.formatAMPM(new Date);
            $("#time").html(time),
            setTimeout((function() {
                self.displayTime()
            }
            ), 1e3)
        },
        boot: function() {
            var self = this;
            self.isIPhone && $(".hide-on-ios").hide(),
            $("body").addClass("crt"),
            self.view.fadeIn(100, (function() {
                $.each(self.text, (function(i, e) {
                    setTimeout((function() {
                        self.bios.append(e)
                    }
                    ), 500 * i)
                }
                ))
            }
            ))
        },
        toggleAmbientSound: function(status) {
            status ? $(this.ambientAudio).animate({
                volume: .2
            }, 3e3) : $(this.ambientAudio).animate({
                volume: 0
            }, 8e3)
        }
    };
    system.init(),
    $(".navbar .item.submenu button").on("click", (function(e) {
        $(this).parent(".submenu").hasClass("active") ? $(".navbar .item.submenu.active").removeClass("active") : ($(".navbar .item.submenu.active").removeClass("active"),
        $(this).parent(".submenu").addClass("active"))
    }
    )),
    $("body").on("click", (function(e) {
        $(e.target).closest(".item.submenu.active").length <= 0 && $(".navbar .item.submenu.active").removeClass("active"),
        $(e.target).closest(".dialog, .navbar").length <= 0 && $(".dialog").css("display", "none").html(""),
        $(".file").removeClass("active")
    }
    )),
    $(".disabled").on("click", (function(e) {
        e.preventDefault()
    }
    )),
    $("#about").on("click", (function(e) {
        e.preventDefault(),
        $(".navbar .item.submenu.active").removeClass("active");
        $(".dialog").html("<div><p>I am a human experience architect based out of Michigan. <br> I design and build beautiful experiences that inspire users. <br> Over the last 6 years I have worked in the intersection of design and technology with the goal of personal and professional achievement and the desire to bring positive developments to the world of technology.</p></div>").css("display", "flex")
    }
    ))
    $("#fullscreen").on("click", (function(e) {
        e.preventDefault(),
        $(".navbar .item.submenu.active").removeClass("active");
        var elem = document.documentElement;
        $("body").hasClass("fullscreen") ? (document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen(),
        $("body").removeClass("fullscreen")) : (elem.requestFullscreen ? elem.requestFullscreen() : elem.mozRequestFullScreen ? elem.mozRequestFullScreen() : elem.webkitRequestFullscreen ? elem.webkitRequestFullscreen() : elem.msRequestFullscreen && elem.msRequestFullscreen(),
        $("body").addClass("fullscreen"))
    }
    )),
    $("#restart").on("click", (function(e) {
        e.preventDefault(),
        location.reload()
    }
    )),
    $("#print").on("click", (function(e) {
        $(".navbar .item.submenu.active").removeClass("active"),
        e.preventDefault(),
        window.print()
    }
    )),
    $("#switchfiles").on("click", (function(e) {
        e.preventDefault(),
        $(".navbar .item.submenu.active").removeClass("active"),
        $(this).toggleClass("invert"),
        $("body").toggleClass("show-hidden-files")
    }
    )),
    $("#folder1").on("click", (function(e) {
        e.preventDefault(),
        $(".finder.portfolio").addClass("focus").show("slow"),
        $(this).addClass("active")
    }
    )),
    $("#folder2").on("click", (function(e) {
        e.preventDefault(),
        $(".finder.skills").addClass("focus").show("slow"),
        $(this).addClass("active")
    }
    )),
    $("#cover-letter").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.cover-letter").addClass("focus").show("slow")
    }
    )),
    $("#readme").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.readme").addClass("focus").show("slow")
    }
    )),
    /* Skills */
    $("#html").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.html").addClass("focus").show("slow")
    }
    )),
    $("#css").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.html").addClass("focus").show("slow")
    }
    )),
    $("#js").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.js").addClass("focus").show("slow")
    }
    )),
    $("#accessibility").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.accessibility").addClass("focus").show("slow")
    }
    )),
    $("#UI").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.UI").addClass("focus").show("slow")
    }
    )),
    $("#macOS").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.macOS").addClass("focus").show("slow")
    }
    )),
    $("#iOS").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.iOS").addClass("focus").show("slow")
    }
    )),
    $("#wordpress").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.wordpress").addClass("focus").show("slow")
    }
    )),
    $("#languages").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.languages").addClass("focus").show("slow")
    }
    )),
    /* Portfolio */
    $("#soundwriting").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.soundwriting").addClass("focus").show("slow")
    }
    )),
    $("#playnows").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.playnows").addClass("focus").show("slow")
    }
    )),
    $("#freelance").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.freelance").addClass("focus").show("slow")
    }
    )),
    $("#em360").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.em360").addClass("focus").show("slow")
    }
    )),
    $("#woether").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.woether").addClass("focus").show("slow")
    }
    )),
    $("#people-science").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.people-science").addClass("focus").show("slow")
    }
    )),
    $("#resume").on("click", (function(e) {
        e.preventDefault(),
        e.stopPropagation(),
        $(".finder.resume").addClass("focus").show("slow")
    }
    )),
    $(".finder .close").on("click", (function(e) {
        e.preventDefault(),
        $(this).closest(".finder").hide()
    }
    )),
    $(".finder").on("mousedown click", (function(e) {
        $(".finder.focus").removeClass("focus"),
        $(this).addClass("focus")
    }
    )),
    $(".finder").each((function(i, e) {
        !function(elmnt) {
            var pos1 = 0
              , pos2 = 0
              , pos3 = 0
              , pos4 = 0;
            $(elmnt).find(".header").get(0) ? ($(elmnt).find(".header").get(0).onmousedown = dragMouseDown,
            $(elmnt).find(".header").get(0).ontouchstart = dragMouseDown) : (elmnt.onmousedown = dragMouseDown,
            elmnt.ontouchstart = dragMouseDown);
            function dragMouseDown(e) {
                if ((e = e || window.event).cancelable,
                e.touches)
                    var clientX = e.touches[0].pageX
                      , clientY = e.touches[0].pageY;
                else
                    clientX = e.clientX,
                    clientY = e.clientY;
                pos3 = clientX,
                pos4 = clientY,
                document.onmouseup = closeDragElement,
                document.ontouchend = closeDragElement,
                document.onmousemove = elementDrag,
                document.ontouchmove = elementDrag
            }
            function elementDrag(e) {
                if ((e = e || window.event).cancelable && e.preventDefault(),
                e.touches)
                    var clientX = e.touches[0].pageX
                      , clientY = e.touches[0].pageY;
                else
                    clientX = e.clientX,
                    clientY = e.clientY;
                pos1 = pos3 - clientX,
                pos2 = pos4 - clientY,
                pos3 = clientX,
                pos4 = clientY;
                var posY = elmnt.offsetTop - pos2 >= 28 ? elmnt.offsetTop - pos2 : 28
                  , posX = elmnt.offsetLeft - pos1 >= 0 ? elmnt.offsetLeft - pos1 : 0;
                elmnt.style.top = posY + "px",
                elmnt.style.left = posX + "px"
            }
            function closeDragElement() {
                document.onmouseup = null,
                document.ontouchend = null,
                document.onmousemove = null,
                document.ontouchmove = null
            }
        }(e)
    }
    ))
}(jQuery);
