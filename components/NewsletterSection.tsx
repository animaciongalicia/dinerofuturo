'use client'

import { useState } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterSection() {
  const [email, setEmail]   = useState('')
  const [state, setState]   = useState<State>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrMsg('')

    try {
      const res  = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setErrMsg(data.error ?? 'Algo falló. Prueba de nuevo.')
        setState('error')
      } else {
        setState('success')
        setEmail('')
      }
    } catch {
      setErrMsg('Sin conexión. Prueba de nuevo.')
      setState('error')
    }
  }

  return (
    <section id="newsletter" className="bg-forest border-t border-white/10">
      <div className="max-w-wrap mx-auto px-7 py-5">
        {state === 'success' ? (
          <div className="flex items-center justify-center gap-3 py-1 text-white">
            <span className="text-sage text-[18px]">✓</span>
            <p className="text-[15px] font-medium">Listo, te avisamos cada semana.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 flex-wrap max-sm:flex-col max-sm:items-stretch"
          >
            <p className="text-[14px] text-white/75 flex-shrink-0">
              Recibe los artículos nuevos cada semana. Sin spam.
            </p>

            <div className="flex gap-2 flex-1 min-w-[280px] max-sm:min-w-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                disabled={state === 'loading'}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-[9px] text-[14px] text-white placeholder:text-white/35 outline-none focus:border-sage transition-colors font-sans disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={state === 'loading'}
                className="bg-gold text-forest px-5 py-[9px] rounded-lg text-[14px] font-bold whitespace-nowrap hover:brightness-110 transition-all disabled:opacity-60 font-sans"
              >
                {state === 'loading' ? '…' : 'Apuntarme'}
              </button>
            </div>

            {state === 'error' && (
              <p className="w-full text-[12px] text-red-300">{errMsg}</p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
