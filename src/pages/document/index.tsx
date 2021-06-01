import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import { DocumentWrapper } from '../../components/molecules/DocumentWraper'
import fs from 'fs'

interface DocumnetPageProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: { [key: string]: any }
}

const DocumnetPage: React.FC<DocumnetPageProps> = ({ source, frontMatter }) => {
  return (
    <DocumentWrapper>
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...source} />
    </DocumentWrapper>
  )
}

export default DocumnetPage

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = fs.readFileSync(`${process.cwd()}/src/pages/document/document.md`).toString()

  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { scope: data })
  return { props: { source: mdxSource, frontMatter: data } }
}
