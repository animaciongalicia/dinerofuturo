import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const email = typeof body === 'object' && body !== null && 'email' in body
    ? String((body as { email: unknown }).email).trim().toLowerCase()
    : ''

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email no válido.' }, { status: 422 })
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL

  if (!webhookUrl) {
    // Desarrollo local — solo log, no falla
    console.log(`[subscribe] Email recibido (sin webhook): ${email}`)
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, fecha: new Date().toISOString() }),
    })

    if (!res.ok) {
      console.error(`[subscribe] Webhook devolvió ${res.status}`)
      return NextResponse.json(
        { error: 'No pudimos apuntarte ahora mismo. Inténtalo en un momento.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[subscribe] Error al llamar al webhook:', err)
    return NextResponse.json(
      { error: 'Error de red. Prueba de nuevo.' },
      { status: 502 },
    )
  }
}
