import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import PostList from '../components/PostList';
import ShellPrompt from '../components/ShellPrompt';

export const metadata: Metadata = {
    title: 'Muhayyer Yazılar',
    description: 'Aklıma gelenler, gündelik düşünceler ve serbest yazılar.',
};

export default function MuhayyerPage() {
    return <section>
        <ShellPrompt command="ls" args="-t ~/muhayyer-yazilar/" />
        <h1>Muhayyer Yazılar</h1>
        <p>Aklıma gelenler. Konusu serbest, yolu açık yazılar.</p>
        <PostList allPostsData={getSortedPostsData('muhayyer')} basePath="/muhayyer-yazilar" />
    </section>;
}
