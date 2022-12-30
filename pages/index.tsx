import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import fs from "fs/promises";
import path from "path";
import { createElement, Fragment, useMemo } from "react";
import rehypeReact from "rehype-react";
import { unified } from "unified";

import { Plugin } from "unified";
import { Node } from "unist";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Root } from "hast";
import { visit } from "unist-util-visit";
import { Element } from "hast";

export const parseToHast = async (rawString: string): Promise<Root> =>
  (await contentProcessor.process(rawString)).result.tree;

const rehypeImageToFigure: Plugin = () => async (tree) => {
  visit(
    tree,
    { type: "element", tagName: "img" },
    (node: Element, index: number, parent: Element) => {
      parent.children[index] = {
        type: "element",
        tagName: "figure", // change this to 'picture' and its fine
        properties: {},
        children: [node],
      };
    }
  );
};

const contentProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeImageToFigure)
  .use(function () {
    this.Compiler = (tree) => ({ tree });
  } as Plugin<[], Node, { tree: Root }>);

interface PostPageProps {
  root: Root;
}

export const getStaticProps: GetStaticProps<PostPageProps> = async () => {
  const post = await fs.readFile(path.join("posts", `test.md`), "utf-8");
  const root = await parseToHast(post);
  return {
    props: {
      root,
    },
  };
};

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  function ({ root }) {
    const children = useReactFromHast(root);
    return <div>{children}</div>;
  };

export default PostPage;

export const useReactFromHast = (root: Root): React.ReactNode =>
  useMemo(
    () =>
      unified().use(rehypeReact, { createElement, Fragment }).stringify(root),
    [root]
  );
