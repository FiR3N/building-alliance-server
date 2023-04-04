declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: Number;
      DB_NAME?: String;
      DB_USER?: String;
      DB_PASSWORD?: String;
      DB_HOST?: String;
      DB_PORT?: String;
      // CLIENT_URL?: string;
      // API_URL?: string;
      // JWT_ACCESS_SECRET_KEY?: String;
      // JWT_REFRESH_SECRET_KEY?: String;
      // SMPTP_PORT?: String;
      // SMPTP_HOST?: String;
      // SMPTP_USER?: string;
      // SMPTP_PASSWORD?: String;
    }
  }
}

export {};
