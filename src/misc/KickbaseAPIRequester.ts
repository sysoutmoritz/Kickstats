const baseURL = "https://api.kickbase.com"


export async function getRequest(url: string, token: string) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}
}

export async function postRequest(url: string, token: string, body: object) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}
}

export async function getFetcherSWR([url, token]:Array<string>) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}

}

export async function getHistoryFetcherSWR([url, token, offsetLength]:[string, string, number]) {
    let list: any = []; //the list to save the data from the multiple requests
    let offset = 0; //offset increasing with every request
    let data; //the data for the current request
    if(token) {
        do {
            const response = await fetch(baseURL + url + "?start=" + offset, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
            },
            });
            if (response.status === 200) {
                data = await response.json();
                list = list.concat(data);
                offset += offsetLength;
            } else {
                window.alert("Request failed, please return to frontpage");
            }
        } while (data.it.length === 25);
    }
    let fullList = unrollHistoryList(list);
    return fullList;
}

function unrollHistoryList(history: any) {
    let historyList = history
      .map((trade: any) => {
        //map the full response only to the "it" (items) lists
        return trade.it;
      })
      .flat(); //flatten all the lists into one big list
    return historyList;
  }

export async function postFetcherSWR([url, token, body]:Array<any>) {
    if(token) {
        const response = await fetch(baseURL + url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
        });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            window.alert("Request failed, please return to frontpage");
        }
}

}