import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const carouselType = defineType({
  name: "carousel",
  title: "Carousel",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Upload the carousel image.",
      validation: (Rule) => Rule.required().error("An image is required."),
      options: {
        hotspot: true, // Allow cropping
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title for the carousel item.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description for the carousel item.",
      validation: (Rule) =>
        Rule.max(250).warning("Max 250 characters allowed."),
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "url",
      description: "Optional URL for the button.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }).warning("The URL should start with http:// or https://"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image", // Use the image for preview
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No title provided",
        subtitle: subtitle || "No description",
        media: media, // Displays the image in the preview
      };
    },
  },
});
