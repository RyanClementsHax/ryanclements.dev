'use client'

import { useState } from 'react'

interface FormState {
  ok: boolean
  message: string
}

const initialState: FormState = {
  ok: true,
  message: ''
}

export function SubscribeForm(): JSX.Element {
  const [formState, setFormState] = useState(initialState)
  return (
    <form
      className="card mx-auto flex flex-col gap-4 bg-surface-base-elevation-100 text-on-surface-base"
      onSubmit={async e => {
        e.preventDefault()
        const email = e.currentTarget.email.value
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, referringUrl: window.location.href })
        })
        const { message } = await res.json()
        if (res.ok) {
          ;(e.target as HTMLFormElement).reset()
        }
        setFormState({
          ok: res.ok,
          message
        })
      }}
    >
      <h2 className="text-xl">
        Subscribe to receive more like this in your inbox.
      </h2>
      <p className="text-on-surface-base-muted">
        No spam <span className="italic">ever.</span>
      </p>
      <div className="mx-auto flex gap-4">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          required
          type="text"
          name="email"
          className="overflow-hidden rounded-md border border-borderColor bg-surface-base px-3 py-2 text-left text-sm shadow-sm focus:border-borderColor-focus focus:outline-none focus:ring-1 focus:ring-ringColor-focus"
          placeholder="Enter your email"
        />
        <button className="rounded-md bg-accent-400 px-3 py-2 text-sm text-on-surface-accent shadow-sm hover:bg-surface-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-accent">
          Subscribe
        </button>
      </div>
      {formState.message && (
        <p
          aria-live="polite"
          className={`text-sm ${
            formState.ok === true ? 'text-success' : 'text-danger'
          }`}
        >
          {formState.message}
        </p>
      )}
    </form>
  )
}
