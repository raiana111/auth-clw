import { useEffect, useState } from 'react';
import { Box, List, ListItem, Typography, Select, MenuItem } from '@mui/material';
import { useAuthStore } from '../store/userAuthStore';
import { axiosApi } from '../axiosApi';

interface Post {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
}
export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params: { orderBy?: string; equalTo?: string } = {};

        if (selectedUserId) {
          params.orderBy = '"userId"';
          params.equalTo = `"${selectedUserId}"`;
        }

        const response = await axiosApi.get('/posts.json', {
          params: selectedUserId ? params : {}
        });

        const data = response.data || {};
        const postsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setPosts(postsArray);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [selectedUserId, user]);

  return (
    <Box sx={{ mt: 4 }}>
      <Select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value as string)}
        displayEmpty
      >
        <MenuItem value="">All Posts</MenuItem>
        <MenuItem value={user?.id || ''}>My Posts</MenuItem>
      </Select>

      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <Typography>
              {post.content} - {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
