// URL 정규식
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export const renderTextWithLinks = (text: string) => {
    return text.split(URL_REGEX).map((part, index) => {
        if (part.match(URL_REGEX)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline underline-offset-4 hover:text-indigo-800 break-all"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};