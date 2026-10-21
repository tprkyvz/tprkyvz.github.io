import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import PostList from '../components/PostList';
export const metadata: Metadata = { title: 'Yazılar' };
export default function BlogPage() {
    return <section><span className="tn-eyebrow">NOT DEFTERİ</span><h1>Yazılar</h1><PostList allPostsData={getSortedPostsData()} /></section>;
}
