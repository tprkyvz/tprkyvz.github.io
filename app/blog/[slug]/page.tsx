import Link from 'next/link';
import { getAllPostIds, getPostData } from '@/lib/posts';
import type { Metadata } from 'next';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getAllPostIds().map(path => ({ slug: path.params.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostData(slug);
    return { title: post.title, description: typeof post.description === 'string' ? post.description : undefined };
}
export default async function Post({ params }: Props) {
    const { slug } = await params;
    const post = await getPostData(slug);
    return <article className="post"><Link href="/blog" className="tn-back">← TBlogs</Link>
        <header className="post-header"><h1>{post.title}</h1><div className="post-meta"><time dateTime={post.date}>{post.date}</time><span>{post.readingTime}</span></div></header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
        <Link href="/blog" className="tn-visit">← Bütün teknik yazılar</Link>
    </article>;
}
