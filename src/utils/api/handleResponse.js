const handleResponse = (res) => res.ok ? res.json() : Promise.reject(res);

export default handleResponse;
