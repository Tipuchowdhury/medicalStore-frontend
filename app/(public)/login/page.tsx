'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('Login successful!')
        router.push('/orders')
      } catch (error) {
        toast.error('Login failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-2xl">
                  💊
                </div>
              </div>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Login to your MediStore account</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  form.handleSubmit()
                }}
                className="space-y-4"
              >
                <form.Field
                  name="email"
                  validators={{
                    onChange: loginSchema.shape.email,
                  }}
                  children={(field) => (
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isLoading}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-xs text-destructive mt-1">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                />

                <form.Field
                  name="password"
                  validators={{
                    onChange: loginSchema.shape.password,
                  }}
                  children={(field) => (
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isLoading}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-xs text-destructive mt-1">{field.state.meta.errors[0]}</p>
                      )}
                    </div>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <div className="mt-6 space-y-2 text-center text-sm">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-primary font-semibold hover:underline">
                    Register here
                  </Link>
                </p>
                <p className="text-muted-foreground">
                  <Link href="#" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
