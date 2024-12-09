import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/Navbar";

export default async function NavbarProvider() {
  const t = await getTranslations("HomePage.Navbar");

  const translations = {
    aboutUs: t("aboutUs"),
    programsAndPaths: t("programsAndPaths"),
    associationNews: t("associationNews"),
    store: t("store"),
    contactUs: t("contactUs"),
    search: t("search"),
    english: t("english"),
  };

  return <Navbar translations={translations} />;
}
