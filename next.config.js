/** @type {import('./app/node_modules/next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        // swcPlugins: [["next-superjson-plugin", {}]]
    },
    images: {
        domains: [
            'res.cloudinary.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ]
    }
}

module.exports = nextConfig
