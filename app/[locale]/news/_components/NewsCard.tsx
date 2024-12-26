import Image from "next/image";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewsDummyImg from "@/images/card-2.jpg";
import type { NewsItem } from "@/hooks/useNews";

interface NewsCardProps {
  newsItem: NewsItem;
  locale: string;
  buttonText: string;
}

export function NewsCard({ newsItem, locale, buttonText }: NewsCardProps) {
  // Ensure slug is a string and handle potential undefined/null cases
  const slug =
    typeof newsItem.slug === "object"
      ? newsItem.slug
      : String(newsItem.slug || "");

  // Create the href string
  const href = `/${locale}/news/${encodeURIComponent(slug)}`;

  return (
    <Card className="flex h-[500px] max-h-[500px] flex-col rounded-2xl bg-white p-3 shadow-md transition-all duration-500 hover:rounded-3xl">
      <div className="relative h-1/2 w-full">
        <Image
          fill
          quality={75}
          src={newsItem.imageUrl ?? NewsDummyImg}
          alt={newsItem.title ?? "صورة الخبر"}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30vw"
          className="rounded-xl object-cover"
          priority={false}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between px-4">
        <CardHeader className="gap-y-1 space-y-2 p-4">
          <CardTitle className="line-clamp-2 text-lg font-medium">
            {newsItem.title || ""}
          </CardTitle>
          <CardDescription className="line-clamp-4 text-sm text-gray-600">
            {newsItem.shortDescription || ""}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={href} className="w-full">
            <Button className="w-full hover:opacity-75" type="button">
              {buttonText}
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
