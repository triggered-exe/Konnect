// Require and configure dotenv to load environment variables from .env file
require("dotenv").config();

const development = {
  name: "development",
  // REDIS_HOST: "localhost",
  // REDIS_PORT: 6379,
  MONGO_URL: process.env.MONGO_URL,
  assets_path: process.env.ASSETS_PATH || "./assets",
  session_cookie_key: process.env.SESSION_COOKIE_KEY || "change",
  db: process.env.DB || "Konnect_development",
  smtp: {
    service: process.env.SMTP_SERVICE || "gmail",
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  google_client_id: process.env.GOOGLE_CLIENT_ID || "your_google_client_id",
  google_client_secret:
  process.env.GOOGLE_CLIENT_SECRET || "your_google_client_secret",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret_key: process.env.JWT_SECRET_KEY,
};

const production = {
  name: process.env.NODE_ENV || "production",
  PORT: process.env.PORT || 8080,
  // REDIS_HOST: process.env.REDIS_HOST,
  // REDIS_PORT: process.env.REDIS_PORT,
  MONGO_URL: process.env.MONGO_URL,
  assets_path: process.env.ASSETS_PATH || "./assets",
  session_cookie_key: process.env.SESSION_COOKIE_KEY || "change",
  db: process.env.DB || "Konnect_development",
  smtp: {
    service: process.env.SMTP_SERVICE || "gmail",
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  google_client_id: process.env.GOOGLE_CLIENT_ID || "your_google_client_id",
  google_client_secret:    process.env.GOOGLE_CLIENT_SECRET || "your_google_client_secret",
  google_callback_url:process.env.GOOGLE_CALLBACK_URL,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
};

module.exports = (process.env.NODE_ENV === "production") ? production : development;

