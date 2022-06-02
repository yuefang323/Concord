import { format, parseISO } from "date-fns";

const CreatedAtShort = ({ created_at }) => {
	if (created_at) {
		return (
			<div className="chat-created-at-short">
				{format(parseISO(created_at), "p")}
			</div>
		);
	} else {
		return <div className="chat-created-at"></div>;
	}
};

export default CreatedAtShort;
