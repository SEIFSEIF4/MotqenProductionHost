import React from "react";
import Link from "next/link";

import LeadingIcon from "../icons/LeadingIcon";

const PathwayButtons = ({
  t,
  order,
  locale,
}: {
  t: (key: string) => string;
  order: string;
  locale: string;
}) => {
  const menLink =
    order === "third"
      ? "https://drive.google.com/file/d/1mw68MQ7sO3qrjSnU2LyUtBW-5ioHZbyy/view?usp=drive_link"
      : order === "second"
        ? "https://drive.google.com/file/d/1COjRoeCeIRAs5a8ZIQGNt9nWpMQxG7rD/view?usp=drive_link"
        : "https://drive.google.com/file/d/1nspXnBpBhqkcb6DzKB9DbbRLYwAOPB5X/view?usp=drive_link";

  const womenLink =
    order === "third"
      ? "https://drive.google.com/file/d/1pclxr_WngF5pLGG3b6qUD6vy0fwT8dgs/view?usp=drive_link"
      : order === "second"
        ? "https://drive.google.com/file/d/1aStK_Jwp3PT9_6wh9xYkxDuI0gkhnv3K/view?usp=drive_link"
        : "https://drive.google.com/file/d/1kLkspcp3ndqrJlFd7MeRjuNxxS-3ES1q/view?usp=drive_link";

  return (
    <div className="mt-4 flex flex-col-reverse items-start justify-start gap-2 text-sm md:flex-row">
      <Link
        href={womenLink}
        target="_blank"
        className={`flex ${order === "third" && locale === "ar" ? "flex-row-reverse" : "flex-row"} items-center gap-1 rounded-md bg-[#165C67] px-4 py-2 text-white`}
      >
        <LeadingIcon />
        {t("buttons.women")}
      </Link>
      <Link
        href={menLink}
        target="_blank"
        className={`flex ${order === "third" && locale === "ar" ? "flex-row-reverse" : "flex-row"} items-center gap-1 rounded-md bg-[#165C67] px-4 py-2 text-white`}
      >
        <LeadingIcon />
        {t("buttons.men")}
      </Link>
    </div>
  );
};

export default PathwayButtons;
