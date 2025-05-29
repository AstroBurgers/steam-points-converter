/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://steam-points-converter.vercel.app/',
  generateRobotsTxt: true, // (optional)
}