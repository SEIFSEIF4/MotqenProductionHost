import { client } from "@/sanity/lib/client";

export async function getGeneralCouncilDisclosure() {
    const query = `*[_type == "generalCouncilDisclosure"] | order(_createdAt desc)[0] {
        "pdfUrl": pdf.asset->url,
        title
    }`;
    return await client.fetch(query);
}
