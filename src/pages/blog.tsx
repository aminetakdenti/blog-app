import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useRef } from "react";
import BlogUserLink from "@/components/BlogUserLink";

function blog() {
	const { id } = useParams();

	const blog = useQuery(api.blog.get, { id });

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current && blog) {
			ref.current.innerHTML = blog.content;
		}
	}, [blog]);

	if (!blog) return <div>Loading...</div>;

	return (
		<div className="space-y-4 divide-y dark:divide-slate-800 md:w-[700px] md:mx-auto  ">
			<h1 className="text-5xl font-extrabold leading-tight">{blog.title}</h1>
			<div>
				<BlogUserLink
					userId={blog.userId}
					imageUrl={blog.imageUrl ?? ""}
					name={blog.name ?? ""}
					creationTime={blog._creationTime}
				/>
			</div>
			<div className="pt-4 space-y-4 leading-7" ref={ref} />
		</div>
	);
}

export default blog;
