/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://motqen.sa",
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: "https://motqen.sa/en",
      hreflang: "en",
    },
    {
      href: "https://motqen.sa/ar",
      hreflang: "ar",
    },
  ],
  exclude: ["/studio/*", "/api/*", "/_not-found"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://motqen.sa/server-sitemap.xml", // If you have dynamic pages
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
    ],
  },
  additionalPaths: async (config) => {
    const result = [];

    const routes = [
      "/about-motqen",
      "/contact",
      "/governance",
      "/hifz-path",
      "/iqra-path",
      "/ittqan-path",
      "/members",
      "/news",
      "/news/khbr-jdyd",
    ];

    for (const route of routes) {
      // Add Arabic version
      result.push({
        loc: `/ar${route}`,
        alternateRefs: [
          { href: `https://motqen.sa/en${route}`, hreflang: "en" },
          { href: `https://motqen.sa/ar${route}`, hreflang: "ar" },
        ],
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.7,
      });

      // Add English version
      result.push({
        loc: `/en${route}`,
        alternateRefs: [
          { href: `https://motqen.sa/en${route}`, hreflang: "en" },
          { href: `https://motqen.sa/ar${route}`, hreflang: "ar" },
        ],
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.7,
      });
    }

    return result;
  },
};
