/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  images: {
    unoptimized: true, // এই অংশটুকু যোগ করুন
  },
};

export default nextConfig;
