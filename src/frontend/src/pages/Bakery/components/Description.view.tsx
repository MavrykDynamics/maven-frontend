type Props = {
  list: string[]
  className?: string
}

export function Description ({ list, className }: Props) {
  return (
    <>
      {list.map((text, index) => (
        <p key={index} className={className}>{text}</p>
      ))}
    </>
  )
}
