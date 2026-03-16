import { fetchAllInstagramPosts } from '@/app/lib/data';
import InstagramAdminClient from './instagram-admin-client';

export default async function AdminInstagramPage() {
  const posts = await fetchAllInstagramPosts();
  return <InstagramAdminClient posts={posts} />;
}
