'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone'),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password required'),
  newPassword: z.string().min(6, 'Password must be 6+ characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const profileForm = useForm({
    defaultValues: {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('Profile updated!')
      } catch (error) {
        toast.error('Failed to update profile')
      } finally {
        setIsLoading(false)
      }
    },
    validatorAdapter: zodValidator(),
  })

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success('Password changed!')
        passwordForm.reset()
      } catch (error) {
        toast.error('Failed to change password')
      } finally {
        setIsLoading(false)
      }
    },
    validatorAdapter: zodValidator(),
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      profileForm.handleSubmit()
                    }}
                    className="space-y-6"
                  >
                    <profileForm.Field
                      name="fullName"
                      validators={{ onChange: profileSchema.shape.fullName }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
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

                    <profileForm.Field
                      name="email"
                      validators={{ onChange: profileSchema.shape.email }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
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

                    <profileForm.Field
                      name="phone"
                      validators={{ onChange: profileSchema.shape.phone }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
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

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button variant="outline" size="sm">Add Address</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">Home</p>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">123 Main St</p>
                    <p className="text-sm text-muted-foreground">New York, 10001</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold">Work</p>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">456 Office Blvd</p>
                    <p className="text-sm text-muted-foreground">New York, 10002</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      passwordForm.handleSubmit()
                    }}
                    className="space-y-6"
                  >
                    <passwordForm.Field
                      name="currentPassword"
                      validators={{ onChange: passwordSchema.shape.currentPassword }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
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

                    <Separator />

                    <passwordForm.Field
                      name="newPassword"
                      validators={{ onChange: passwordSchema.shape.newPassword }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
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

                    <passwordForm.Field
                      name="confirmPassword"
                      validators={{ onChange: passwordSchema.shape.confirmPassword }}
                      children={(field) => (
                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
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

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
