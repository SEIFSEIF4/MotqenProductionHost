import { getNews } from "@/sanity/lib/news/getNews";
import { fetchNewsPage } from "./action";
import NewsInfiniteList from "./NewsInfiniteList";

interface NewsWrapperProps {
  locale: string;
  buttonText: string;
}

export default async function NewsWrapper({
  locale,
  buttonText,
}: NewsWrapperProps) {
  const initialNews = await getNews(6);

  return (
    <NewsInfiniteList
      initialData={initialNews}
      locale={locale}
      buttonText={buttonText}
    />
  );
}
