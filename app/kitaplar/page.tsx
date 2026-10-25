import type { Metadata } from 'next';
import { getSortedPostsData } from '@/lib/posts';
import { readingProfile } from '@/lib/reading';
import PostList from '../components/PostList';
import ShellPrompt from '../components/ShellPrompt';

export const metadata: Metadata = {
    title: 'Kitaplar',
    description: 'Okuduğum kitaplar üzerine notlar ve yazılar.',
};

export default function BooksPage() {
    const posts = getSortedPostsData('books');
    const profileContent = <>
        <span className="tn-eyebrow">OKUMA GÜNLÜĞÜM</span>
        <span className="books-profile-brand">1000<span>Kitap</span></span>
        <span className="books-profile-name">{readingProfile.name}</span>
        <span className="books-profile-caption">Okuduklarım, alıntılarım ve kitaplığım.</span>
        {readingProfile.url && <span className="books-profile-visit">Profilime git <span aria-hidden="true">↗</span></span>}
    </>;

    return <section>
        <ShellPrompt command="ls" args="-t ~/kitaplar/" />
        <h1>Kitaplar</h1>
        <p>Okuduklarım üzerine düşünceler, altını çizdiklerim ve bende kalanlar.</p>
        {readingProfile.url
            ? <a className="books-profile" href={readingProfile.url} target="_blank" rel="noopener noreferrer" aria-label="1000Kitap profilim (yeni sekmede açılır)">{profileContent}</a>
            : <div className="books-profile">{profileContent}</div>}
        <section className="books-writing" aria-labelledby="kitap-yazilari">
            <h2 id="kitap-yazilari">Kitap yazıları</h2>
            {posts.length > 0
                ? <PostList allPostsData={posts} basePath="/kitaplar" />
                : <p className="books-empty">İlk kitap yazısı yakında burada.</p>}
        </section>
    </section>;
}
