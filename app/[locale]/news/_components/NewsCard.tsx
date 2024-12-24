"use client";
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
import type { subNews } from "@/sanity/lib/news/getClientNews";

interface NewsCardProps {
  newsItem: subNews;
  locale: string;
  buttonText: string;
}

export function NewsCard({ newsItem, locale, buttonText }: NewsCardProps) {
  return (
    <Card className="flex h-[500px] max-h-[500px] flex-col rounded-2xl bg-white p-3 shadow-md">
      <div className="relative h-1/2 w-full">
        <Image
          src={newsItem.imageUrl ?? NewsDummyImg}
          alt={newsItem.title ?? "صورة الخبر"}
          fill
          quality={75}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30vw"
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between px-4">
        <CardHeader className="gap-y-1 space-y-2 p-4">
          <CardTitle className="line-clamp-2 text-lg font-medium">
            {newsItem.title}
          </CardTitle>
          <CardDescription className="line-clamp-4 text-sm text-gray-600">
            {newsItem.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={`/${locale}/news/${newsItem.slug}`} className="w-full">
            <Button className="w-full hover:opacity-75">{buttonText}</Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
