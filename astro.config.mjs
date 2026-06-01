import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** Transforms > [!NOTE] / [!INSIGHT] / [!WARN] / [!SUCCESS] blockquotes
 *  into <blockquote class="callout note|insight|warn|success">.
 *  Mirrors the .callout.* classes already in notes-content.css.       */
function rehypeAlerts() {
  const TYPE = {
    NOTE: 'note', INSIGHT: 'insight',
    WARN: 'warn', WARNING: 'warn', CAUTION: 'warn',
    SUCCESS: 'success', TIP: 'success',
  };
  const RE = /^\[!(NOTE|INSIGHT|WARN|WARNING|CAUTION|SUCCESS|TIP)\]\s*/i;

  function walk(node) {
    if (!node.children) return;
    for (const child of node.children) {
      if (child.type === 'element' && child.tagName === 'blockquote') {
        const p = child.children?.find(c => c.type === 'element' && c.tagName === 'p');
        if (p) {
          const t = p.children?.[0];
          if (t?.type === 'text') {
            const m = t.value.match(RE);
            if (m) {
              child.properties = { ...(child.properties ?? {}), className: ['callout', TYPE[m[1].toUpperCase()]] };
              t.value = t.value.slice(m[0].length);
              if (!t.value.trim() && p.children.length === 1) {
                child.children = child.children.filter(c => c !== p);
              }
            }
          }
        }
      }
      walk(child);
    }
  }
  return walk;
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
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeAlerts],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
