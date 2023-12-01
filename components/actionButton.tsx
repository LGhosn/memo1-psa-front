
type Props = {
  onClick?: () => void;
  title: string;
  style?: string;
};

export const ActionButton = ( { onClick, title, style}: Props) => {

  return (
    <div 
      onClick={onClick}  
      className={`${style} flex items-center p-2 transition duration-75 rounded-lg bg-blue-400 dark:hover:bg-blue-700 hover:bg-amber-100 dark:text-white`}>
      <span className={"flex-1 ml-2 whitespace-nowrap text-center font-bold"}>
        {title}
      </span>
    </div>
  )
}
