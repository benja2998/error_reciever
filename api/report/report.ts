import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  const { name, email, software, description } = req.body || {}

  console.log('Received form data:')
  console.log('Name:', name)
  console.log('Email:', email)
  console.log('Software:', software)
  console.log('Description:', description)

  res.status(200).send('Bug report received')
}
