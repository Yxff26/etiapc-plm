"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 4.5,
  },
  {
    name: "Feb",
    total: 4.2,
  },
  {
    name: "Mar",
    total: 4.8,
  },
  {
    name: "Apr",
    total: 4.6,
  },
  {
    name: "May",
    total: 4.7,
  },
  {
    name: "Jun",
    total: 4.9,
  },
  {
    name: "Jul",
    total: 4.4,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

