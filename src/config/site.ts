export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Employee maintenance",
  description: "Employee maintenance app",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Employee",
      href: "/employee",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Employee",
      href: "/employee",
    },
  ],
};
