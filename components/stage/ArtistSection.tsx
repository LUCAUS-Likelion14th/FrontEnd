import ArtistButton from "./ArtistButton";

type ArtistSectionProps = {
  data: {
    id: number;
    artistLogo: string;
    artist: string;
  }[];
};

export default function ArtistSection({ data }: ArtistSectionProps) {
  return (
    <div className="flex gap-4 overflow-x whitespace-nowrap">
      {data.map((item) => (
        <ArtistButton
          key={item.id}
          id={item.id}
          image={item.artistLogo}
          artist={item.artist}
        />
      ))}
    </div>
  );
}
