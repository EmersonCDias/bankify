'use client'

import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <section className="w-fulll max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="border-none bg-white"
          aria-describedby="Menu content"
        >
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Bankify logo"
            />

            <SheetTitle>
              <span className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Bankify
              </span>
            </SheetTitle>

            <VisuallyHidden.Root>
              <SheetDescription>Bankify Menu content</SheetDescription>
            </VisuallyHidden.Root>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`)

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn('mobilenav-sheet_close w-full', {
                          'bg-bank-gradient': isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            'brightness-[3] invert-0': isActive,
                          })}
                        />
                        <p
                          className={cn('text-16 font-semibold text-black-2', {
                            'text-white': isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetClose>

            <Footer />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
