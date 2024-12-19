import { DocumentIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const governanceDocumentType = defineType({
  name: "governanceDocument",
  title: "Governance Documents",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({
          name: "ar",
          type: "string",
          title: "Arabic",
          validation: (Rule) =>
            Rule.required().error("Arabic title is required."),
        }),
        defineField({
          name: "en",
          type: "string",
          title: "English",
          validation: (Rule) =>
            Rule.required().error("English title is required."),
        }),
      ],
      validation: (Rule) => Rule.required().error("Title is required."),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          {
            title: "Policies & Disclosure | السياسات والإفصاح",
            value: "policies-disclosure",
          },
          {
            title: "Financial Statements | القوائم المالية",
            value: "financial-statements",
          },
          {
            title: "Program Reports | التقارير السنوية للبرامج",
            value: "program-reports",
          },
          {
            title: "Regulations | اللوائح والأنظمة",
            value: "regulations",
          },
          {
            title: "Annual Documents | الموازنات التقديرية السنوية",
            value: "annual-documents",
          },
          {
            title: "General Meetings | محاضر اجتماعات الجمعية العمومية",
            value: "general-meetings",
          },
        ],
      },
      validation: (Rule) => Rule.required().error("Category is required."),
    }),
    defineField({
      name: "document",
      title: "Document Links",
      type: "object",
      fields: [
        defineField({
          name: "ar",
          title: "Arabic Document Link",
          type: "url",
          validation: (Rule) =>
            Rule.required()
              .uri({ scheme: ["http", "https"] })
              .error("A valid Arabic document link is required."),
        }),
        defineField({
          name: "en",
          title: "English Document Link",
          type: "url",
          validation: (Rule) =>
            Rule.required()
              .uri({ scheme: ["http", "https"] })
              .error("A valid English document link is required."),
        }),
      ],
      validation: (Rule) =>
        Rule.required().error("Document links are required."),
    }),
  ],
  preview: {
    select: {
      title: "title.ar",
      subtitle: "category",
      media: "document",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const categoryMap: Record<string, string> = {
        "policies-disclosure": "Policies & Disclosure | السياسات والإفصاح",
        "financial-statements": "Financial Statements | القوائم المالية",
        "program-reports": "Program Reports | التقارير السنوية للبرامج",
        regulations: "Regulations | اللوائح والأنظمة",
        "annual-documents": "Annual Documents | الموازنات التقديرية السنوية",
        "general-meetings":
          "General Meetings | محاضر اجتماعات الجمعية العمومية",
      };
      return {
        title: title || "No Title",
        subtitle: categoryMap[subtitle] || "No Category",
        media: DocumentIcon,
      };
    },
  },
});
