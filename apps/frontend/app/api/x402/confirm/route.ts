import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ConfirmSchema = z.object({
    quote_id: z.string().min(1, 'quote_id required'),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { quote_id } = ConfirmSchema.parse(body)

        const apiBaseUrl =
            process.env.API_BASE_URL ||
            process.env.NEXT_PUBLIC_API_URL ||
            'http://localhost:8000'

        const upstreamResponse = await fetch(`${apiBaseUrl}/api/v1/bets/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quote_id }),
        })

        const responseBody = await upstreamResponse.text()
        const headers = new Headers()
        const contentType = upstreamResponse.headers.get('content-type')
        if (contentType) {
            headers.set('content-type', contentType)
        }

        return new NextResponse(responseBody, {
            status: upstreamResponse.status,
            headers,
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid request', details: error.errors },
                { status: 400 }
            )
        }

        console.error('[X402-CONFIRM-ERROR]', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
