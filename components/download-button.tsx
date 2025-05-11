import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
    fileName: string;
    label?: string;
    programmatic?: boolean;
    className?: string;
}

export function DownloadButton({
    fileName,
    label = "تحميل",
    programmatic = false,
    className,
}: DownloadButtonProps) {
    const filePath = `/public/${fileName}`;

    const handleProgrammaticDownload = () => {
        const link = document.createElement("a");
        link.href = fileName.startsWith("/") ? fileName : `/${fileName}`;
        link.download = fileName.split("/").pop() || fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // For programmatic downloads, use the click handler
    if (programmatic) {
        return (
            <Button className={className} onClick={handleProgrammaticDownload}>
                {label}
            </Button>
        );
    }

    return (
        <a
            className={className}
            href={fileName.startsWith("/") ? fileName : `/${fileName}`}
            download={fileName.split("/").pop() || fileName}
        >
            <Button>{label}</Button>
        </a>
    );
}
