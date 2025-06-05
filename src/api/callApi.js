const callApi = async (method, url, parameters = {}, body = null) => {
    // turn parameters into a query string, create URL
    const params = new URLSearchParams(parameters).toString();
    const uri = `${url}?${params}`;

    // set options
    const options = {
        method: method,
        headers: {"Content-Type": "application/json"}
    };
    if (body) options.body = JSON.stringify(body);

    // fetch API, handle http error
    const response = await fetch(uri, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // return json
    return await response.json();
}

export default callApi;
