export const SITE = {
  website: "https://crohnos.github.io/portfolio-blog/", // replace this with your deployed domain
  author: "John Graham",
  profile: "https://github.com/crohnos/",
  desc: "A portfolio and blog showcasing web development projects and technical articles.",
  title: "John Graham | Portfolio",
  ogImage: "portfolio-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false, // disabled edit post
    text: "Suggest Changes",
    url: "https://github.com/crohnos/portfolio-blog/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/New_York", // Default global timezone (IANA format)
} as const;