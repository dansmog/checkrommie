import "./tags.styles.css";

interface ITags {
  title: string
  isSelected: boolean,
  onClick: any
}
const Tags = ({title, isSelected, onClick}: ITags) => {
  return (
    <div className={isSelected ? "selected tags" : "tags"} onClick={() => onClick(title)}>
      {title}
    </div>
  )
  }
  

  export default Tags