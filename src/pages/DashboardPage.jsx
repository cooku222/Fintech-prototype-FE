import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../api/authApi'

function DashboardPage() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe()
        setUser(res.data)
      } catch (err) {
        setError('사용자 정보를 불러오는데 실패했습니다.')
      }
    }
    fetchMe()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h2>핀테크 대시보드</h2>
      <button onClick={handleLogout}>로그아웃</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div style={{ marginTop: 20 }}>
          <p>이름: {user.fullName}</p>
          <p>이메일: {user.email}</p>
          <p>역할: {user.role}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  )
}

export default DashboardPage
