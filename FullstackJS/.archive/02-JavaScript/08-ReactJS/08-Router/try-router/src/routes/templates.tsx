import { ReactNode } from "react";
import { Path } from "./paths.js";
import labels from "./labels.js";
import { C } from "../utilities/react.js";

export function Page({
  path,
  className,
  children,
}: {
  path: Path;
  className?: string;
  children?: ReactNode;
}) {
  const classes = {
    root: C(
      "h-screen bg-neutral-500",
      "grid gap-4 p-4",
      "grid-cols-[1fr_2fr] sm:grid-cols-[1fr_5fr]"
    ),
    a: (href: string) => {
      return C(
        "transition-all w-full",
        C(
          href === path && "font-semibold",
          href !== path && "font-thin tracking-wider",
          C("hover:bg-white/20", href !== path && "hover:tracking-widest"),
          "rounded-xl px-2 py-2"
        )
      );
    },
    main: C("w-full bg-neutral-200 rounded-lg p-3", className),
  };

  const navUlLis = Object.entries(labels).map(([href, label], idx) => (
    <li key={idx} className="flex">
      <a className={classes.a(href)} href={href}>
        {label}
      </a>
    </li>
  ));
  const nav = (
    <nav>
      <ul>{navUlLis}</ul>
    </nav>
  );

  return (
    <div className={classes.root}>
      <header className="bg-neutral-600 text-white rounded-lg px-3 py-4">
        {nav}
      </header>
      <main className={classes.main}>{children}</main>
    </div>
  );
}
