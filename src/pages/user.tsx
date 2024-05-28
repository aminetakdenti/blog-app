import { useParams } from "react-router-dom";

function user() {
	const { id } = useParams();

	return <div>user{id}</div>;
}

export default user;
