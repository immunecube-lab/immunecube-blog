import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * Fix cases where bold breaks near parentheses:
 *  - (**text**) -> (<strong>text</strong>)
 *  - **(text)** -> <strong>(text)</strong>
 */
const remarkFixBoldParenthesis: Plugin = () => {
  return (tree: any) => {
    visit(tree, "text", (node: any, _i, parent: any) => {
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
