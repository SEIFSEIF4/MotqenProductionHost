import React from "react";
import Image, { type StaticImageData } from "next/image";
import { Link } from "next-view-transitions";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SubNewsCard = ({
  ImgSrc,
  imgAlt,
  title,
  description,
  href,
  buttonTitle,
}: {
  ImgSrc: StaticImageData | string;
  imgAlt: string;
  title: string;
  description: string;
  href: string;
  buttonTitle: string;
}) => (
  <Card className="flex h-[500px] max-h-[500px] flex-col rounded-2xl bg-white p-3 shadow-md">
    <div className="relative h-1/2 w-full">
      <Image
        src={ImgSrc}
        alt={imgAlt}
        fill
        quality={100}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30vw"
        className="rounded-xl object-cover"
      />
    </div>

    <div className="flex flex-1 flex-col justify-between px-4">
      <CardHeader className="gap-y-1 space-y-2 p-4">
        <CardTitle className="line-clamp-2 text-lg font-medium">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-4 text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-4">
        <Link
          href={href}
          // href={`/${locale}/news/${newsItem.id}`}
          className="w-full"
        >
          <Button className="w-fit hover:opacity-75">{buttonTitle}</Button>
        </Link>
      </CardFooter>
    </div>
  </Card>
);

export default SubNewsCard;
