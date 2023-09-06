"use client";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Sun from "../../assets/sun.gif";
import Moon from "../../assets/moon.gif";
import Image from "next/image"

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button className='themeIcon' onClick={e => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
        {theme === 'dark' ? <Image title='Light Theme' src={Sun} alt="light-theme" /> : <Image title='Dark Theme' src={Moon} alt="dark-theme" />}
    </button>
  )
}

export default DarkModeButton;