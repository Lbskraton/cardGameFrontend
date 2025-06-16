
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

interface SingleLevelDropdownMenuProps {
  children:ReactElement
  items: {
    title: string;
    url?: string;
    icon?: string;
    action?: () => void;
  }[];
}



function DroopDownMenuDiv({children,items}: SingleLevelDropdownMenuProps) {

    const [open, setOpen] = useState(false);
    const handleToggle = () => {
          setOpen((prev) => !prev);
    };

    
  return (
    <div className="relative">
      <span
        
        onClick={handleToggle}
      >
        {children}
        
      </span>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-12">
          <ul className="w-56 h-auto shadow-md rounded-md p-1 border bg-green-400">
            {items.map((item, index) => (
              <li
                key={index}
                className={`text-white relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md`}
              >
                {item.url && <Link to={item.url}>{item.title}</Link>}
                {item.action && <button onClick={item.action}>{item.title}</button>}
                
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DroopDownMenuDiv