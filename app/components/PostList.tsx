'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { PostData } from '@/lib/types';
export default function PostList({ allPostsData, basePath = '/blog' }: { allPostsData: PostData[]; basePath?: string }) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const tags = Array.from(new Set(allPostsData.flatMap(post => post.tags)));
    const posts = selectedTag ? allPostsData.filter(post => post.tags.includes(selectedTag)) : allPostsData;
    return <>
        {allPostsData.length > 0 && <div className="tag-filters" aria-label="Yazı etiketleri">
            <button type="button" aria-pressed={selectedTag === null} onClick={() => setSelectedTag(null)}>Tümü</button>
            {tags.map(tag => <button type="button" key={tag} aria-pressed={selectedTag === tag} onClick={() => setSelectedTag(tag)}>#{tag}</button>)}
        </div>}
        <div className="tn-posts" aria-live="polite">
            {posts.map(post => <Link key={post.id} href={`${basePath}/${post.id}`}>
                <span>{post.tags.map(tag => `#${tag}`).join(' · ')}</span><h2>{post.title}</h2><b aria-hidden="true">↗</b>
                <div className="post-meta"><time dateTime={post.date}>{post.date}</time><span>{post.readingTime}</span></div>
            </Link>)}
            {posts.length === 0 && <p>{selectedTag ? 'Bu etikette henüz yazı yok.' : 'Henüz yazı yok.'}</p>}
        </div>
    </>;
}
