import { useLocale } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import Translate from "@/images/translate.png";
import Image from "next/image";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LocaleSwitcher({
  handleClick,
  langLabel,
}: {
  handleClick: any;
  langLabel: string;
}) {
  // const router = useRouter();
  // const pathname = usePathname();
  // const params = useParams();
  // const localeLang: string = useLocale();
  // const lang: { en: string; ar: string } = {
  //   en: "العربية",
  //   ar: "English",
  // };

  // let nextLocale = null;

  // if (localeLang === "en") nextLocale = "ar";
  // else if (localeLang === "ar") nextLocale = "en";

  // const handleClick = () => {
  //   router.replace(
  //     // @ts-expect-error -- TypeScript will validate that only known `params`
  //     // are used in combination with a given `pathname`. Since the two will
  //     // always match for the current route, we can skip runtime checks.
  //     { pathname, params },
  //     { locale: nextLocale as Locale },
  //   );
  // };

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Image
        src={Translate}
        alt="Translate"
        className="inline-block aspect-square w-5 rounded-md object-cover"
      />
      <button
        type="button"
        className="hidden hover:text-blue-500 lg:inline-block"
        onClick={handleClick}
      >
        {langLabel}
      </button>
      {/* <LocaleSwitcherSelect defaultValue={locale} label="Select a locale">
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </LocaleSwitcherSelect> */}
    </div>
  );
}
