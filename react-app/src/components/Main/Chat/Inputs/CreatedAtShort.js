import { formatDistanceToNow, formatRelative, parseISO } from "date-fns";

const CreatedAtShort = ({ created_at }) => {
	if (created_at) {
		return (
			<div className="chat-created-at">
				{formatRelative(parseISO(created_at), new Date())}
			</div>
		);
	} else {
		return <div className="chat-created-at"></div>;
	}
};

export default CreatedAtShort;
