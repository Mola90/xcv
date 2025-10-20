export function Input({ className = "", ...props }) {
  return (
    <input
      className={"w-full border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 " + className}
      {...props}
    />
  );
}
