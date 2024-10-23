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
      label: "Employees",
      href: "/employees",
    },
    {
      label: "Deparments",
      href: "/deparments",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Employees",
      href: "/employees",
    },
    {
      label: "Departments",
      href: "/departments",
    },
  ],
};
