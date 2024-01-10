import styles from '@/styles/Home.module.css'
import { useState } from 'react'

export default function Home() {

  const [connectionString, setConnectionString] = useState<string>('')
  const [result, setResult] = useState<string | null>(null)

  const testConnection = () => {
    setResult(null)
    fetch('/api/test', {
      method: 'POST',
      body: JSON.stringify({ connectionString }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      setResult(JSON.stringify(res, null, 2))
    })
  }

  return (
    <>
      <main className={`${styles.main}`}>
        <pre>Connection String:</pre>
        <input value={connectionString} onChange={e => 
          setConnectionString(e.target.value)
        }/>
        <button onClick={testConnection}>Test</button>
        {result && <pre>{result}</pre>}
      </main>
    </>
  )
}
