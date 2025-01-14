'use client'

import { cn } from '@/lib/utils'
import { LucideIcon, Undo2Icon } from 'lucide-react'

interface ToolbarButtonProps {
  onClick?: () => void
  isActive?: boolean
  icon: LucideIcon
}

const ToolbarButton = (props: ToolbarButtonProps) => {
  const { onClick, isActive, icon: Icon } = props
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7, min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}

export const Toolbar = () => {
  interface Section {
    label: string
    icon: LucideIcon
    onClick: () => void
    isActive?: boolean
  }
  const sections: Section[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => console.log('undo clicked')
      }
    ]
  ]

  return (
    <div
      className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px]
     flex items-center gap-x-0.5 overflow-x-auto"
    >
      {sections[0].map(item => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  )
}
