import { Button } from "@/components/ui/button";
import { getCouncilDisclosure } from "@/sanity/lib/news/getMembersCouncil";

export default async function MemberDownloadPdf() {
    const disclosure = await getCouncilDisclosure();

    if (!disclosure?.pdfUrl) return null;

    return (
        <a href={disclosure.pdfUrl} download className="inline-block w-fit">
            <Button>{disclosure.title || "إقرار الإفصاح"}</Button>
        </a>
    );
}
