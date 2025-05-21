import { defineType, defineField } from "sanity";

export const generalMemberCouncilType = defineType({
    name: "generalCouncilDisclosure",
    title: "إقرار الإفصاح(أعضاء الجمعية العمومية)",
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
