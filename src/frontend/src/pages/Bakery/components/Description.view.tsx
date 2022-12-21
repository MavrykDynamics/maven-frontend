type Props = {
  list: string[]
  className?: string
}

export function Description ({ list, className }: Props) {
  return (
    <>
      {list.map((text) => (
        <p className={className}>{text}</p>
      ))}
    </>
  )
}
