import Translate from "./icons/Translate";

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
      aria-label="Change language"
    >
      <Translate />
      <button type="button" className="hidden lg:inline-block">
        {langLabel}
      </button>
    </div>
  );
}
