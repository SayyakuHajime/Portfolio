import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const BASE = '/Portfolio';

/** Prepends the site base to absolute image paths (/assets/...) in mdast.
 *  Without this, images 404 on GitHub Pages (base=/Portfolio). */
function remarkFixPaths() {
  return (tree) => {
    function walk(node) {
      if (node.type === 'image' && typeof node.url === 'string') {
        if (node.url.startsWith('/') && !node.url.startsWith(BASE)) {
          node.url = BASE + node.url;
        }
      }
      if (node.children) node.children.forEach(walk);
    }
    walk(tree);
  };
}

/** Transforms > [!TYPE] Title\nbody blockquotes in mdast (remark stage).
 *  Sets hProperties.className so remark-rehype emits the right class,
 *  and wraps the title text in a <strong> node. */
function remarkAlerts() {
  const TYPE = {
    NOTE: 'note', INSIGHT: 'insight',
    WARN: 'warn', WARNING: 'warn', CAUTION: 'warn',
    SUCCESS: 'success', TIP: 'success',
    DANGER: 'danger',
  };
  const RE = /^\[!(NOTE|INSIGHT|WARN|WARNING|CAUTION|SUCCESS|TIP|DANGER)\]\s*/i;

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

/** Adds loading="lazy" to all <img> elements in rendered markdown. */
function rehypeAddLazyLoading() {
  return (tree) => {
    function walk(node) {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties = { ...(node.properties ?? {}), loading: 'lazy' };
      }
      if (node.children) node.children.forEach(walk);
    }
    walk(tree);
  };
}

/** Adds class="math-block" to <p> elements that contain only a KaTeX span
 *  (display math). Runs after rehypeKatex so the .katex span already exists.
 *  Property mutations on existing nodes work in Astro 5's rehype pipeline. */
function rehypeMarkMathBlocks() {
  return (tree) => {
    function walk(node) {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'element' && child.tagName === 'p') {
          const elChildren = child.children?.filter(c => c.type === 'element') ?? [];
          if (elChildren.length === 1 && elChildren[0].properties?.className?.includes?.('katex')) {
            child.properties = { ...(child.properties ?? {}), className: ['math-block'] };
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
  base: BASE,
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  markdown: {
    remarkPlugins: [remarkMath, remarkAlerts, remarkFixPaths],
    rehypePlugins: [rehypeKatex, rehypeAddLazyLoading, rehypeMarkMathBlocks],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
