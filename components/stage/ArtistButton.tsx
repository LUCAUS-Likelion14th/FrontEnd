import Image from "next/image";

type ArtistButtonProps = {
  image: string;
  artist: string;
  onClick?: () => void;
};

export default function ArtistButton({
  image,
  artist,
  onClick,
}: ArtistButtonProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onClick}
        className="w-19.5 h-19.5 rounded-full overflow-hidden"
      >
        <Image
          src={image}
          alt={`${artist} 사진`}
          width={78}
          height={78}
          className="object-cover"
        />
      </button>
      <p className="text-[14px]">{artist}</p>
    </div>
  );
}
