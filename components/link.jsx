/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link";

const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href}>
        <button type="button" {...rest} />
      </Link>
    );
  }

  if (isAnchorLink) {
    return <a type="button" href={href} {...rest} />;
  }

  return <a type="button" target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
