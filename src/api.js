define('api', ['httpRequest', 'constants'], function(HttpRequest, { RESPONSE_TYPE }) {
  const http = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  http.interceptor.response.use(req => {
    if (req.status >= 400) {
      req.onerror();
    }

    return req;
  });

  const upload = (url, data, config) => http.post(url, data, config);
  const download = (link, config) => http.get(`/files/${link}`, { responseType: RESPONSE_TYPE.typeBlob, ...config });
  const getFilesList = (link, config) => http.get(`${link}`, { responseType: RESPONSE_TYPE.typeJson, ...config });
  const deleteFile = (link, config) => http.delete(`${link}`, { responseType: RESPONSE_TYPE.typeJson, ...config });

  return { upload, download, getFilesList, deleteFile };
});
