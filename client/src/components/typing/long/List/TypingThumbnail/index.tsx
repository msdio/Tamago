import { Box } from '@chakra-ui/react';

interface TypingThumbnailProps {
  thumbnail: string;
  y: number;
  x: number;
}

export default function TypingThumbnail({ thumbnail, y, x }: TypingThumbnailProps) {
  return (
    <Box
      p={'10px'}
      border={'0.6px solid black'}
      borderRadius={'10px'}
      backgroundColor={'white'}
      pos={'absolute'}
      left={x + 10}
      top={y + 10}
      zIndex={100}
    >
      {thumbnail}
    </Box>
  );
}
