import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import { constructMetadata } from "@/lib/utils";

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
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "TermsAndConditions" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
  });
}

const TermsAndConditions = () => {
  const t = useTranslations("TermsAndConditions");
  const sections: [
    string,
    {
      title: string;
      content: string;
      items: string[];
      strongInfo?: { title: string; content: string }[];
    },
  ][] = Object.entries(t.raw("sections"));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">{t("title")}</h1>

      {sections.map(([key, section], index) => (
        <section key={key} className="mb-6">
          <h2 className="mb-3 text-2xl font-semibold">
            {index + 1}. {section.title}
          </h2>
          {section.content && <p>{section.content}</p>}
          {section.items && (
            <ul className="mt-2 list-inside list-disc">
              {section.items.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {section.strongInfo?.map(({ title, content }, idx) => (
            <p key={title + idx} className="mt-2">
              <strong>{title}</strong> {content}
            </p>
          ))}
        </section>
      ))}

      <p className="mt-8 text-sm text-gray-600">{t("lastUpdated")}</p>
    </div>
  );
};

export default TermsAndConditions;
