type Props = {
  title: string;
  content: string;
};

export default function blog({ title, content }: Props) {
  return (
    <div className="py-4 space-y-3">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
