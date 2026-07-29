import type { VideoBlockData } from '@/lib/types/block';

interface VideoBlockProps {
  block: VideoBlockData;
}

export function VideoBlock({ block }: VideoBlockProps) {
  const { provider, videoId, caption } = block.data;

  const embedUrl =
    provider === 'vk'
      ? `https://vk.com/video_ext.php?oid=${videoId.split('_')[0]}&id=${videoId.split('_')[1]}&hd=2`
      : `https://www.youtube.com/embed/${videoId}`;

  return (
    <figure className="mb-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-gray">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}