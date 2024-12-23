import { defineType, defineField, defineArrayMember } from "sanity";
import { ImageIcon, CalendarIcon } from "@sanity/icons";

export const newsType = defineType({
  name: "news",
  title: "News",
  type: "document",
  icon: CalendarIcon,
  fields: [
    // Image Field
    defineField({
      name: "image",
      title: "News Image",
      type: "image",
      description: "Image for the news article.",
      validation: (Rule) => Rule.required().error("An image is required."),
      options: {
        hotspot: true, // Allows cropping
      },
    }),
    // Title Field
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Title of the news article.",
      validation: (Rule) => Rule.required(),
    }),
    // Slug Field (generated from title)
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The unique slug for this news article (used in URLs).",
      options: {
        source: "title", // Generates the slug from the title
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    // Short Description
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "A short description of the news article.",
      validation: (Rule) => Rule.required().max(250),
    }),
    // Block Content
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      description: "The main content of the news article.",
      validation: (Rule) => Rule.required(),
    }),
    // Optional Social Media Links
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
          description: "Link to Instagram post (optional).",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }).optional(),
        },
        {
          name: "whatsapp",
          title: "WhatsApp",
          type: "url",
          description: "Link to WhatsApp (optional).",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }).optional(),
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
          description: "Link to LinkedIn post (optional).",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }).optional(),
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "url",
          description: "Link to Twitter post (optional).",
          validation: (Rule) =>
            Rule.uri({ scheme: ["http", "https"] }).optional(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No title provided",
        subtitle: subtitle || "No description provided",
        media: media || ImageIcon, // Display the image or fallback icon
      };
    },
  },
});
