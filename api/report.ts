import type { VercelRequest, VercelResponse } from '@vercel/node'

const allowedSoftware = ['kali-in-batch', 'peroxide-h', 'linux-on-batch-windows']

function sanitize(input: string) {
  return input.replace(/<[^>]*>/g, '').trim()
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  let { name, email, software, description } = req.body || {}

  if (typeof name !== 'string' || typeof email !== 'string' || typeof software !== 'string' || typeof description !== 'string') {
    return res.status(400).send('Invalid input types')
  }

  name = sanitize(name)
  email = sanitize(email)
  software = sanitize(software)
  description = sanitize(description)

  if (description.length < 10) {
    return res.status(400).send('Description must be at least 10 characters long')
  }

  if (!allowedSoftware.includes(software)) {
    return res.status(400).send('Invalid software value')
  }

  if (!isValidEmail(email)) {
    return res.status(400).send('Invalid email format')
  }

  if (!name) {
    return res.status(400).send('Name cannot be empty')
  }

  console.log('Received form data:')
  console.log('Name:', name)
  console.log('Email:', email)
  console.log('Software:', software)
  console.log('Description:', description)

  res.status(200).send('Bug report received')
}
