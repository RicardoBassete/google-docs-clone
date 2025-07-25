'use client'

import React, { useRef, useState } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchParam } from '@/hooks/use-search-param'

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam()
  const [value, setValue] = useState(search)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(value)
    inputRef.current?.blur()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue('')
    setSearch('')
    inputRef.current?.blur()
  }

  const SearchButton = () => {
    return (
      <Button
        type="submit"
        variant={'ghost'}
        size={'icon'}
        className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
      >
        <SearchIcon />
      </Button>
    )
  }

  const ClearInputButton = () => {
    return (
      <Button
        onClick={handleClear}
        type="button"
        variant={'ghost'}
        size={'icon'}
        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
      >
        <XIcon />
      </Button>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleOnChange}
          ref={inputRef}
          placeholder="Search"
          className="
            md:text-base placeholder:text-neutral-800 px-14 w-full border-none 
            focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(35,39,73,.15)] bg-[#f0f4f8] 
            rounded-full h-12 focus-visible:ring-0 focus:bg-white
          "
        />
        <SearchButton />
        {value && <ClearInputButton />}
      </form>
    </div>
  )
}
