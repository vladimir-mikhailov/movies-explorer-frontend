const handleResponse = (res) => res.ok ? res.json() : res.json().then(Promise.reject.bind(Promise));

export default handleResponse;
