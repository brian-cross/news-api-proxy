import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const PORT = process.env.PORT || 5000;
const { API_KEY, API_BASE_URL } = process.env;

const proxy = createProxyMiddleware({
  target: API_BASE_URL,
  changeOrigin: true,
  pathRewrite: { "^/api": "/" },
  headers: {
    Authorization: API_KEY!,
  },
});

const app = express();

app.use(cors());

app.use(helmet());

app.use("/api", proxy);

app.listen(PORT, () => console.log(`Server listing on port ${PORT}`));
