"use client"

import { getBlogs } from "@/actions/blog.action";
import { blogService } from "@/services/blog.service";
import { useEffect, useState } from "react"

export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default function About() {
  const [data, setData] = useState([])
  console.log(data);

  useEffect(() => {
    (async () => {
      const { data } = await getBlogs()
      setData(data)
    })();
  }, [])
  return (
    <div>about</div>
  )
}
