import React, { useState } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';
import { useAuthStore } from '../store/userAuthStore.ts';
import { createPost } from '../api/posts';

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await createPost({
      content,
      userId: user.id,
      email: user.email || '',
      createdAt: new Date().toISOString(),
    })
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="New Post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};
