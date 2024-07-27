type MessageProps={
    user: string;
    message: string;
    classs: string;
}

const Message = ({ user, message, classs }: MessageProps) => {
    if (user && message) {
        return (
            <div className={`messageBox ${classs}`}  >
                {`${user}: ${message}`}
            </div>
        )
    }
    else {


        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
