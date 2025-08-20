/**
 * Type definitions for @jetbrains/youtrack-scripting-api/http
 * Based on documentation: https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Api-Documentation.html
 */


/**
 * HTTP header interface
 */
export interface Header {
  name: string;
  value: string;
}

/**
 * A class that creates a definition for an HTTP response.
 * If an exception occurs during processing, most of the properties in the response object are empty.
 */
export class Response {
  /**
   * The HTTP status code that is assigned to the response.
   * If an exception occurs during processing, the property is empty.
   */
  code: number;

  /**
   * The exception that occurred during processing.
   */
  exception: object;

  /**
   * A collection of response headers.
   * If an exception occurs during processing, the collection is empty.
   */
  headers: Header[];

  /**
   * An indication of the success or failure for the request.
   * If the HTTP status code is between 200 (inclusive) and 400 (exclusive), this property is set to 'true'.
   */
  isSuccess: boolean;

  /**
   * The response body.
   * If an exception occurs during processing, the response body is empty (null).
   */
  body: string;

  /**
   * A byte stream representation of the response body.
   * If an exception occurs during processing, the property is empty (null).
   */
  responseAsStream: object;
}

/**
 * Query parameter interface
 */
export type QueryParams = Array<Header> | Record<string, string>;

/**
 * Multipart form data part interface
 */
export interface MultipartFormDataPart {
  /** Part name */
  name: string;
  /** Size of content in bytes */
  size: number;
  /** Filename for the part */
  fileName: string;
  /** Content of the part */
  content: unknown;
  /** Optional content type */
  contentType?: string;
}

/**
 * Multipart form data payload interface
 */
export interface MultipartFormDataPayload {
  /** Must be 'multipart/form-data' */
  type: 'multipart/form-data';
  /** Array of parts */
  parts: MultipartFormDataPart[];
}

/**
 * Valid HTTP request types
 */
export enum REQUEST_TYPES {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  CONNECT = 'CONNECT'
}

/**
 * Main class that is used to establish a connection and send requests to target sites.
 */
export class Connection {
  /**
   * A list of headers.
   */
  headers: Header[];

  /**
   * The URL of the target site for the connection.
   * Can be empty, as you can specify the URI as a parameter for any request method.
   */
  url: string;

  /**
   * Creates an object that lets you establish a connection with a target site.
   * @param url The URL of the target site for the connection. Can be empty, as you can specify the URI as a parameter for any request method.
   * @param sslKeyName Optional name of the SSL key that is used to establish a secure connection. If you don't want to specify this parameter, pass 'null'.
   * @param timeout Optional parameter that specifies the connection timeout for outgoing HTTP requests in milliseconds.
   */
  constructor(url: string, sslKeyName?: string | null, timeout?: number);

  /**
   * Adds a new header to the current connection.
   * The `value` parameter can also contain references to secrets stored in the settings for a YouTrack app.
   * @param header A header object with the structure {name: string, value: string}. If the value parameter is specified separately, the provided string is used as the name of the header.
   * @param value The value that is assigned to the header. Only considered when the first parameter is specified as a string.
   * @returns The current connection object.
   */
  addHeader(header: Header): Connection;
  addHeader(header: string, value: string): Connection;

  /**
   * Sets a header to the current connection. If the specified header already exists, its value is updated.
   * The `value` parameter can also contain references to secrets stored in the settings for a YouTrack app.
   * @param header A header object with the structure {name: string, value: string}. If the value parameter is specified separately, the provided string is used as the name of the header.
   * @param value The value that is assigned to the header. Only considered when the first parameter is specified as a string.
   * @returns The current connection object.
   */
  setHeader(header: Header): Connection;
  setHeader(header: string, value: string): Connection;

  /**
   * Adds an authorization header with the value returned by the Base64.encode(login + ':' + password) function.
   * The `password` parameter also accepts references to secrets stored in the settings for a YouTrack app.
   * @param login The login to use for the authorization request.
   * @param password The password to use for the authorization request.
   * @returns The current connection object.
   */
  basicAuth(login: string, password: string): Connection;

  /**
   * Adds an authorization header with the value in "Bearer" format ('Bearer ' + token).
   * The `token` parameter also accepts references to secrets stored in the settings for a YouTrack app.
   * @param token The token to use for the authorization request.
   * @returns The current connection object.
   */
  bearerAuth(token: string): Connection;

  /**
   * Sends a synchronous HTTP request.
   * Note that instead of passing a proper request type with this method, there are dedicated methods that correspond to each request type that you can call directly.
   * For example, getSync or postSync.
   * @param requestType A valid HTTP request type. For a list of supported request types, see REQUEST_TYPES.
   * @param uri A relative URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters.
   * @param payload The payload to be sent in the request.
   * @returns An object that represents the HTTP response.
   */
  doSync(requestType: keyof typeof REQUEST_TYPES | string, uri: string, queryParams?: QueryParams, payload?: string | unknown[] | object): Response;

  /**
   * Executes a synchronous GET request.
   * @param uri The request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names.
   * @returns An object that represents an HTTP response.
   */
  getSync(uri: string, queryParams?: QueryParams): Response;

  /**
   * Executes a synchronous POST request.
   * @param uri The request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names. If the payload parameter is empty, the query parameters are passed as a form entity.
   * @param payload The payload to be sent in the request. For posting attachment files from YouTrack to a third-party application, pass the payload as an object, set its `type` value to 'multipart/form-data', and pass the attachments in `parts`. For each part, `name`, `size`, `fileName`, and `content` values are required.
   * @returns An object that represents an HTTP response.
   */
  postSync(uri: string, queryParams?: QueryParams, payload?: string | MultipartFormDataPayload | object): Response;

  /**
   * Executes a synchronous PUT request.
   * @param uri The request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names. If the payload parameter is empty, the query parameters are passed as a form entity.
   * @param payload The payload to be sent in the request.
   * @returns An object that represents an HTTP response.
   */
  putSync(uri: string, queryParams?: QueryParams, payload?: string): Response;

  /**
   * Executes a synchronous DELETE request.
   * @param uri The request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names.
   * @returns An object that represents an HTTP response.
   */
  deleteSync(uri: string, queryParams?: QueryParams): Response;

  /**
   * Executes a synchronous HEAD request.
   * @param uri The request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names.
   * @returns An object that represents an HTTP response.
   */
  headSync(uri: string, queryParams?: QueryParams): Response;

  /**
   * Executes a synchronous OPTIONS request.
   * @param uri request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names.
   * @returns An object that represents an HTTP response.
   */
  optionsSync(uri: string, queryParams?: QueryParams): Response;

  /**
   * Executes a synchronous PATCH request.
   * @param uri The request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names.
   * @param payload The payload to be sent in the request.
   * @returns An object that represents an HTTP response.
   */
  patchSync(uri: string, queryParams?: QueryParams, payload?: string): Response;

  /**
   * Executes a synchronous CONNECT request.
   * @param uri request URI. The complete URL is a concatenation of the string that is passed to the URL parameter in the Connection constructor and this string. If the URL parameter in the Connection constructor is empty, specify the absolute URL of the target site.
   * @param queryParams The query parameters. If an object is passed, its keys are considered to be parameter names.
   * @returns An object that represents an HTTP response.
   */
  connectSync(uri: string, queryParams?: QueryParams): Response;
}
