"use client"

import { useTheme } from "@/components/theme-provider"
import { Palette } from "lucide-react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: "red", color: "bg-red-500" },
    { name: "green", color: "bg-green-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "purple", color: "bg-purple-500" },
    { name: "orange", color: "bg-orange-500" },
  ]

  return (
    <div className="flex flex-col items-center gap-2 bg-[#1a1a1a] p-3 rounded-md border border-gray-800">
      <Palette size={20} className="text-gray-400" />
      <div className="mt-1 flex flex-col gap-2">
        <p className="text-xs text-gray-400 text-center">Theme Colors</p>
        <div className="flex gap-2">
          {themes.map((t) => (
            <button
              key={t.name}
              className={`w-5 h-5 rounded-full ${t.color} ${
                theme === t.name ? "ring-2 ring-white ring-offset-1 ring-offset-[#1a1a1a]" : ""
              }`}
              onClick={() => setTheme(t.name as any)}
              aria-label={`Switch to ${t.name} theme`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
