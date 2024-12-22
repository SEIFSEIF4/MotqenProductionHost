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
    <div
      className="hidden cursor-pointer items-center gap-2 lg:flex"
      onClick={handleClick}
      role="button"
    >
      <Translate />
      <button type="button" className="hidden lg:inline-block">
        {langLabel}
      </button>
    </div>
  );
}
