import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** Transforms > [!TYPE] Title\nbody blockquotes in mdast (remark stage).
 *  Sets hProperties.className so remark-rehype emits the right class,
 *  and wraps the title text in a <strong> node.               */
function remarkAlerts() {
  const TYPE = {
    NOTE: 'note', INSIGHT: 'insight',
    WARN: 'warn', WARNING: 'warn', CAUTION: 'warn',
    SUCCESS: 'success', TIP: 'success',
  };
  const RE = /^\[!(NOTE|INSIGHT|WARN|WARNING|CAUTION|SUCCESS|TIP)\]\s*/i;

  return (tree) => {
    function walk(node) {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'blockquote') {
          const para = child.children?.find(c => c.type === 'paragraph');
          if (para) {
            const t = para.children?.[0];
            if (t?.type === 'text') {
              const m = t.value.match(RE);
              if (m) {
                const cls = TYPE[m[1].toUpperCase()];
                child.data = child.data ?? {};
                child.data.hProperties = { ...(child.data.hProperties ?? {}), className: ['callout', cls] };

                const rest = t.value.slice(m[0].length);
                const nlIdx = rest.indexOf('\n');
                const title = nlIdx >= 0 ? rest.slice(0, nlIdx) : rest;
                const body  = nlIdx >= 0 ? rest.slice(nlIdx + 1) : '';

                const newNodes = [];
                if (title.trim()) newNodes.push({ type: 'strong', children: [{ type: 'text', value: title }] });
                if (body.trim()) newNodes.push({ type: 'text', value: (title.trim() ? ' ' : '') + body });
                para.children.splice(0, 1, ...newNodes);
              }
            }
          }
        }
        walk(child);
      }
    }
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://sayyakuhajime.github.io',
  base: '/Portfolio',
  output: 'static',
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  markdown: {
    remarkPlugins: [remarkMath, remarkAlerts],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
