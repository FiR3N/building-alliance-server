declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: Number;
      DB_NAME?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_HOST?: string;
      DB_PORT?: string;
      CLIENT_URL?: string;
      // API_URL?: string;
      // JWT_ACCESS_SECRET_KEY?: String;
      // JWT_REFRESH_SECRET_KEY?: String;
      SMPTP_PORT?: string;
      SMPTP_HOST?: string;
      SMPTP_USER?: string;
      SMPTP_PASSWORD?: string;
    }
  }
}

export {};
