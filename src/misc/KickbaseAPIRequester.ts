

const baseURL = "https://api.kickbase.com"

export async function postRequest(url: string, cookie:string, body: object) {
    if(cookie) {
        console.log("requesting at", baseURL + url, "with token", cookie);
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

export async function getRequest(url: string, cookie:string) {
    if(cookie) {
        console.log("requesting at", baseURL + url, "with token", cookie);
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