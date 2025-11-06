import { create } from 'zustand'

export type Provider = 'google' | 'telegram' | 'email'
export type UserStatus = 'active' | 'inactive'

export type CheckResult = {
  exists: boolean
  providers: Provider[]
  status: UserStatus
}

export type View = 'email' | 'password' | 'social' | 'register' | 'otp'

interface SignInState {
  email: string
  exists: boolean | null
  providers: Provider[]
  status: UserStatus | null
  view: View
  loading: boolean
  // For demo flows
  password: string
  otp: string
  otpResendSeconds: number

  setEmail: (email: string) => void
  checkEmail: (checker: (email: string) => Promise<CheckResult>) => Promise<void>
  setPassword: (v: string) => void
  setOtp: (v: string) => void
  chooseProvider: (p: Provider) => void
  submitPassword: () => Promise<void>
  submitOtp: () => Promise<void>
  resendOtp: () => void
  goBack: () => void
  reset: () => void
}

export const useSignInStore = create<SignInState>((set, get) => ({
  email: '',
  exists: null,
  providers: [],
  status: null,
  view: 'email',
  loading: false,
  password: '',
  otp: '',
  otpResendSeconds: 0,

  setEmail: (email) => set({ email }),

  checkEmail: async (checker) => {
    set({ loading: true })
    try {
      const res = await checker(get().email)
      set({ exists: res.exists, providers: res.providers, status: res.status })
      // Decide next view
      if (!res.exists) {
        set({ view: 'register' })
      } else {
        const hasEmail = res.providers.includes('email')
        const hasSocial = res.providers.some((p) => p === 'google' || p === 'telegram')
        if (hasEmail) {
          set({ view: 'password' })
        } else if (hasSocial) {
          set({ view: 'social' })
        } else {
          set({ view: 'password' })
        }
      }
    } finally {
      set({ loading: false })
    }
  },

  setPassword: (v) => set({ password: v }),
  setOtp: (v) => set({ otp: v }),

  chooseProvider: (p) => {
    // For mock visual only
    console.log('Chosen provider', p)
  },

  submitPassword: async () => {
    const { exists, status } = get()
    // Mock handling:
    // - If exists true: treat as sign-in success
    // - If exists false: treat as registration, then if inactive -> show otp
    if (exists) {
      // success
      return
    } else {
      // registration flow
      if (status === 'inactive') {
        set({ view: 'otp' })
      }
    }
  },

  submitOtp: async () => {
    // Mock verify OTP -> success
    return
  },

  resendOtp: () => {
    const current = get().otpResendSeconds
    if (current > 0) return
    set({ otpResendSeconds: 60 })
    const timer = setInterval(() => {
      const left = get().otpResendSeconds
      if (left <= 1) {
        clearInterval(timer)
        set({ otpResendSeconds: 0 })
      } else {
        set({ otpResendSeconds: left - 1 })
      }
    }, 1000)
  },

  goBack: () =>
    set({
      view: 'email',
      password: '',
      otp: '',
      otpResendSeconds: 0,
    }),

  reset: () =>
    set({
      email: '',
      exists: null,
      providers: [],
      status: null,
      view: 'email',
      loading: false,
      password: '',
      otp: '',
      otpResendSeconds: 0,
    }),
}))
