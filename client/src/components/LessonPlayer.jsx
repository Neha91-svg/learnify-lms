
const LessonPlayer = ({ videoUrl }) => {
    const getYoutubeId = (url) => {
        const match = url.match(/v=([^&]+)/);
        return match ? match[1] : null;
    };

    const youtubeId = getYoutubeId(videoUrl);

    return (
        <div className="w-full max-w-md mx-auto my-2">
            {youtubeId ? (
                <iframe
                    width="100%"
                    height="220"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow"
                ></iframe>
            ) : (
                <video
                    width="100%"
                    height="220"
                    controls
                    className="rounded-lg shadow"
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default LessonPlayer;
