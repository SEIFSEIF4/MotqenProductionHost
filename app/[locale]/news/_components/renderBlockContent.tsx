import React from "react";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

// Define TypeScript types for the block content
type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

type BlockContent = {
  _type: string;
  style?: string;
  children?: any[];
  markDefs?: any[];
  asset?: any;
  alt?: string;
};

// Custom components for the PortableText component
const components = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      // Convert Sanity image reference to URL
      const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref
        .replace("image-", "")
        .replace("-jpg", ".jpg")
        .replace("-png", ".png")
        .replace("-webp", ".webp")}`;

      return (
        <div className="relative my-6 h-64 w-full">
          <Image
            src={imageUrl}
            alt={value.alt || "صور الخبر"}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="mb-4 mt-8 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="mb-4 mt-6 text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="mb-4 mt-6 text-2xl font-bold">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="mb-4 mt-6 text-xl font-bold">{children}</h4>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children: React.ReactNode;
    }) => (
      <Link
        href={value?.href || "#"}
        className="text-blue-600 hover:text-blue-800 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="mb-4 list-inside list-disc space-y-2">{children}</ul>
    ),
  },
};

interface BlockContentProps {
  content: BlockContent[];
}

const BlockContentComponent: React.FC<BlockContentProps> = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <article className="prose prose-lg max-w-none">
      {/* @ts-expect-error components will always be based */}
      <PortableText value={content} components={components} />
    </article>
  );
};

export default BlockContentComponent;
