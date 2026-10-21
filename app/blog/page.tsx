import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import PostList from '../components/PostList';
import ShellPrompt from '../components/ShellPrompt';
export const metadata: Metadata = { title: 'Yazılar' };
export default function BlogPage() {
    return <section><ShellPrompt command="ls" args="-t ~/yazilar/" /><h1>Yazılar</h1><PostList allPostsData={getSortedPostsData()} /></section>;
}
