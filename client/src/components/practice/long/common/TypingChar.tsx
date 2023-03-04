interface TypingCharProps {
  char: string;
}

export default function TypingChar({ char }: TypingCharProps) {
  return <span>{char}</span>;
}
