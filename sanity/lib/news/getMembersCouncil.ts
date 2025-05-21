import { client } from "@/sanity/lib/client";

export async function getCouncilDisclosure() {
    const query = `*[_type == "councilDisclosure"] | order(_createdAt desc)[0] {
        "pdfUrl": pdf.asset->url,
        title
    }`;
    return await client.fetch(query);
}
