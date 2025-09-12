'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`, // This URL should be handled by your /auth/callback route
      },
    })

    if (signUpError) {
      setError(signUpError.message)
    } else {
      // You might want to redirect to a verification page or directly to sign-in
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your EDMAX account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-address" className="sr-only">Email address</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#003561] sm:text-sm sm:leading-6 outline-none"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#003561] sm:text-sm sm:leading-6 outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="sr-only">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#003561] sm:text-sm sm:leading-6 outline-none"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label="Confirm Password"
                disabled={loading}
              />
            </div>
          </div>

          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

          <div>
            <Button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-[#003561] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#00274d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003561] cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 cursor-pointer"
            aria-label="Sign up with Google"
            disabled={loading}
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 4.02c2.09 0 3.4 0.94 4.19 1.62l3.05-3.05C17.7 1.48 15.02 0 12 0 7.55 0 3.75 2.5 1.71 6.13l3.65 2.82C6.06 5.86 8.7 4.02 12 4.02z" fill="#EA4335" />
              <path d="M23.63 12.11c0-0.79-0.07-1.46-0.19-2.13H12v4.02h6.54c-0.27 1.34-0.89 2.56-1.74 3.48l3.23 2.5c2.05-3.05 3.2-6.97 3.2-11.87z" fill="#4285F4" />
              <path d="M5.7 14.17c-0.23-0.67-0.36-1.39-0.36-2.17s0.13-1.5 0.36-2.17l-3.65-2.82C1.49 8.24 0 9.9 0 12s1.49 3.76 4.06 5.06l3.65-2.89z" fill="#FBBC05" />
              <path d="M12 24c3.27 0 5.92-1.07 7.9-2.91l-3.23-2.5c-1.06 0.72-2.42 1.13-4.67 1.13-3.3 0-6.07-2.17-7.06-5.11L1.71 17.87C3.75 21.5 7.55 24 12 24z" fill="#34A853" />
            </svg>
            Sign up with Google
          </Button>
          <Button
            className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 cursor-pointer"
            aria-label="Sign up with Apple"
            disabled={loading}
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 17.027c-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.256.442-.656.643-1.15.658-.518-.01-.98-.245-1.228-.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694-.247-.442-.647-.643-1.15-.658-.518-.01-.98.245-1.228.694C7.03 17.15 6.75 17.027 6.47 16.745c-.28-.28-.518-.62-.647-1.026-.115-.41-.168-.847-.168-1.284 0-.395.038-.795.138-1.15.093-.364.26-.714.47-1.026.216-.312.48-.61.776-.87.3-.26.626-.48.96-.658.33-.178.68-.27.99-.27.32 0 .68.083.99.27.33.178.656.396.96.658.3.26.57.556.776.87.21.312.38.662.47 1.026.095.355.138.755.138 1.15s-.038.795-.138 1.15c-.093.364-.26.714-.47 1.026-.216.312-.48.61-.776.87-.3.26-.626.48-.96.658-.33.178-.68.27-.99.27.32 0 .68-.083.99-.27.33-.178.656-.396.96-.658.3.26.57.556.776.87.21.312.38.662.47 1.026.095.355.138.755.138 1.15s-.038.795-.138 1.15c-.093.364-.26.714-.47 1.026-.216.312-.48.61-.776.87-.3.26-.626.48-.96.658-.33.178-.68.27-.99.27zM11.66 1.777c-.443-.518-.94-.85-1.46-.85-.506 0-.958.312-1.25.755-.264.426-.355.94-.28 1.516.07.575.385 1.117.776 1.545.396.42.9.72 1.4.72.506 0 .958-.312 1.25-.755.264-.426.355-.94.28-1.516-.07-.575-.385-1.117-.776-1.545z\" />
            </svg>
            Sign up with Apple
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-[#E86514] hover:text-[#003561]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}