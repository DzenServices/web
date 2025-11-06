import { useEffect } from 'react'
import { ChevronsUpDown, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/theme-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <div className='relative'>
                <Sun className='size-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                <Moon className='absolute inset-0 size-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
              </div>
              <span className='flex-1 truncate text-start text-sm'>
                {theme === 'dark'
                  ? 'Dark'
                  : theme === 'light'
                    ? 'Light'
                    : 'System'}
              </span>
              <ChevronsUpDown className='ms-auto size-4' />
              <span className='sr-only'>Toggle theme</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuRadioGroup
              value={theme}
              onValueChange={(val) =>
                setTheme(val as 'light' | 'dark' | 'system')
              }
            >
              <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='system'>
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
