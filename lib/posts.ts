import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostData } from './types';

type Collection = 'blog' | 'books' | 'muhayyer';

function getPostsDirectory(collection: Collection) {
    return path.join(process.cwd(), 'content', collection === 'blog' ? '' : collection);
}

function getFileNames(directory: string) {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
        .map(entry => entry.name);
}

function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `~${minutes} dk okuma`;
}

export function getSortedPostsData(collection: Collection = 'blog'): PostData[] {
    const postsDirectory = getPostsDirectory(collection);
    const fileNames = getFileNames(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        const readingTime = calculateReadingTime(matterResult.content);
        const tags = matterResult.data.tags || [];

        return {
            id,
            readingTime,
            tags,
            ...(matterResult.data as { date: string; title: string }),
        };
    });

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds(collection: Collection = 'blog') {
    const postsDirectory = getPostsDirectory(collection);
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    const fileNames = getFileNames(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id: string, collection: Collection = 'blog'): Promise<PostData> {
    const postsDirectory = getPostsDirectory(collection);
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    const readingTime = calculateReadingTime(matterResult.content);
    const tags = matterResult.data.tags || [];

    return {
        id,
        contentHtml,
        readingTime,
        tags,
        ...(matterResult.data as { date: string; title: string }),
    };
}
