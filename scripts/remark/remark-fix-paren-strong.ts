import type { Plugin } from "unified";
import type { Node } from "unist";
import { visit } from "unist-util-visit";

type TextNode = Node & {
  value?: unknown;
};

type ParentNode = Node & {
  type?: string;
};

/**
 * Fix cases where bold breaks near parentheses:
 *  - (**text**) -> (<strong>text</strong>)
 *  - **(text)** -> <strong>(text)</strong>
 */
const remarkFixBoldParenthesis: Plugin = () => {
  return (tree: Node) => {
    visit(tree, "text", (node: TextNode, _i, parent: ParentNode | undefined) => {
      if (!parent || typeof node.value !== "string") return;

      // safety: do not touch code
      if (parent.type === "code" || parent.type === "inlineCode") return;

      const v = node.value;

      const replaced = v
        .replace(/\(\*\*([\s\S]+?)\*\*\)/g, "(<strong>$1</strong>)")
        .replace(/\*\*\(([\s\S]+?)\)\*\*/g, "<strong>($1)</strong>");

      if (replaced !== v) {
        node.value = replaced;
      }
    });
  };
};

export default remarkFixBoldParenthesis;
