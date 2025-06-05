export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "KovaKollection",
  description: "Eric Kovalevskyy's media catalog.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Movies",
      href: "/movies",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Movies",
      href: "/dashmoviesboard",
    },
  ],
  links: {
    imdb: "https://imdb.com/",
  },
};
