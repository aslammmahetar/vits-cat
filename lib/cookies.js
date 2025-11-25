export function createAuthCookie(res, token) {
    const cookie = `${process.env.COOKIE_NAME}=${token}; Path=/' HttpOnly; SameSite=Lax; ${process.env.NODE_ENV === "production" ? "Secure" : ""}Max-Age=${7 * 24 * 60 * 60}`
    return cookie
}