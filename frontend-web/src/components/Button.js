// src/components/Button.js
export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  );
}