var save = false, positions = [], shopEvent = { x: 0, y: 0, scrollTop: 0, scrollLef: 0, action: "", s: [], datetime: new Date(), page: '' }
var send = 0; check_redirect = false;
var set = false; var socket;
var coordinates = [],
    mousePos,
    heatMap = [];
var events = [], session_id = 0;
$(document).ready(() => {

    var script = '<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>'
    $('head').prepend(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    var script = '<script  src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>';  // set its src to the provided UR L
    var link = ' <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />';
    $('head').prepend(script);
    //save_session()
    //setInterval(record, 500);
    $('head').prepend(link);
    //loadAdditionJs()
    save_session()
    setInterval(record, 500);

    $(window).bind("beforeunload", function () {
        console.log('change page')
        var shop = window.location.hostname;
        if (window.location.pathname != '/') {
            shop = window.location.hostname + window.location.pathname
        }
        var data = JSON.stringify({
            heat_map: heatMap,
            shop: shop,
            page: window.location.hostname + window.location.pathname
            //script: scripts
            // script: ""
        });
        navigator.sendBeacon('https://ededf3f8.ngrok.io/api/page/sendHeatMap', data);
    })
    document.onmousemove = handler;
    //setInterval(getMousePosition, 100); // setInterval repeats every X ms
    $(document).mousemove(function (event) {
        handler(event)
        getMousePosition();
    })

    setInterval(function () {
        fetch('https://ededf3f8.ngrok.io/api/session/save/resave', {
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
    }, 333333 * 1000);


    // function save() {
    //     const body = JSON.stringify(events);
    //     events = [];
    //     fetch('http://localhost:8889/api', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         body,
    //     });
    // }
    //setInterval(save, 0.3 * 1000);

    setInterval(function () {
        fetch('https://ededf3f8.ngrok.io/api/session/save/resave', {
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
function getGroupedData() {
    var positions = coordinates
    var grouped = [];
    positions.map(function (pos, index) {
        var filtered = positions.filter(function (obj) {
            return (obj.x == pos.x && obj.y == pos.y)
        })

        var group = Object.assign({}, pos, { value: filtered.length });

        if (grouped.indexOf({ x: group.x, y: group.y }) == -1) {
            grouped.push(group);
        }
    });
    heatMap = grouped;
    //localStorage.setItem('heatMap', JSON.stringify(grouped));
    const body = JSON.stringify(grouped);


}
function getMousePosition() {
    var pos = mousePos;
    if (pos) {
        coordinates.push({ x: pos.x, y: pos.y });
    }
    //localStorage.setItem('coordinates', JSON.stringify(coordinates));
    getGroupedData();
}

// function record() {
   

//     rrweb.record({
//         emit(event) {
//             events.push(event);
//         },
//     });

//     function save() {
//         const body = JSON.stringify(events);
//         console.log(events);
//         events = [];
//         fetch('http://ededf3f8.ngrok.io/api', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body,
//         });
//     }
//     setInterval(save, 0.2 * 10000);
// }
function loadAdditionJs() {
    var script = document.createElement("script");  // create a script DOM node
    script.src = 'https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js';  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    var link = ' <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css" />';
    $('head').append(link);
}
function record() {
    // let events = []
    rrweb.record({
        emit(event) {
            events.push(event);
        },
    });
    function save() {
        // const body = JSON.stringify(events);
        //console.log(events);
        console.log(session_id)
        if (session_id != 0) {
            const body = events;
            events = [];
            $.ajax({
                url: 'http://localhost:8888/api/video/sendVideo',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    session_id: session_id,
                    video: body,
                    shop: window.location.hostname
                }),
                complete: function () {
                    window.positions = [];
                },
                success: function (data) {
                    window.positions = [];
                }
            }).done(function () {
                console.log('ok');
            })
        }

    }
    setInterval(save, 0.1 * 10000);
}
function handler(event) {
    var dot,
        eventDoc,
        doc,
        body,
        pageX,
        pageY;

    event = event || window.event; // IE-ism

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    mousePos = {
        x: event.pageX,
        y: event.pageY
    };
}

function save_session(set) {
    if (!save) {
        if (document.visibilityState === 'visible') {
            fetch('https://ededf3f8.ngrok.io/api/session', {
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
                        page_id: json.page_id,
                        shop: window.location.hostname,
                        page_url: window.location.href,
                        operating_system_id: getOS(),
                        device_type_id: getDevice(),
                        browser_id: getBrowser(),
                        acquistion_id: getReference(),
                        video: ''
                    }
                    session_id = json.session_id;
                    console.log(infor_tab);
                    socket = io.connect("https://ededf3f8.ngrok.io");
                    connect_socket(socket, infor_tab);

                    /*socket here
     
                    */
                })
            save = true
        }
    }
}
function connect_socket(socket, infor_tab) {


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
    else if (os == 3) {
        if ('ontouchstart' in window | (navigator.msMaxTouchPoints > 0)) device = 1//'tablet'
        else device = 3 //'desktop'
    } else if (os == 2) device = 3 //'desktop'
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