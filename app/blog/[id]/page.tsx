'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost, getPostData } from '@/lib/blog';

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const postId = params.id as string;

  useEffect(() => {
    async function loadPost() {
      try {
        const postData = await getPostData(postId);
        setPost(postData);
      } catch (error) {
        console.error('Failed to load blog post:', error);
      } finally {
        setLoading(false);
      }
    }

    if (postId) {
      loadPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10">
        <p>Post not found.</p>
        <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="prose lg:prose-xl max-w-none">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to blog
      </Link>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
        <div className="text-gray-500 mt-2">{post.formattedDate}</div>
      </header>
      
      <div 
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}