import bcrypt from "bcryptjs"
import { jwtVerify } from "jose"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = parseInt(process.env.PASSWORD_SALT_ROUNDS || "10", 10)
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

export async function hashPassword(plain) {
    return bcrypt.hash(plain, SALT_ROUNDS)
}

export async function verifyPassword(plain, hash) {
    return bcrypt.compare(plain, hash)
}

export function signJwt(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// export function verifyJwt(token) {
//     try {
//         console.log("🔍 Middleware verifyJwt:", JWT_SECRET);
//         return jwt.verify(token, JWT_SECRET)
//     } catch (error) {
//         console.log("🔍 Middleware verifyJwt error:", error);
//         return null
//     }
// }

export async function verifyJwtEdge(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}