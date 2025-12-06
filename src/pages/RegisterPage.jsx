import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/authApi'

function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await register({ fullName, email, password })
      setSuccess('회원가입 성공! 이제 로그인 해주세요.')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || '회원가입 실패')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default RegisterPage
