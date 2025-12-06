import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/authApi'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ email, password })
      // 로그인 성공하면 OTP 단계로 진입
      navigate('/verify-otp', { state: { email } })
    } catch (err) {
      setError(err.response?.data?.message || '로그인 실패')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>핀테크 로그인</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? '진행 중...' : '로그인'}
        </button>
      </form>

      <button onClick={() => navigate('/register')} style={{ marginTop: 10 }}>
        회원가입
      </button>
    </div>
  )
}

export default LoginPage
