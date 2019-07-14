var save = false, positions = [], shopEvent = { x: 0, y: 0, scrollTop: 0, scrollLef: 0, action: "", s: [], datetime: new Date(), page: '' }
var send = 0; check_redirect = false;
var set = false; var socket;
$(document).ready(() => {

    var script = '<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>'
    $('head').prepend(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    save_session()
    setInterval(function () {
        fetch('https://df085892.ngrok.io/api/session/save/resave', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, cors, *same-origin
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("OK")
        })
    }, 1000 * 3555);
})
document.addEventListener('visibilitychange', () => {
    save_session();

});
function loadAdditionJs() {

}
function save_session(set) {
    if (!save) {
        if (document.visibilityState === 'visible') {
            fetch('https://df085892.ngrok.io/api/session', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, cors, *same-origin
                // credentials: 'include', // include, *same-origin, omit
                body: JSON.stringify(getInfor()),
                // mode: 'no-cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(data => data.json())
                .then(json => {
                    let infor_tab = {
                        session_id: json.session_id,
                        session_page_id: json.session_page_id,
                        page_id: json.page_id
                    }
                    console.log(infor_tab);
                    connect_socket(infor_tab);
                    
                    // track event
                    $(document).mousemove(function (event) {
                        trackEvent(event, 1, json.session_id, json.session_page_id);
                    });
                    $(document).click(function (event) {
                        trackEvent(event, 2, json.session_id, json.session_page_id)
                    });

                    $("select").on('change', function (i, e) {
                        trackEvent(null, 4, json.session_id, json.session_page_id);
                    });
                    trackChangePage(json.session_id, json.session_page_id);
                    /*socket here
     
                    */
                })
            save = true
        }
    }
}
function connect_socket(infor_tab) {

    socket = io.connect("https://df085892.ngrok.io");
    socket.emit("client-send-session", JSON.stringify(infor_tab));

}
function getInfor() {
    var infor = {
        url: window.location.pathname,
        domain: window.location.hostname,
        operating_system_id: getOS(),
        device_type_id: getDevice(),
        browser_id: getBrowser(),
        acquistion_id: getReference()
    }
    return infor
}
function getReference() {
    var ref = document.referrer;
    var res;
    if (/facebook.com|twitter.com/.test(ref)) res = 1 //'Social'
    else if (/google.com|bing.com/.test(ref)) res = 2 //'Search'
    else if ('' == ref || (ref.indexOf(window.location.hostname) > 0)) res = 3 //'Direct'
    else res = 4 //'Other'
    return res;
}
function getOS() {
    var macOS = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    var windowsOS = ['Win32', 'Win64', 'Windows', 'WinCE']
    var iOS = ['iPhone', 'iPad', 'iPod']
    var ua = window.navigator.userAgent
    var platform = window.navigator.platform
    var os = null;

    if (/Android/.test(ua)) os = 1//'Android' android platform will display linux ....
    else if (macOS.indexOf(platform) != -1) os = 2 //'MacOS'
    else if (windowsOS.indexOf(platform) != -1) os = 3 //'Windows'
    else if (iOS.indexOf(platform) != -1) os = 4 //'iOS'
    else if (/Linux/.test(platform)) os = 5 //'Linux'
    else os = 6 //'Others'
    return os
}
function getDevice() {
    var ua = window.navigator.userAgent
    var platform = window.navigator.platform
    var mobile = /mobile/i
    var device = null
    var os = getOS();
    if (/iPad/i.test(platform)) device = 1 //'tablet'
    else if (mobile.test(ua)) device = 2 //'mobile'
    else if (/Android/i.test(ua)) device = 1 //'tablet'
    else if (os==3) {
        if ('ontouchstart' in window | (navigator.msMaxTouchPoints > 0)) device = 1//'tablet'
        else device = 3 //'desktop'
    } else if (os==2) device = 3 //'desktop'
    else device = 4 //'others'
    return device
}
function getBrowser() {
    var ua = window.navigator.userAgent
    var browser = null
    if (/OPR\/|OPERA\//i.test(ua)) browser = 1 //'Opera'
    else if (/Edge\/|EdgA\//i.test(ua)) browser = 2 //'Edge'
    else if (/Firefox\//i.test(ua)) browser = 3 //'Firefox'
    else if (/Chrome\/|CriOS\//i.test(ua)) browser = 4 //'Chrome or chromium' //CriOS on ios
    else if ((getOS() == 2 || getOS() == 4)) {
        if (/version\//i.test(ua)) browser = 5 //'Safari'
    }
    else if (/MSIE|Trident/i.test(ua)) browser = 6 //'Internet Explorer'
    else browser = 7 //'Others'
    return browser;
}
function startRecord(data, session_id, session_page_id) {
    //console.log("length of positions:" + data.length);
    if (positions.length == 500) {
        var scripts = "";
        var script = document.getElementsByTagName("script");
        for (var i = 0; i < script.length; i++) {
            scripts += script[i].src + "\n";
        }


        // sendImage();
        $.ajax({
            url: 'https://df085892.ngrok.io/api/video/sendVideo',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                positions: positions,
                // web_page: document.getElementsByTagName('html')[0].innerHTML,
                //web_page:"",
                url: window.location.pathname == '/' ? '' : window.location.pathname,
                shop: window.location.hostname,
                session_id: session_id,
                is_image: false,
                session_page_id: session_page_id,
                is_change_page: false,
                is_redirect: check_redirect
                //script: scripts
                // script: ""
            }),
            complete: function () {
                window.positions = [];
            },
            success: function (data) {
                window.positions = [];
            }
        }).done(function () {
            alert("second success");


        })
        window.positions = [];
    }
}
function trackSelect() {
    console.log($("select option:selected").text() + "-");
    // var text = "1,2,3";
    var text = [];
    $("select option:selected").each(function (i, e) {
        if ($(this).length) {
            text.push($(this).val());
        }
    });
    console.log(text);
    return text;
}
function trackEvent(event, action, session_id, session_page_id) {
    // get pageX, pageY of visitors
    shopEvent["x"] = event == null ? 0 : event.pageX;
    shopEvent["y"] = event == null ? 0 : event.pageY;
    //action-1: mousemove, action-2: click, action-4: change select
    if (action == 2 || action == 4) {
        shopEvent["x"] = 0;
        shopEvent["y"] = 0;
        shopEvent['s'] = trackSelect();
    }
    shopEvent["scrollTop"] = $(window).scrollTop() == 0 ? 0 : $(window).scrollTop() + 60;
    shopEvent["scrollLeft"] = $(window).scrollLeft() + 10;
    shopEvent["action"] = action;
    shopEvent["datetime"] = new Date().getTime() / 1000;
    shopEvent["page"] = window.location.pathname;
    //  shopEvent['s'] = trackSelect();
    positions.push(shopEvent);
    //console.log(positions);
    shopEvent = {};
    startRecord(positions, session_id, session_page_id);
}
function trackChangePage(session_id, session_page_id) {
    var url_redirect;
    $("body a").click(function () {
        url_redirect = $(this).attr('href');
        window.localLinkClicked = true;
    });
    $(window).bind("beforeunload", function () {
        if (typeof url_redirect === 'undefined') {
            url_redirect = window.location.pathname;
            check_redirect = true
        }
        url_redirect = url_redirect == '/' ? '' : url_redirect;
        $.ajax({
            url: 'https://df085892.ngrok.io/api/video/sendVideo',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                positions: positions,
                url_redirect: url_redirect,
                session_id: session_id,
                session_page_id: session_page_id,
                is_image: false,
                is_change_page: true,
                is_redirect: check_redirect,
                url: window.location.pathname == '/' ? '' : window.location.pathname
                //script: scripts
                // script: ""
            }),
            complete: function () {
                window.positions = [];
            },
            success: function (data) {
                window.positions = [];
            }
        }).done(function () {
            alert("second success");


        })
    })
}
