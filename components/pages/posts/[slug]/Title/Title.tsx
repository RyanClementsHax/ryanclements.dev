export const Title: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <div className="-mt-8 bg-red-500">
    <h1 className="text-4xl">{children}</h1>
  </div>
)
