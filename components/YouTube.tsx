export default function YouTube({ id }) {

  const src = `https://www.youtube.com/embed/${id}`;
  return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%'
        }}
      >
        <iframe
          data-testid="youtube"
          title="YouTube video player"
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    );
}
