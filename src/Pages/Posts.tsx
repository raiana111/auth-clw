import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useAuthStore } from '../store/userAuthStore';
import { IPost } from '../types';
import { getPosts } from '../api/posts';

export const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Ошибка получения постов:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Посты
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            onClick={() => handlePostClick(post.id)}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
          >
            <Box>
              <Typography variant="body1">{post.content}</Typography>
              <Typography variant="caption" color="text.secondary">
                Автор: {post.email || 'Аноним'} -{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Posts;