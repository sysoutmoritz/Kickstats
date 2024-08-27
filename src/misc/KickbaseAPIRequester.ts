import isTokenValid from "../components/TokenChecker"
import useLocalStorage from "use-local-storage";

const baseURL = "https://api.kickbase.com"

async function postRequest(url: string, body: object) {
    const [cookie, setCookie] = useLocalStorage("token", "");
    if(cookie && isTokenValid()) {
        const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cookie": cookie,
        },
        body: JSON.stringify(body),
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}
}

async function getRequest(url: string) {
    const [cookie, setCookie] = useLocalStorage("token", "");
    if(cookie && isTokenValid()) {
        const response = await fetch(baseURL + url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cookie": cookie,
        },
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}
}