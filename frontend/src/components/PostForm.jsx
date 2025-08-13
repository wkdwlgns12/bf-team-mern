import React from 'react'
import axios from 'axios'

const PostForm = () => {

    const API = import.meta.env.VITE_API_URL

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${API}/api/posts`)
            const data = Array.isArray(res.data) ? res.data : res.data.posts ?? []
            console.log(data)
        } catch (error) {
            console.error('데이터 가져오기 실패:', error)
        }
    }

    fetchPosts()

    return (
        <div>PostForm</div>
    )
}

export default PostForm
