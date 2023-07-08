
export default function Conversation({ conversation, display_conversation }) {
    return (
        <div style={display_conversation} className="container-conversation">
            {conversation.map((item) => {
                return (
                    <div>
                        <p className="user-message">{item[0]}</p>
                        <p className="ia-message">{item[1]}</p>
                    </div>
                );
            })}

        </div>
    );
}