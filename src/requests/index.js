import request from "@/requests/request";

const ak = 'ak码'

export function getPlaceList(pageSize, currentPage) {
    return request({
        url: '/place/v2/search?query=美食&tag=美食&region=杭州&output=json&scope=2&ak=' + ak +
            '&page_size=' + pageSize + '&page_num=' + currentPage + "&city_limit=true",
        method: 'GET',
    })
}

export function getDetailedInfo(uid) {
    return request({
        url: '/place/v2/detail?uid=' + uid + '&output=json&scope=2&ak=' + ak,
        method: 'GET',
    })
}

export function getRoutesInfo(transportType, origin, destination, origin_uid, destination_uid) {
    return request({
        url: '/directionlite/v1/' + transportType,
        method: 'GET',
        params: {
            origin: origin.lat + ',' + origin.lng,
            destination: destination.lat + ',' + destination.lng,
            ak: ak,
            origin_uid: origin_uid === null ? '' : origin_uid,
            destination_uid: destination_uid === null ? '' : destination_uid,
        },
    })
}
