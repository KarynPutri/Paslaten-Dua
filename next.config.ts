import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/captcha/images": ["./captcha_photos/**/*"],
  },
};

export default nextConfig;