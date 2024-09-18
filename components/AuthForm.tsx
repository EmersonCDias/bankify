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
import { signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'
import PlaidLink from '@/components/PlaidLink'

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address1: '',
      state: '',
      postalCode: '',
      dateOfBirth: '',
      ssn: '',
      city: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      if (type === 'sign-in') {
        const response = await signIn({
          email: values.email,
          password: values.password,
        })

        console.log('1')
        if (response) {
          console.log('2')
          router.push('/')
        }
      }

      if (type === 'sign-up') {
        const newUser = await signUp({
          email: values.email,
          password: values.password,
          firstName: values.firstName!,
          lastName: values.lastName!,
          address1: values.address1!,
          state: values.state!,
          postalCode: values.postalCode!,
          dateOfBirth: values.dateOfBirth!,
          ssn: values.ssn!,
          city: values.city!,
        })

        if (newUser) {
          setUser(newUser)
        }
      }
    } catch (error) {
      console.log('auth form error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-form just">
      <header className="flex flex-col gap-5 md:gap8">
        <Link
          href="/"
          className="cursor-pointer flex items-center gap-1 justify-center"
        >
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
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === 'sign-up' && (
              <>
                <div className="flex gap-4">
                  <CustomInput
                    id="firstName"
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="e.g.: John"
                  />

                  <CustomInput
                    id="lastName"
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="e.g.: Smith"
                  />
                </div>

                <CustomInput
                  id="address1"
                  control={form.control}
                  name="address1"
                  label="Address"
                  placeholder="e.g.: 1600 Pennsylvania Avenue"
                />

                <CustomInput
                  id="city"
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="e.g.: New York City"
                />

                <div className="flex gap-4">
                  <CustomInput
                    id="state"
                    control={form.control}
                    name="state"
                    label="State"
                    placeholder="e.g.: NY"
                  />

                  <CustomInput
                    id="postalCode"
                    control={form.control}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="e.g.: 11101"
                  />
                </div>

                <div className="flex gap-4">
                  <CustomInput
                    id="dateOfBirth"
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                  />

                  <CustomInput
                    id="ssn"
                    control={form.control}
                    name="ssn"
                    label="SSN"
                    placeholder="e.g.: 1234"
                  />
                </div>
              </>
            )}

            <CustomInput
              id="email"
              control={form.control}
              name="email"
              label="E-mail"
              placeholder="e.g.: email@email.com"
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
