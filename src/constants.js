export const UP_ARROW_KEY = 38;
export const DOWN_ARROW_KEY = 40;
export const ESC_KEY = 27;
export const RETURN_KEY = 13;

const prod = {
  API_URL: "https://getappstore.page/api",
  RENDER_URL: "https://getappstore.page/render"
};

const dev = {
  API_URL: "http://localhost:8888/api",
  RENDER_URL: "http://localhost:8888/render"
};

export const URLS = process.env.NODE_ENV === "development" ? dev : prod;