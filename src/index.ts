import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const PORT = process.env.PORT || 5000;
const { API_KEY, API_BASE_URL } = process.env;

// https://github.com/chimurai/http-proxy-middleware/issues/293#issuecomment-449548863
const updateQueryStringParameter = (
  path: string,
  key: string,
  value: string
) => {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = path.indexOf("?") !== -1 ? "&" : "?";
  if (path.match(re)) {
    return path.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return path + separator + key + "=" + value;
  }
};

const proxy = createProxyMiddleware({
  target: API_BASE_URL,
  changeOrigin: true,
  pathRewrite: function (path, _req) {
    let newPath = path;
    newPath = updateQueryStringParameter(newPath, "access_key", API_KEY!);
    return newPath;
  },
});

const app = express();

app.use(cors());

app.use(helmet());

app.use("/", proxy);

app.listen(PORT, () => console.log(`Server listing on port ${PORT}`));
