import { convertTimestampToDateString } from "@/lib/utils";
import { Link } from "react-router";

type Props = {
	userId: string;
	imageUrl: string;
	name: string;
	creationTime: number;
};

function BlogUserLink({ userId, imageUrl, name, creationTime }: Props) {
	return (
		<Link to={`/user/${userId}`}>
			<div className="flex items-center gap-3 pt-4">
				<div className="size-14">
					<img alt="user img" src={imageUrl} />
				</div>
				<div>
					<div>
						<p className="text-lg">{name}. </p>
					</div>
					<div>
						<p className="text-sm text-gray-500">
							{convertTimestampToDateString(creationTime)}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default BlogUserLink;
