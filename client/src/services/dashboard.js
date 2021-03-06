import axios from "axios";

// eslint-disable-next-line camelcase
export async function getSession(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/session/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}
// eslint-disable-next-line camelcase
export async function getSessionsLastWeek(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/session/lastweek/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getLocation(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/location/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getSessionsByDate(shop_url, startDate, endDate) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/session/day/${shop_url}/${startDate}/${endDate}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getSessionsLastMonth(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/session/lastmonth/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getVisitor(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/visitors/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getAvgDurationSession(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/avgduration/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getTotalPageView(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/pageview/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getOldVistor(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/oldvisitors/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getAcquistionSocial(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/acquistion/social/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getAcquistionSearch(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/acquistion/search/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getAcquistionDirect(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/acquistion/direct/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getAcquistionOther(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/acquistion/other/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getNewVisitors(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/newvisitors/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getDeviceDesktop(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/device/desktop/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getUserBrowser(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/user_browser/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getUserDevice(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/user_device/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getUserOS(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/user_OS/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getDeviceMobile(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/device/mobile/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getDeviceTablet(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/device/tablet/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getDeviceOther(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/device/other/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getNewVisiorLastWeek(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/newvisitor/lastweek/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getOldVisiorLastWeek(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/oldvisitor/lastweek/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getVisitorLastWeek(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/visitor/lastweek/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getVisitorLastMonth(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/newvisitor/lastmonth/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}
// eslint-disable-next-line camelcase
export async function getAcquistionTable(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/acquisition/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}
// eslint-disable-next-line camelcase
export async function getBounceRate(shop_url) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/audience/bouncrate/${shop_url}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getVisitorByDate(shop_url, start, end) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/count/visitor/date/${shop_url}/${start}/${end}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}
// eslint-disable-next-line camelcase
export async function getAcquisitionByDate(shop_url, start, end) {
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/acquisition/date/${shop_url}/${start}/${end}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}

// eslint-disable-next-line camelcase
export async function getAudienceByDate(shop_url, start, end) {
    console.log(start)
    // eslint-disable-next-line camelcase
    const url = `http://localhost:8888/api/stats/audience/information/${shop_url}/${start}/${end}`
    return axios.get(url)
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(err.response.statusText)
        })
}
