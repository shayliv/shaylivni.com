export function BlobDecoration({
  className = "",
  variant = "1",
}: {
  className?: string
  variant?: "1" | "2"
}) {
  const shapeClass = variant === "1" ? "blob-shape" : "blob-shape-2"

  return <div className={`${shapeClass} ${className}`} />
}
