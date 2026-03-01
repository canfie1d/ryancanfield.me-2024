import { PortableText as BasePortableText } from "@portabletext/react";
import { Link } from "@tanstack/react-router";
import Text from "~/components/Text";
import styles from "./PortableText.module.scss";

type AboutPortableTextProps = {
  value: unknown[] | null | undefined;
  resumeUrl?: string | null;
};

const components = (resumeUrl?: string | null) => ({
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className={styles.heading}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className={styles.subheading}>{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => <Text>{children}</Text>,
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string; target?: string };
    }) => {
      const href = value?.href ?? "#";
      const target = value?.target ?? "_blank";
      const rel = target === "_blank" ? "noreferrer" : undefined;

      // Use resume URL from Sanity for /resume.pdf links
      const resolvedHref = href === "/resume.pdf" && resumeUrl ? resumeUrl : href;

      // Internal app routes use Link; file URLs and external use <a>
      const isInternalRoute =
        href.startsWith("/") && !href.startsWith("//") && href !== "/resume.pdf";

      if (isInternalRoute) {
        return (
          <Link
            to={resolvedHref}
            className={styles.link}
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={resolvedHref}
          target={target}
          rel={rel}
          className={styles.link}
        >
          {children}
        </a>
      );
    },
  },
});

const PortableText = ({ value, resumeUrl }: AboutPortableTextProps) => {
  if (!value?.length) return null;

  return (
    <BasePortableText
      value={value as Parameters<typeof BasePortableText>[0]["value"]}
      components={components(resumeUrl)}
    />
  );
};

export default PortableText;
