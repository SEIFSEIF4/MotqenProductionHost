import { querySanity } from "@/lib/queryWrapper";
import { Member as SanityMember } from "@/sanity.types";

interface Member extends SanityMember {
  imageUrl: string;
}

export const getMembers = (): Promise<Member[]> =>
  querySanity({
    query: `*[_type == "member"]{
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
      tags: ["Members"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        imageUrl: item.avatar?.asset?.url || "", // Set imageUrl
      })),
  });
