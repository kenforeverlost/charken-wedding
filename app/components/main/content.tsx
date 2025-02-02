export default function Content({ children }) {
  return (
    <div className="flex flex-col gap-5 px-5 w-full max-w-4xl pb-96">
      {children}
    </div>
  )
}
