import { defineType, defineField } from "sanity";

export const memberCouncilType = defineType({
    name: "councilDisclosure",
    title: "إقرار الإفصاح(أعضاء مجلس الإدارة)",
    type: "document",
    fields: [
        defineField({
            name: "pdf",
            title: "الملف",
            type: "file",
            options: {
                accept: ".pdf",
            },
            validation: (Rule) => Rule.required().error("الملف PDF مطلوب"),
        }),
        defineField({
            name: "title",
            title: "العنوان",
            type: "string",
            initialValue: "إقرار الإفصاح",
        }),
    ],
});
