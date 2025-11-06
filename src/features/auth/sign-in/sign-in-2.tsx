import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useSignInStore } from '@/stores/signin-store'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import dashboardDark from './assets/dashboard-dark.png'
import dashboardLight from './assets/dashboard-light.png'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn2() {
  const signin = useSignInStore()
  useEffect(() => {
    // Запускаем таймер один раз при входе на шаг OTP
    if (signin.view === 'otp') {
      signin.resendOtp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signin.view])
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
          {signin.view === 'email' && (
            <div className='flex flex-col space-y-2 text-start'>
              <h2 className='text-lg font-semibold tracking-tight'>Вход</h2>
              <p className='text-muted-foreground text-sm'>
                Введите вашу электронную почту, чтобы войти в аккаунт
              </p>
            </div>
          )}
          {signin.view === 'register' && (
            <div className='flex flex-col gap-2 text-start'>
              <div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='-ms-2 text-muted-foreground hover:text-foreground'
                  onClick={signin.goBack}
                >
                  <ArrowLeft className='me-1 size-4' /> Назад
                </Button>
              </div>
              <div className='flex flex-col space-y-2'>
                <h2 className='text-lg font-semibold tracking-tight'>Создание пароля</h2>
                <p className='text-muted-foreground text-sm'>
                  Установите надёжный пароль, чтобы завершить регистрацию.
                </p>
              </div>
            </div>
          )}
          {signin.view === 'otp' && (
            <div className='flex flex-col gap-2 text-start'>
              <div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='-ms-2 text-muted-foreground hover:text-foreground'
                  onClick={signin.goBack}
                >
                  <ArrowLeft className='me-1 size-4' /> Назад
                </Button>
              </div>
              <div className='flex flex-col space-y-2'>
                <h2 className='text-lg font-semibold tracking-tight'>Двухфакторная аутентификация</h2>
                <p className='text-muted-foreground text-sm'>
                  Пожалуйста, введите код подтверждения. <br /> Мы отправили код на вашу электронную почту.
                </p>
              </div>
            </div>
          )}
          <UserAuthForm />
          {signin.view === 'email' && (
            <p className='text-muted-foreground px-8 text-center text-sm'>
              Нажимая «Войти», вы соглашаетесь с нашими{' '}
              <a
                href='/terms'
                className='hover:text-primary underline underline-offset-4'
              >
                Условиями обслуживания
              </a>{' '}
              и{' '}
              <a
                href='/privacy'
                className='hover:text-primary underline underline-offset-4'
              >
                Политикой конфиденциальности
              </a>
              .
            </p>
          )}
          {signin.view === 'otp' && (
            <p className='text-muted-foreground px-8 text-center text-sm'>
              Не получили код?{' '}
              <button type='button' className='hover:text-primary underline underline-offset-4' onClick={() => signin.resendOtp()} disabled={signin.otpResendSeconds > 0}>
                {signin.otpResendSeconds > 0 ? `Отправить через ${signin.otpResendSeconds}с` : 'Отправить новый код.'}
              </button>
              .
            </p>
          )}
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
