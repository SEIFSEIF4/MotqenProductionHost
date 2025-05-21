import { Button } from "@/components/ui/button";
import { getGeneralCouncilDisclosure } from "@/sanity/lib/news/getGeneralMembersCouncil";

export default async function GeneralMemberDownloadPdf() {
    const disclosure = await getGeneralCouncilDisclosure();

    if (!disclosure?.pdfUrl) return null;

    return (
        <a href={disclosure.pdfUrl} download className="inline-block w-fit">
            <Button>{disclosure.title || "إقرار الإفصاح"}</Button>
        </a>
    );
}
