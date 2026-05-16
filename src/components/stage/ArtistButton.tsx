import Image from "next/image";
import Link from "next/link";

type ArtistButtonProps = {
  id: number;
  image: string;
  artist: string;
};

export default function ArtistButton({ id, image, artist }: ArtistButtonProps) {
  return (
    <Link
      href={`/stage/${id}`}
      className="flex flex-col items-center gap-2.5 cursor-pointer"
    >
      <div className="w-19.5 h-19.5 rounded-full overflow-hidden shadow-md active:scale-95">
        <Image
          src={image}
          alt={`${artist} 사진`}
          width={78}
          height={78}
          className="object-cover"
        />
      </div>
      <p className="text-[14px]">{artist}</p>
    </Link>
  );
}
