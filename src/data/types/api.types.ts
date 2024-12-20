interface IRequestOptions {
  method: "get" | "post" | "put" | "delete";
  headers?: Record<string, string>;
  body?: string;
}
