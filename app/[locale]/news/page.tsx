import { getTranslations } from "next-intl/server";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SubTitle } from "@/components/ui/heading";
import { getNews } from "@/sanity/lib/news/getNews";
import NewsInfiniteList from "./_components/NewsInfiniteList";
import { PAGE_SIZE } from "@/constant/common";
import { constructMetadata } from "@/lib/utils";

export const revalidate = 180; // Regenerate the page every 3-minutes

// Generate static paths for each locale
export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

// Generate static metadata for each locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "NewsPage" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [{ locale }, t, initialNews] = await Promise.all([
    params,
    getTranslations("NewsPage"),
    getNews(PAGE_SIZE),
  ]);

  const NoMoreNews = t("noMoreNews");

  return (
    <section
      id="news"
      className="min-h-[inherit] w-full bg-[#F3F4F6] px-10 py-verticalSpace md:px-horizontalSpace"
    >
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>
      <NewsInfiniteList
        initialData={initialNews}
        locale={locale}
        buttonText={t("button2")}
        PAGE_SIZE={PAGE_SIZE}
        NoMoreNews={NoMoreNews}
      />
    </section>
  );
}
