import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PostForm.css'
const PostForm = () => {

    const API = import.meta.env.VITE_API_URL

    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("")         // 책 제목
    const [author, setAuthor] = useState("")       // 책 작가
    const [description, setDescription] = useState("") // 책 설명
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")

    const fetchPosts = async () => {
        try {

            const res = await axios.get(`${API}/api/books`)
            const data = Array.isArray(res.data) ? res.data : res.data.posts ?? []
            // console.log(data)
            setPosts(data)
        } catch (error) {
            console.log(error, "불러오기 실패")
        }

    }


    useEffect(() => {
        fetchPosts()

    }, [])

    const onCreate = async () => {
        if (!title.trim()) return
        try {
            setLoading(true)
            await axios.post(`${API}/api/books`, { title, author, description })
            setTitle('')
            setAuthor('')
            setDescription('')
            await fetchPosts()

        } catch (error) {
            alert("등록 실패")
        } finally {
            setLoading(false)
        }

    }


    const onUpdate = async (post) => {
        const id = post._id ?? post.id
        const nextTitle = prompt('새 제목', post.title ?? '')
        if (nextTitle == null) return
        const nextAuthor = prompt('새 작가', post.author ?? '')
        if (nextAuthor == null) return
        const nextDescription = prompt('새 설명', post.description ?? '')
        if (nextDescription == null) return

        try {
            setLoading(true)
            await axios.put(`${API}/api/books/${id}`,
                {
                    ...post,
                    title: nextTitle.trim(),
                    author: nextAuthor.trim(),
                    description: nextDescription.trim()
                }
            )
            await fetchPosts()
        } catch (error) {
            alert('수정 실패')
        } finally {
            setLoading(false)
        }
    }
    const onDelete = async (id) => {

        if (!confirm('정말 삭제할까요?')) return


        try {
            setLoading(true)
            await axios.delete(`${API}/api/books/${id}`)
            await fetchPosts()
        } catch (error) {
            alert('삭제 실패')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='post-wrap'>
            <h2>Books</h2>
            <div className="post-controls">
                {/* 제목 입력 */}
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder='제목을 입력하세요' />
                {/* 작가 입력 */}
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    type="text"
                    placeholder='작가를 입력하세요' />
                {/* 설명 입력 */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='설명을 입력하세요'
                    rows={3}></textarea>
                <div className="post-buttons">
                    {/* 등록 버튼 */}
                    <button className="btn" onClick={onCreate} disabled={loading}>등록</button>
                    {/* 새로고침 버튼 → fetchPosts 호출 */}
                    <button className="btn refresh" onClick={fetchPosts} disabled={loading}>새로고침</button>
                </div>
            </div>

            {loading && <p>불러오는 중....</p>}
            {err && <p>{err}</p>}
            <ul className='post-list'>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h4>{post.title}</h4>
                        <p><b>작가:</b> {post.author}</p>
                        <p>{post.description}</p>
                        <button className="update btn" onClick={() => onUpdate(post)}>수정</button>
                        <button className="delete btn" onClick={() => onDelete(post._id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostForm