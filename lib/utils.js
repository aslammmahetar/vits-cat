
export const enUserTypes = {
    retail: 1,
    wholesaler: 2
}

export const enAuthReqType = {
    login: 1,
    register: 2,
    forgeotPassword: 3,
    resetPassword: 4,
    logout: 5,
    me: 6,
}

export function getGeoLocation() {
    return new Promise((res, rej) => {
        if (!navigator.geolocation) {
            return rej("Geolocation not supported by this browser!");
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            res({ lat: latitude, lng: longitude })
        },
            (err) => rej(err))
    })
}