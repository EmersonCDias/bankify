'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CustomInput from '@/components/CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader } from 'lucide-react'

const AuthForm = ({ type }: AuthFormProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  console.log('type', type)

  const onSubmit = (values: z.infer<typeof authFormSchema>) => {
    setIsLoading(true)
    console.log(values)
    setIsLoading(false)
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Bankify logo"
          />

          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Bankify
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap3">
          <h1 className="text-24 lg:test-36 font-semibold text-gray-900">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>

          <p className="text-16 font-normal text-gray-600">
            {user
              ? 'Link you account to get started'
              : 'Please, enter your details'}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomInput
              id="email"
              control={form.control}
              name="email"
              label="E-mail"
              placeholder="Enter your e-mail"
            />

            <CustomInput
              id="password"
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <div className="flex flex-col gap-4">
              <Button className="form-btn " type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" /> &nbsp; Loading...{' '}
                  </>
                ) : type === 'sign-in' ? (
                  'Sign In'
                ) : (
                  'Sign Up'
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === 'sign-in'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </p>
        <Link
          className="form-link"
          href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
        >
          {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
        </Link>
      </footer>
    </section>
  )
}

export default AuthForm
