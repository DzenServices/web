import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function AppTitle() {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className={cn(
            'gap-2 py-0 hover:bg-transparent active:bg-transparent',
            'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0'
          )}
          asChild
        >
          <div>
            <Link
              to='/'
              onClick={() => setOpenMobile(false)}
              className={cn(
                'flex items-center gap-2 text-start text-sm leading-tight',
                'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0'
              )}
            >
              <img
                src='/images/favicon.svg'
                alt='Dzen VPN logo'
                className={cn(
                  'size-6 shrink-0 object-contain',
                  'group-data-[collapsible=icon]:size-5'
                )}
              />
              <span
                className={cn(
                  'truncate font-bold',
                  'group-data-[collapsible=icon]:hidden'
                )}
              >
                Dzen VPN
              </span>
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
