

import { getBlogs } from "@/actions/blog.action";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";


export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default function About() {
  
  // const user = userService.getSession
  // console.log(user);


  
  return (
    <div>about</div>
  )
}
