
class Request {
    constructor() {
        this.response = []
    }

    async fetch(url) {
        const url = await fetch(url);
        const response = await url.json();
        return response;
    }

    async multipeFetch(url) {
        return await Promise.all(url)
            .then((res) => res.json())
            .then((res) => res)
            .catch(err => {
                throw new Error(err)
            });
    }
}

export default Request;