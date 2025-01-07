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
          { title: "Regulations | اللوائح والأنظمة", value: "regulations" },
          {
            title: "Annual Documents | الموازنات التقديرية السنوية",
            value: "annual-documents",
          },
          {
            title: "General Meetings | محاضر اجتماعات الجمعية العمومية",
            value: "general-meetings",
          },
          {
            title: "Board Minutes | محاضر مجلس الإدارة",
            value: "board-minutes",
          },
          {
            title: "General Members | أعضاء الجمعية العمومية",
            value: "general-members",
          },
          {
            title:
              "Beneficiary Satisfaction Survey | استبيان قياس رضا المستفيدين",
            value: "beneficiary-satisfaction-survey",
          },
          {
            title: "Supporter Satisfaction Survey | استبيان قياس رضا الداعمين",
            value: "supporter-satisfaction-survey",
          },
          {
            title:
              "Employee & Volunteer Satisfaction Survey | استبيان قياس رضا العاملين والمتطوعين",
            value: "employee-volunteer-satisfaction-survey",
          },
          {
            title:
              "Membership Candidacy Survey | استبيان الترشح لعضوية الجمعية العمومية",
            value: "membership-candidacy-survey",
          },
          {
            title: "Stakeholder Satisfaction Results | نتائج رضا أصحاب العلاقة",
            value: "stakeholder-satisfaction-results",
          },
          {
            title:
              "New Board Election Program | البرنامج الانتخابي لمجلس الإدارة الجديد",
            value: "new-board-election-program",
          },
          {
            title: "Association Staff | موظفو الجمعية",
            value: "association-staff",
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
        "board-minutes": "Board Minutes | محاضر مجلس الإدارة",
        "general-members": "General Members | أعضاء الجمعية العمومية",
        "beneficiary-satisfaction-survey":
          "Beneficiary Satisfaction Survey | استبيان قياس رضا المستفيدين",
        "supporter-satisfaction-survey":
          "Supporter Satisfaction Survey | استبيان قياس رضا الداعمين",
        "employee-volunteer-satisfaction-survey":
          "Employee & Volunteer Satisfaction Survey | استبيان قياس رضا العاملين والمتطوعين",
        "membership-candidacy-survey":
          "Membership Candidacy Survey | استبيان الترشح لعضوية الجمعية العمومية",
        "stakeholder-satisfaction-results":
          "Stakeholder Satisfaction Results | نتائج رضا أصحاب العلاقة",
        "new-board-election-program":
          "New Board Election Program | البرنامج الانتخابي لمجلس الإدارة الجديد",
        "association-staff": "Association Staff | موظفو الجمعية",
      };
      return {
        title: title || "No Title",
        subtitle: categoryMap[subtitle] || "No Category",
        media: DocumentIcon,
      };
    },
  },
});
