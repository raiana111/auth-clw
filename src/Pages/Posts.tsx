// import { useEffect, useState } from 'react';
// import { Box, List, ListItem, Typography, Select, MenuItem } from '@mui/material';
// import { useAuthStore } from '../store/userAuthStore';
// import {IPost} from '../types'
// import { getPosts } from '../api/posts';


// export const Posts = () => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [selectedUserId, setSelectedUserId] = useState<string>('');
//   const { user } = useAuthStore();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postsData = await getPosts(selectedUserId);
//         setPosts(postsData);
//       } catch (error){
//         console.error('Error fetching posts:', error);
//         setPosts([]);
//       }
//     };

//     fetchPosts();
//   }, [selectedUserId, user]);

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Select
//         value={selectedUserId}
//         onChange={(e) => setSelectedUserId(e.target.value as string)}
//         displayEmpty
//       >
//         <MenuItem value="">All Posts</MenuItem>
//         <MenuItem value={user?.id || ''}>My Posts</MenuItem>
//       </Select>

//       <List>
//         {posts.map((post) => (
//           <ListItem key={post.id}>
//             <Typography>
//               {post.content} - {new Date(post.createdAt).toLocaleDateString()}
//             </Typography>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };




// Pages/Posts.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, Typography, Select, MenuItem } from '@mui/material';
import { useAuthStore } from '../store/userAuthStore';
import { IPost } from '../types';
import { getPosts } from '../api/posts';

export const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts(selectedUserId);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [selectedUserId]);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value as string)}
        displayEmpty
      >
        <MenuItem value="">All Posts</MenuItem>
        {user && <MenuItem value={user.id}>My Posts</MenuItem>}
      </Select>

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
