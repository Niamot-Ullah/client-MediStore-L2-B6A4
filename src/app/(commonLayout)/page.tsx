export const dynamic = "force-dynamic";
import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";



export default async function Home() {
// how to get cookies
// const {data,error} = await userService.getSession()
// console.log(data,error);
const {data} = await blogService.getBlogPost({
  // isFeatured:true,
  search:"",
},{
  revalidate: 10
})

// console.log(data.data.data);


  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {data?.data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
