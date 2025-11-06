import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
// Social brand icons are not required for mock; using text labels for now
import { useSignInStore } from '@/stores/signin-store'
import { checkUser } from '@/features/auth/sign-in/mock'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconGmail, IconTelegram } from '@/assets/brand-icons'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  // Password is optional for initial email check; validated only when rendered
  password: z.string().optional(),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signin = useSignInStore()

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    signin.setEmail(data.email)
    toast.promise(signin.checkEmail(checkUser), {
      loading: 'Проверяем email...',
      success: () => {
        setIsLoading(false)
        return 'Email проверен'
      },
      error: 'Ошибка',
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        {/* Back button is rendered in page header (sign-in-2.tsx) to avoid duplication */}
        {signin.view === 'email' && (
          <div className='animate-in fade-in-0 slide-in-from-bottom-2 duration-200'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Электронная почта</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mt-2 w-full' disabled={isLoading}>
              {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
              Продолжить
            </Button>
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background text-muted-foreground px-2'>
                  Или продолжить с
                </span>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <Button variant='outline' type='button' onClick={() => signin.chooseProvider('google')}>
                <IconGmail className='me-2 h-4 w-4' /> Google
              </Button>
              <Button variant='outline' type='button' onClick={() => signin.chooseProvider('telegram')}>
                <IconTelegram className='me-2 h-4 w-4' /> Telegram
              </Button>
            </div>
          </div>
        )}
        {signin.view === 'password' && (
          <div className='animate-in fade-in-0 slide-in-from-bottom-2 duration-200'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                  <Link
                    to='/forgot-password'
                    className='text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75'
                  >
                    Забыли пароль?
                  </Link>
                </FormItem>
              )}
            />
            <Button className='mt-2 w-full' type='button' onClick={signin.submitPassword}>
              Продолжить
            </Button>
          </div>
        )}

        {/* social view no longer special-cases visibility; buttons are always shown above */}

        {signin.view === 'register' && (
          <div className='animate-in fade-in-0 slide-in-from-bottom-2 duration-200'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  <FormLabel className='sr-only'>Пароль</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2 w-full' type='button' onClick={signin.submitPassword}>
              Зарегистрироваться
            </Button>
          </div>
        )}

        {signin.view === 'otp' && (
          <div className='animate-in fade-in-0 slide-in-from-bottom-2 duration-200'>
            <FormItem>
              <FormLabel className='sr-only'>Одноразовый код</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={signin.otp}
                  onChange={(val) => signin.setOtp(val)}
                  containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
            <Button className='mt-2 w-full' type='button' onClick={signin.submitOtp} disabled={(signin.otp?.length ?? 0) < 6}>
              Подтвердить
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}
