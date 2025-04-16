'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BlogPost, getSortedPostsData } from '@/lib/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts on the client side
    async function fetchPosts() {
      try {
        const allPosts = await getSortedPostsData();
        setPosts(allPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600">
          Welcome to my blog where I share my thoughts on technology, software development, and personal projects.
        </p>
      </header>

      {loading ? (
        <div className="text-center py-10">
          <p>Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10">
          <p>No blog posts found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <Link href={`/blog/${post.id}`} className="block">
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500 mb-4">
                  {post.formattedDate}
                </div>
                <p className="text-gray-700">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-blue-600 font-medium">
                  Read more →
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}