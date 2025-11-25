import axios from "axios";
import { enAuthReqType } from "../utils";

export async function AuthServices(reqType, params, reqBody, authData) {
    const mainRoute = "/api"
    const getRoute = `${process.env.APP_URL}/api/`;

    if (reqType === enAuthReqType.register) {
        const register = await axios.post(`${mainRoute}/auth/register`, reqBody)
        return register.data;
    } else if (reqType === enAuthReqType.login) {
        const login = await axios.post(`${mainRoute}/auth/login`, reqBody)
        return login.data;
    } else if (reqType === enAuthReqType.logout) {
        const logout = await axios.post(`${mainRoute}/auth/logout`, reqBody)
        return logout.data;
    } else if (reqType === enAuthReqType.me) {
        const res = await fetch(`https://vits-cat-931d.vercel.app/api/auth/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authData}`
            }
        });
        const data = await res.json();
        return data;
    }
}