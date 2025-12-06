import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyOtp } from '../api/authApi'

function VerifyOtpPage() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const email = location.state?.email

  if (!email) {
    // 이메일 없이 들어오면 로그인으로
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await verifyOtp({ email, otp })
      localStorage.setItem('accessToken', res.data.accessToken)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'OTP 검증 실패')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>2차 인증 (OTP)</h2>
      <p>{email} 으로 전송된 OTP를 입력하세요.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP 코드</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? '검증 중...' : '확인'}
        </button>
      </form>
    </div>
  )
}

export default VerifyOtpPage
