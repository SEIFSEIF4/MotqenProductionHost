import { getMembers } from "@/sanity/lib/news/getMembers";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { FooterIcons, HomeIcons } from "@/components/icons";
import { SubTitle } from "@/components/ui/heading";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionWrapper } from "@/components/Wrapper";
import { Member as SanityMember } from "@/sanity.types";
import { constructMetadata } from "@/lib/utils";

// Assuming you have a type for `PageProps` that includes `params`
interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

interface SocialLink {
  platform?: "twitter" | "linkedin";
  url?: string;
  _key: string;
}

interface MembersPageProps extends PageProps {} // Extend the PageProps to include params

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

  const t = await getTranslations({ locale, namespace: "MembersPage" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
  });
}

export default async function MembersPage({ params, searchParams }: PageProps) {
  const [{ locale }, members, t, tf] = await Promise.all([
    params,
    getMembers(),
    getTranslations("MembersPage"),
    getTranslations("Footer"),
  ]);

  // Function to get localized text with fallback
  const getLocalizedText = (obj: { ar?: string; en?: string }) => {
    if (locale === "en" && obj.en) {
      return obj.en;
    }
    return obj.ar; // Fallback to Arabic if English is not available
  };

  // Function to get social link by platform
  const getSocialLink = (member: SanityMember, platform: string) => {
    return member.socialLinks?.find(
      (link: SocialLink) => link.platform === platform,
    )?.url;
  };

  return (
    <SectionWrapper isSinglePage id="goals" className="bg-[#F3F4F6] px-4">
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>

      <div className="grid grid-cols-1 gap-x-5 gap-y-3 py-5 sm:grid-cols-2 md:grid-cols-3 md:py-16 lg:md:grid-cols-4 xl:grid-cols-5">
        {members.map((member) => (
          <div key={member._id} className="rounded-2xl bg-white p-6">
            <div className="text-center">
              <h2 className="line-clamp-2 text-lg font-bold text-[#1F2A37]">
                {member.name ? getLocalizedText(member.name) : ""}
              </h2>
              <p className="mt-2 line-clamp-2">
                {member.title ? getLocalizedText(member.title) : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
