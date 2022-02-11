/* eslint-disable react/display-name */
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import CustomLink from "@/components/Link";
import TOCInline from "@/components/TOCInline";
import Pre from "@/components/Pre";

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default;
    return <Layout {...rest} />;
  },
};

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
