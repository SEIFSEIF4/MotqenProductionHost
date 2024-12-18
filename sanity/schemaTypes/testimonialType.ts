import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "text",
      title: "Testimonial Text",
      type: "text",
      description: "The text of the testimonial.",
      validation: (Rule) =>
        Rule.required().max(250).warning("max 250 characters!"),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the person giving the testimonial.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position/Role",
      type: "string",
      description: "The position or title of the person.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "No name",
        subtitle: subtitle || "No position",
      };
    },
  },
});
