import Translate from "@/images/translate.png";
import Image from "next/image";

export default function LocaleSwitcher({
  handleClick,
  langLabel,
}: {
  handleClick: () => void;
  langLabel: string;
}) {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Image
        src={Translate}
        alt="Translate"
        className="inline-block aspect-square w-5 rounded-md object-cover"
      />
      <button
        type="button"
        className="hidden lg:inline-block"
        onClick={handleClick}
      >
        {langLabel}
      </button>
    </div>
  );
}
