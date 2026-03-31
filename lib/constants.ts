export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://mm-assesment-server.vercel.app/api/v1",
  CACHE_TIME: {
    SHORT: 1800, // 30 minutes
    DEFAULT: 3600, // 1 hour
  },
} as const;
