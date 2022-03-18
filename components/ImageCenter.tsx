import Image from "next/image";

export default function ImageCenter(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
        <Image 
        className="rounded-lg"
      alt={props.alt}
      src={props.src}
      {...props} />
      </div>
    </>
  );
}
