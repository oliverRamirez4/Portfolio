'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { parseISO, format } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  formattedDate: string;
  excerpt: string;
  content: string;
}

export async function getSortedPostsData(): Promise<BlogPost[]> {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Ensure date is in string format
    const date = matterResult.data.date ? matterResult.data.date.toString() : '';
    
    // Format the date
    const formattedDate = date 
      ? format(parseISO(date), 'MMMM d, yyyy') 
      : '';

    // Combine the data with the id
    return {
      id,
      formattedDate,
      date,
      content: matterResult.content,
      ...(matterResult.data as { title: string; excerpt: string }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const content = processedContent.toString();

  // Ensure date is in string format
  const date = matterResult.data.date ? matterResult.data.date.toString() : '';
  
  // Format the date
  const formattedDate = date 
    ? format(parseISO(date), 'MMMM d, yyyy') 
    : '';

  // Combine the data with the id and contentHtml
  return {
    id,
    content,
    formattedDate,
    date,
    ...(matterResult.data as { title: string; excerpt: string }),
  };
}

export async function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}