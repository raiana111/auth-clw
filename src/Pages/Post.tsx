import { Alert, Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '../api/posts'
import { useAuthStore } from '../store/userAuthStore'
import { IPost } from '../types'

export const Post = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { user, profile } = useAuthStore()
	const [post, setPost] = useState<IPost | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchPost = async () => {
			if (!id) {
				setError('ID поста не указан')
				setLoading(false)
				return
			}

			if (!user) {
				navigate('/login')
				return
			}

			if (!profile || profile.role !== 'user') {
				setError('У вас недостаточно прав для просмотра этой страницы')
				setLoading(false)
				return
			}

			try {
				const postData = await getPostById(id)
				if (!postData) {
					setError('Пост не найден')
					setTimeout(() => navigate('/'), 2000)
					return
				}
				setPost(postData)
				setLoading(false)
			} catch (err) {
				setError('Ошибка при загрузке поста')
				console.error('Ошибка получения поста:', err)
				setLoading(false)
			}
		}

		fetchPost()
	}, [id, user, profile, navigate])

	if (loading)
		return (
			<Container maxWidth='md'>
				<Typography>Загрузка...</Typography>
			</Container>
		)
	if (error)
		return (
			<Container maxWidth='md'>
				<Alert severity='error'>{error}</Alert>
			</Container>
		)
	if (!post) return null

	return (
		<Container maxWidth='md'>
			<Box sx={{ mt: 4 }}>
				<Typography variant='h4' gutterBottom>
					Post
				</Typography>
				<Typography variant='body1' sx={{ mb: 2 }}>
					{post.content}
				</Typography>
				<Typography variant='caption' color='text.secondary'>
					Author: {post.email || 'Аноним'}
				</Typography>
				<Typography variant='caption' color='text.secondary' sx={{ ml: 2 }}>
					Created at: {new Date(post.createdAt).toLocaleString()}
				</Typography>
			</Box>
		</Container>
	)
}

export default Post
