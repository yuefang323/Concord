import { formatDistanceToNow, parseISO } from "date-fns";

const CreatedAt = ({ created_at }) => {
	if (created_at) {
		return (
			<div className="chat-created-at">
				{formatDistanceToNow(parseISO(created_at))} ago
			</div>
		);
	} else {
		return <div className="chat-created-at"></div>;
	}
};

export default CreatedAt;
