var save = false

$(document).ready(() => {
    save_session()
    while(infor_tab!=null){
        console.log(infor_tab)
    }
    setInterval(function () {
        fetch('https://ea49b576.ngrok.io/api/session/save/resave', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log("OK")
        })
    }, 1000 * 15);
})
document.addEventListener('visibilitychange', () => {
    save_session()
});
function save_session() {
    if (!save) {
        if (document.visibilityState === 'visible') {
            fetch('https://ea49b576.ngrok.io/api/session', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify(getInfor()),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(data=>data.json())
            .then(json=>{
                let infor_tab = {
                    session_id: json.session_id,
                    session_page_id: json.session_page_id
                }
                /*socket here

                */
            })
            save = true
        }
    }
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
    else if (/Windows/.test(os)) {
        if ('ontouchstart' in window | (navigator.msMaxTouchPoints > 0)) device = 1//'tablet'
        else device = 3 //'desktop'
    } else if (/MacOS/.test(os)) device = 3 //'desktop'
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
    else if ((getOS() == 'iOS' || getOS() == 'MacOS')) {
        if (/version\//i.test(ua)) browser = 5 //'Safari'
    }
    else if (/MSIE|Trident/i.test(ua)) browser = 6 //'Internet Explorer'
    else browser = 7 //'Others'
    return browser;
}