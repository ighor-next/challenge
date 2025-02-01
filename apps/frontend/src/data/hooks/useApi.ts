import { useCallback } from 'react'

const urlBase = process.env.NEXT_PUBLIC_API_URL

export default function useApi() {
  const httpGet = useCallback(async function (path: string) {
    const uri = path.startsWith('/') ? path : `/${path}`
    const urlComplete = `${urlBase}${uri}`

    const res = await fetch(urlComplete)
    return extractDados(res)
  }, [])

  const httpPost = useCallback(async function (path: string, body?: any) {
    const uri = path.startsWith('/') ? path : `/${path}`
    const urlComplete = `${urlBase}${uri}`

    const res = await fetch(urlComplete, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    })
    return extractDados(res)
  }, [])

  const httpPatch = useCallback(async function (path: string, body?: any) {
    const uri = path.startsWith('/') ? path : `/${path}`
    const urlComplete = `${urlBase}${uri}`

    const res = await fetch(urlComplete, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    })
    return extractDados(res)
  }, [])

  const httpDelete = useCallback(async function (path: string) {
    const uri = path.startsWith('/') ? path : `/${path}`
    const urlComplete = `${urlBase}${uri}`

    const res = await fetch(urlComplete, {
      method: 'DELETE'
    })
    return extractDados(res)
  }, [])

  async function extractDados(res: Response) {
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Erro ao processar a requisição')
    }
    return res.json()
  }

  return { httpGet, httpPost, httpPatch, httpDelete }
}
