import { querySanity } from "@/lib/queryWrapper";
import { Member as SanityMember } from "@/sanity.types";

interface GeneralMember extends SanityMember {
  imageUrl: string;
}

export const getGeneralMembers = (): Promise<GeneralMember[]> =>
  querySanity({
    query: `*[_type == "general-members"]{
      _id,
      email,
      avatar {
        asset -> {
          url
        }
      },
      name {
        ar,
        en
      },
      title {
        ar,
        en
      },
      socialLinks[] {
        platform,
        url
      }
    }`,
    cache: {
      revalidate: 21600, // 6-hours cache
      tags: ["GeneralMembers"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        imageUrl: item.avatar?.asset?.url || "",
      })),
  });
