import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const carouselType = defineType({
  name: "carousel",
  title: "دوّارة",
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
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Optional text for the button.",
      validation: (Rule) =>
        Rule.custom((buttonText, context) => {
          const buttonUrl = context.document?.buttonUrl;
          if (buttonText && !buttonUrl) {
            return "Button URL is required when Button Text is provided.";
          }
          return true;
        }),
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "url",
      description: "Optional URL for the button.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        })
          .custom((buttonUrl, context) => {
            const buttonText = context.document?.buttonText;
            if (buttonUrl && !buttonText) {
              return "Button Text is required when Button URL is provided.";
            }
            return true;
          })
          .warning("The URL should start with http:// or https://"),
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
