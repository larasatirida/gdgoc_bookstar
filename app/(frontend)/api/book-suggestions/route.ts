import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  try {
    const { title, author } = await req.json()
    
    if (!title || !author) {
      return NextResponse.json({ error: 'Title and author required' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'book-suggestions',
      data: { title, author },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting book suggestion:', error)
    return NextResponse.json({ 
      error: 'Failed to submit', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
