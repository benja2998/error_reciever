import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  const { name, email, software, description } = req.body || {}

  // Check if the description is atleast 10 characters long
  if (description && description.length < 10) {
    res.status(400).send('Description must be at least 10 characters long')
    return
  }

  // Remove <> to avoid injection
  const sanitizedDescription = description.replace(/<[^>]*>/g, '')
  const sanitizedName = name.replace(/<[^>]*>/g, '')
  const sanitizedEmail = email.replace(/<[^>]*>/g, '')
  const sanitizedSoftware = software.replace(/<[^>]*>/g, '')

  // Check if the software is one of the allowed values

  const allowedSoftware = ['kali-in-batch', 'peroxide-h', 'linux-on-batch-windows']

  if (!allowedSoftware.includes(software)) {
    res.status(400).send('Invalid software value')
    return
  }

  console.log('Received form data:')
  console.log('Name:', name)
  console.log('Email:', email)
  console.log('Software:', software)
  console.log('Description:', description)

  res.status(200).send('Bug report received')
}
