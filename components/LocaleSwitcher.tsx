import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import Translate from "@/images/translate.png";
import Image from "next/image";

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Image
        src={Translate}
        alt="Translate"
        className="inline-block aspect-square w-5 rounded-md object-cover"
      />
      <LocaleSwitcherSelect defaultValue={locale} label="Select a locale">
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </LocaleSwitcherSelect>
    </div>
  );
}
