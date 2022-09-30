import Image from "next/image";

export default function ImageGridThree(props) {
  return (
    <div className="grid justify-center w-full max-w-2xl grid-cols-3 gap-4 mx-auto">
      <Image 
      className="rounded-lg"
      alt={props.alt1}
      src={props.src1}
      height={props.height1}
      width={props.width1}
      {...props} />
      <Image 
      className="rounded-lg"
      alt={props.alt2}
      src={props.src2}
      height={props.height2}
      width={props.width2}
      {...props} />
      <Image 
      className="rounded-lg"
      alt={props.alt3}
      src={props.src3}
      height={props.height3}
      width={props.width3}
      {...props} />
    </div>
  );
}
