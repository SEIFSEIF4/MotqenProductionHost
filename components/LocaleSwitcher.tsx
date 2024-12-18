import Translate from "./icons/Translate";
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
      <Translate />
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
