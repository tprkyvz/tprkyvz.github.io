import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import PostList from '../components/PostList';
import ShellPrompt from '../components/ShellPrompt';

export const metadata: Metadata = {
    title: 'TBlogs',
    description: 'Siber güvenlik, ağlar, Linux ve teknoloji üzerine teknik blog yazıları.',
};

export default function BlogPage() {
    return <section>
        <ShellPrompt command="ls" args="-t ~/tblogs/" />
        <h1>TBlogs</h1>
        <p>Siber güvenlik, ağlar, Linux ve teknoloji üzerine teknik yazılarım.</p>
        <PostList allPostsData={getSortedPostsData()} />
    </section>;
}
