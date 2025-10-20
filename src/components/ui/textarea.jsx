export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={"w-full border rounded-md px-3 py-2 text-sm bg-white min-h-[90px] focus:outline-none focus:ring-2 focus:ring-sky-500 " + className}
      {...props}
    />
  );
}
