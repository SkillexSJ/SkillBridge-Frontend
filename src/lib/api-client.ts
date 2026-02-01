import { env } from "@/config/env";

// header type define
export type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// remove double slashes
const cleanPath = (path: string) => path.replace(/^\/+/, "");

async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
  retries = 2,
): Promise<T> {
  const { headers = {}, ...rest } = options;

  // FormData and JSON
  const contentTypeHeader: Record<string, string> =
    rest.body instanceof FormData ? {} : { "Content-Type": "application/json" };

  const defaultHeaders: Record<string, string> = {
    ...contentTypeHeader,
    ...headers,
  };

  const config: RequestInit = {
    cache: "no-store", // default to no-store
    ...rest,
    headers: defaultHeaders,
    credentials: "include",
  };

  // Fix URL Slash logic
  const baseUrl = env.API_URL.replace(/\/+$/, "");
  const url = `${baseUrl}/${cleanPath(endpoint)}`;

  try {
    const response = await fetch(url, config);

    // SAFE JSON PARSING
    let data: any = null;
    const contentType = response.headers.get("content-type");

    // Only parse JSON
    if (contentType && contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch (e) {
        console.error("Failed to parse JSON response");
        data = null;
      }
    }

    if (!response.ok) {
      // retry for  5xx error
      if (retries > 0 && (response.status >= 500 || response.status === 404)) {
        // wait korbo
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetcher(endpoint, options, retries - 1);
      }

      //non-JSON errors
      const errorMessage =
        data?.message || response.statusText || `Error ${response.status}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (error) {
    if (retries > 0 && !(error instanceof ApiError)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetcher(endpoint, options, retries - 1);
    }
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("API Request Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred",
    );
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    fetcher<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: any, options?: FetchOptions) =>
    fetcher<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: any, options?: FetchOptions) =>
    fetcher<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: any, options?: FetchOptions) =>
    fetcher<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    fetcher<T>(endpoint, { ...options, method: "DELETE" }),
};
