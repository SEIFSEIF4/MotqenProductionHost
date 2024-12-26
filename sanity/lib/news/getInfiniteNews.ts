export const getInfiniteNews = (skip: number, pageSize: number) => `
  *[_type == "news"] | order(_createdAt desc) [${skip}...${skip + pageSize}] {
    _id,
    image {
      asset -> {
        url
      }
    },
    title,
    slug,
    shortDescription,
  }
`;
