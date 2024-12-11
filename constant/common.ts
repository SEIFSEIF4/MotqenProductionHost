import { useTranslations } from "next-intl";

export const STATICS_FIXED_HEIGHT = 548;
export const PROGRAMS_FIXED_HEIGHT = 486;
export const SAID_FIXED_HEIGHT = 345;

const t = useTranslations("HomePage.Navbar");

export const navbarMegaMenu: {
  aboutUs: { title: string; href: string; description: string }[];
  programsAndPaths: { title: string; href: string; description: string }[];
} = {
  aboutUs: [
    {
      title: t("aboutUs.megaMenuTitle1"),
      href: "/about-motqen",
      description: t("aboutUs.description1"),
    },
    {
      title: t("aboutUs.megaMenuTitle2"),
      href: "/about-motqen",
      description: t("aboutUs.description2"),
    },
    {
      title: t("aboutUs.megaMenuTitle3"),
      href: "/about-motqen",
      description: t("aboutUs.description3"),
    },
  ],
  programsAndPaths: [
    {
      title: t("programsAndPaths.megaMenuTitle1"),
      href: "/members",
      description: t("programsAndPaths.description1"),
    },
    {
      title: t("programsAndPaths.megaMenuTitle2"),
      href: "/members",
      description: t("programsAndPaths.description2"),
    },
    {
      title: t("programsAndPaths.megaMenuTitle3"),
      href: "/members",
      description: t("programsAndPaths.description3"),
    },
  ],
};
