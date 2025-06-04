/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ufs.sh", // allows all subdomains of ufs.sh (UploadThing)
      },
    ],
  },
};

export default nextConfig;
