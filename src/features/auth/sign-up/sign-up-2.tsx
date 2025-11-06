import { cn } from '@/lib/utils'
import dashboardDark from '@/features/auth/sign-in/assets/dashboard-dark.png'
import dashboardLight from '@/features/auth/sign-in/assets/dashboard-light.png'
import { SignUpForm } from './components/sign-up-form'

export function SignUp2() {
  return (
    <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
          <div className='mb-4 flex items-center justify-center gap-3'>
            <img
              src='/images/favicon.svg'
              alt='Dzen VPN logo'
              className='size-10 shrink-0 object-contain'
            />
            <h1 className='text-2xl font-bold'>Dzen VPN</h1>
          </div>
        </div>
        <div className='mx-auto flex w-full max-w-sm flex-col justify-center space-y-2'>
          <div className='flex flex-col space-y-2 text-start'>
            <h2 className='text-lg font-semibold tracking-tight'>Sign up</h2>
            <p className='text-muted-foreground text-sm'>
              Create your account by filling the form below
            </p>
          </div>
          <SignUpForm />
          <p className='text-muted-foreground px-8 text-center text-sm'>
            By creating an account, you agree to our{' '}
            <a href='/terms' className='hover:text-primary underline underline-offset-4'>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href='/privacy' className='hover:text-primary underline underline-offset-4'>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <div
        className={cn(
          'bg-muted relative h-full overflow-hidden max-lg:hidden',
          '[&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none'
        )}
      >
        <img
          src={dashboardLight}
          className='dark:hidden'
          width={1024}
          height={1151}
          alt='Shadcn-Admin'
        />
        <img
          src={dashboardDark}
          className='hidden dark:block'
          width={1024}
          height={1138}
          alt='Shadcn-Admin'
        />
      </div>
    </div>
  )
}
