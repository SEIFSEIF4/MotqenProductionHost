import { defineType, defineField } from "sanity";

export const memberType = defineType({
  name: "member",
  title: "أعضاء مجلس الإدارة",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "object",
      fields: [
        defineField({
          name: "ar",
          title: "Name (Arabic)",
          type: "string",
          validation: (Rule) => Rule.required().error("الاسم مطلوب."),
        }),
        defineField({
          name: "en",
          title: "Name (English)",
          type: "string", // Changed to string from slug
          description: "Name in English.",
        }),
      ],
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({
          name: "ar",
          title: "Title (Arabic)",
          type: "string",
          validation: (Rule) => Rule.required().error("اللقب مطلوب."),
        }),
        defineField({
          name: "en",
          title: "Title (English)",
          type: "string",
          description: "Title in English.",
        }),
      ],
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      description: "Upload an image for the member.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("الصورة مطلوبة."),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Email address of the member.",
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" })
          .error("يجب أن يكون بريدًا إلكترونيًا صالحًا.")
          .required()
          .error("يرجى ادخال الايميل"),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      description: "Social media links of the member.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description: "Social media platform name, e.g., Twitter.",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "The link to the social media profile or contact.",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                }).error("يجب أن يكون رابطًا صالحًا."),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name.ar",
      subtitle: "title.ar",
      media: "avatar",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
