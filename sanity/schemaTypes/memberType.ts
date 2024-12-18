import { defineType, defineField } from "sanity";

export const memberType = defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "The full name of the member.",
      validation: (Rule) => Rule.required().error("Name is required."),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title or role of the member, e.g., 'Chairman'.",
      validation: (Rule) => Rule.required().error("Title is required."),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      description: "Upload an image for the member.",
      options: {
        hotspot: true, // Enable image cropping
      },
      validation: (Rule) => Rule.required().error("Avatar is required."),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Email address of the member.",
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" }).error(
          "Must be a valid email address.",
        ),
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
                  { title: "Twitch", value: "twitch" },
                  { title: "Email", value: "email" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "The link to the social media profile or contact.",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto"],
                }).error("Must be a valid URL or email."),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
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
