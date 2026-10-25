import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostIds, getPostData } from '@/lib/posts';
import type { Metadata } from 'next';
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
    const paths = getAllPostIds('books').map(path => ({ slug: path.params.slug }));
    // Next.js static export requires one parameter even before the first book post.
    // This reserved path renders the standard 404 and is never listed as a post.
    return paths.length ? paths : [{ slug: '_empty' }];
}
async function getBookPost(slug: string) {
    if (!getAllPostIds('books').some(path => path.params.slug === slug)) notFound();
    return getPostData(slug, 'books');
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBookPost(slug);
    return { title: post.title, description: typeof post.description === 'string' ? post.description : undefined };
}
export default async function Post({ params }: Props) {
    const { slug } = await params;
    const post = await getBookPost(slug);
    return <article className="post"><Link href="/kitaplar" className="tn-back">← Kitaplar</Link>
        <header className="post-header"><h1>{post.title}</h1><div className="post-meta"><time dateTime={post.date}>{post.date}</time><span>{post.readingTime}</span></div></header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
        <Link href="/kitaplar" className="tn-visit">← Bütün kitap yazıları</Link>
    </article>;
}
