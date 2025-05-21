import { getMembers } from "@/sanity/lib/news/getMembers";
import { getTranslations } from "next-intl/server";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { FooterIcons, HomeIcons } from "@/components/icons";
import { SubTitle } from "@/components/ui/heading";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionWrapper } from "@/components/Wrapper";
import { Member as SanityMember } from "@/sanity.types";
import { constructMetadata } from "@/lib/utils";
import DownloadPdf from "@/components/downlaod-pdf";
import { Button } from "@/components/ui/button";
import MemberDownloadPdf from "@/components/member-download-button";

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
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <SubTitle text={t("title")} />
                    <p className="mt-4">{t("description")}</p>
                </div>

                <MemberDownloadPdf />
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-3 py-5 sm:grid-cols-2 md:grid-cols-3 md:py-16 lg:md:grid-cols-4 xl:grid-cols-5">
                {members.map((member) => (
                    <div
                        key={member._id}
                        className="flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6"
                    >
                        <div className="relative">
                            <HomeIcons.LargeLeaf className="absolute -right-4 -top-4" />
                            <Avatar className="h-40 w-40">
                                <AvatarImage
                                    src={
                                        member.imageUrl || "/images/avatar.jpg"
                                    }
                                    alt={
                                        member.name
                                            ? (getLocalizedText(member.name) ??
                                              "")
                                            : ""
                                    }
                                    className="relative object-cover"
                                />
                                <AvatarFallback>
                                    {member.name
                                        ? getLocalizedText(member.name)
                                              ?.slice(0, 2)
                                              .toUpperCase()
                                        : "NP"}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="mt-6 text-center">
                            <h2 className="line-clamp-1 text-lg font-bold text-[#1F2A37]">
                                {member.name
                                    ? getLocalizedText(member.name)
                                    : ""}
                            </h2>
                            <p className="mt-2 line-clamp-3">
                                {member.title
                                    ? getLocalizedText(member.title)
                                    : ""}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-x-4">
                            {member.email && (
                                <a
                                    href={`mailto:${member.email}`}
                                    className="rounded-sm border p-3 hover:underline"
                                    aria-label={tf("ariaLabels.email")}
                                >
                                    <Mail
                                        className="h-[18px] w-[18px]"
                                        aria-hidden="true"
                                    />
                                </a>
                            )}

                            {/* Twitter Icon */}
                            <a
                                href={getSocialLink(member, "twitter") || "#"}
                                target={
                                    getSocialLink(member, "twitter")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    getSocialLink(member, "twitter")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={`cursor-pointer rounded-sm border p-3 hover:opacity-75 ${!getSocialLink(member, "twitter") ? "pointer-events-none opacity-50" : ""}`}
                                aria-label={tf("ariaLabels.twitter")}
                            >
                                <FooterIcons.Twitter
                                    altColor="black"
                                    className="h-[18px] w-[18px]"
                                    aria-hidden="true"
                                />
                            </a>

                            {/* LinkedIn Icon */}
                            <a
                                href={getSocialLink(member, "linkedin") || "#"}
                                target={
                                    getSocialLink(member, "linkedin")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    getSocialLink(member, "linkedin")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className={`cursor-pointer rounded-sm border p-3 hover:opacity-75 ${!getSocialLink(member, "linkedin") ? "pointer-events-none opacity-50" : ""}`}
                                aria-label={tf("ariaLabels.linkedIn")}
                            >
                                <Linkedin
                                    className="h-[18px] w-[18px]"
                                    aria-hidden="true"
                                />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
