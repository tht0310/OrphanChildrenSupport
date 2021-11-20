import Result from "./Result";
import Axios, { AxiosRequestConfig } from "axios";
import axios from "axios";
import { transformUrl } from "domain-wait";
import queryString from "query-string";
import { isNode, showErrors } from "@Utils";
import SessionManager from "./session";

export interface IRequestOptions {
  url: string;
  data?: any;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

export interface ISendFormDataOptions {
  url: string;
  data: FormData;
  method: "POST" | "PUT" | "PATCH";
}

/**
 * Represents base class of the isomorphic service.
 */
export abstract class ServiceBase {
  /**
   * Make request with JSON data.
   * @param opts
   */
  public async requestJson<T>(opts: IRequestOptions): Promise<Result<T>> {
    let axiosResult = null;
    let result = null;
    try {
      opts.url = transformUrl(opts.url); // Allow requests also for the Node.

      const processQuery = (url: string, data: any): string => {
        if (data) {
          return `${url}?${queryString.stringify(data)}`;
        }
        return url;
      };

      let axiosRequestConfig: AxiosRequestConfig;

      if (isNode()) {
        const ssrSessionData = SessionManager.getSessionContext().ssr;
        const { cookie } = ssrSessionData;

        // Make SSR requests 'authorized' from the NodeServices to the web server.
        axiosRequestConfig = {
          headers: {
            Cookie: cookie,
          },
        };
      }

      if (!axiosRequestConfig) {
        axiosRequestConfig = {};
      }
      axiosRequestConfig.headers = {
        ...axiosRequestConfig.headers,
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      };

      try {
        switch (opts.method) {
          case "GET":
            axiosResult = await axios.get(processQuery(opts.url, opts.data), {
              headers: axiosRequestConfig.headers,
            });
            break;
          case "POST":
            axiosResult = await axios.post(opts.url, opts.data, {
              headers: axiosRequestConfig.headers,
            });
            break;
          case "PUT":
            axiosResult = await axios.put(opts.url, opts.data, {
              headers: axiosRequestConfig.headers,
            });
            break;
          case "PATCH":
            axiosResult = await axios.patch(opts.url, opts.data, {
              headers: axiosRequestConfig.headers,
            });
            break;
          case "DELETE":
            axiosResult = await axios.delete(
              processQuery(opts.url, opts.data),
              {
                headers: axiosRequestConfig.headers,
              }
            );
            break;
        }

        result = new Result<T>(
          axiosResult.data.value ?? axiosResult.data,
          axiosResult.data.errors && axiosResult.data.errors.length > 0
            ? [...axiosResult.data.errors]
            : null
        );
      } catch (error) {
        result = new Result(null, error.response.data);
      }

      if (result.hasErrors) {
        showErrors(...result.errors);
      }
    } catch (error) {
      result = new Result<T>(null, "loi truy xuat");
    }
    return result;
  }

  /**
   * Allows you to send files to the server.
   * @param opts
   */
  public async sendFormData<T>(opts: ISendFormDataOptions): Promise<Result<T>> {
    let axiosResult = null;
    let result = null;

    opts.url = transformUrl(opts.url); // Allow requests also for Node.

    const axiosOpts = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      switch (opts.method) {
        case "POST":
          axiosResult = await Axios.post(opts.url, opts.data, axiosOpts);
          break;
        case "PUT":
          axiosResult = await Axios.put(opts.url, opts.data, axiosOpts);
          break;
        case "PATCH":
          axiosResult = await Axios.patch(opts.url, opts.data, axiosOpts);
          break;
      }
      result = new Result<T>(
        axiosResult.data.value ?? axiosResult.data,
        axiosResult.data.errors && axiosResult.data.errors.length > 0
          ? [...axiosResult.data.errors]
          : null
      );
    } catch (error) {
      result = new Result(null, error.response.data);
    }
    if (result.hasErrors) {
      showErrors(...result.errors);
    }

    return result;
  }
}
