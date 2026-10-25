import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostIds, getPostData } from '@/lib/posts';
import type { Metadata } from 'next';
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
    const paths = getAllPostIds('muhayyer').map(path => ({ slug: path.params.slug }));
    // Next.js static export requires one parameter even before the first post.
    // This reserved path renders the standard 404 and is never listed as a post.
    return paths.length ? paths : [{ slug: '_empty' }];
}
async function getMuhayyerPost(slug: string) {
    if (!getAllPostIds('muhayyer').some(path => path.params.slug === slug)) notFound();
    return getPostData(slug, 'muhayyer');
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getMuhayyerPost(slug);
    return { title: post.title, description: typeof post.description === 'string' ? post.description : undefined };
}
export default async function Post({ params }: Props) {
    const { slug } = await params;
    const post = await getMuhayyerPost(slug);
    return <article className="post"><Link href="/muhayyer-yazilar" className="tn-back">← Muhayyer Yazılar</Link>
        <header className="post-header"><h1>{post.title}</h1><div className="post-meta"><time dateTime={post.date}>{post.date}</time><span>{post.readingTime}</span></div></header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
        <Link href="/muhayyer-yazilar" className="tn-visit">← Bütün muhayyer yazılar</Link>
    </article>;
}
