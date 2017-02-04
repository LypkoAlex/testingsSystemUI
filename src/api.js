import queryString     from 'query-string';
import { beUrl } from '../etc/config.json';

// const beUrl = 'http://104.131.48.6:8080/api/v1';

export async function post(url, data = {}) {
    return await request({ url, method: 'POST', data });
}

export async function postMultipart(url, data = {}) {
    return await requestXHR({ url, method: 'POST', data });
}

export async function get(url, params) {
    const query = params ? `?${queryString.stringify(params)}` : '';

    return await request({ url, method: 'GET', query });
}

export async function patch(url, data) {
    return await request({ url, method: 'PATCH', data });
}

export async function patchMultipart(url, data = {}) {
    return await requestXHR({ url, method: 'PATCH', data });
}

export async function del(url) {
    return await request({ url, method: 'DELETE', data: {} });
}

export async function request({ url, method, query, data }) {
    const token = query ? `&token=${localStorage.getItem('session')}` : `?token=${localStorage.getItem('session')}`;

    const resp = await fetch(
        `${beUrl}${url}${query ? query : ''}${token}`,
        {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            crossDomain: false,
            body: method !== 'GET' ? JSON.stringify({ data }) : undefined
        }
    );

    const json = await resp.json();

    return json.data;
}

export async function requestXHR({ url, method, data }) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line fetch/no-xhr
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        const token = `?token=${localStorage.getItem('session')}`;

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        xhr.onload = () => {
            try {
                const respData = statusCheck(JSON.parse(xhr.response));

                resolve(respData);
            } catch (error) {
                reject(error);
            }
        };

        xhr.open(method, `${beUrl}${url}${token}`);
        xhr.send(formData);
    });
}
