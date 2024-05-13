/* eslint-disable no-console */

export async function POST(request: Request): Promise<Response> {
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID
  if (!publicationId) {
    console.error('Must have BEEHIIV_PUBLICATION_ID defined')
    return Response.json(
      {
        message: 'Oops! Something went wrong'
      },
      {
        status: 500
      }
    )
  }
  const apiKey = process.env.BEEHIIV_API_KEY
  if (!apiKey) {
    console.error('Must have BEEHIIV_API_KEY defined')
    return Response.json(
      {
        message: 'Oops! Something went wrong'
      },
      {
        status: 500
      }
    )
  }

  const { email, referringUrl } = await request.json()
  if (!email) {
    return Response.json(
      {
        message: 'Please submit a valid email'
      },
      {
        status: 400
      }
    )
  }
  const url = new URL(referringUrl)
  // https://developers.beehiiv.com/docs/v2/1a77a563675ee-create
  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: url.searchParams.get('ref') || url.host,
        referring_site: referringUrl,
        utm_medium: url.host
      })
    }
  )
  if (!response.ok) {
    console.error(await response.json())
    return Response.json(
      {
        message: 'Oops! Something went wrong.'
      },
      {
        status: 500
      }
    )
  } else {
    return Response.json({
      message: "You've been subscribed!"
    })
  }
}
