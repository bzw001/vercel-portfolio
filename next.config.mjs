/** @type {import('next').NextConfig} */
import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code';
import moonlightTheme from './public/assets/moonlight-ii.json' with { type: 'json' };
const withMDX = mdx({
    extension: /\.(md|mdx)$/,
    // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins:[[rehypePrettyCode,]],
  }
})
const nextConfig = {
    // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx','md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
};

export default withMDX(nextConfig);
