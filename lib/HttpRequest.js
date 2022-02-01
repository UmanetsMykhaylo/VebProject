define('httpRequest', [], function() {
  const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT: 'PUT'
  };
  const RESPONSE_TYPE = 'json';

  class HttpRequest {
    constructor({ baseUrl, headers }) {
      this.baseUrl = baseUrl;
      this.headers = headers;

      this.interceptor = {
        request: [],
        response: []
      };

      this.interceptor.request.use = cb => {
        this.interceptor.request.push(cb);
      };

      this.interceptor.response.use = cb => {
        this.interceptor.response.push(cb);
      };
    }

    get(url, config) {
      return this.request({ ...config, method: HTTP_METHODS.GET, url });
    }

    post(url, data, config) {
      return this.request({ ...config, method: HTTP_METHODS.POST, url, data });
    }

    delete(url, config) {
      return this.request({ ...config, method: HTTP_METHODS.DELETE, url });
    }

    request(config) {
      const req = new XMLHttpRequest();
      const { method, data, url, params, headers, onDownloadProgress, onUploadProgress,
        responseType, transformResponse } = config;
      const newUrl = new URL(url, this.baseUrl);

      req.responseType = responseType || RESPONSE_TYPE;

      if (params) {
        newUrl.search += new URLSearchParams(params);
      }

      if (onDownloadProgress) {
        req.onprogress = onDownloadProgress;
      }

      if (onUploadProgress) {
        req.upload.onprogress = onUploadProgress;
      }

      return new Promise((resolve, reject) => {
        req.open(method, newUrl);

        const header = Object.assign({}, this.headers, headers);

        for (const value in header) {
          req.setRequestHeader(value, header[value]);
        }

        req.onload = () => {
          let resultResponse = req;

          if (this.interceptor.response.length > 0) {
            this.interceptor.response.forEach(fn => {
              resultResponse = fn(req);
            });
          }

          const result = (transformResponse && req.status >= 200 &&
    req.status < 300 && resultResponse.response) ? transformResponse.reduce((acc, func) => func(acc), resultResponse.response) : resultResponse.response;

          resolve({
            method,
            response: result,
            url: newUrl,
            headers: header,
            status: req.status
          });
        };

        req.onerror = () => {
          reject(new Error(`${method}${this.baseUrl}${url}${req.status}`));
        };

        req.send(data);
      });
    }
  }

  return HttpRequest;
});