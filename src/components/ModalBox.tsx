import { X } from 'lucide-react';
interface IPropsProductDetail {
  isOpen?: boolean;
  className?: string;
  children?: JSX.Element;
  onClose: () => void;
  styleClose?:string;
  loading?:boolean;
}
const ModalBox = ({ ...props }: IPropsProductDetail): JSX.Element => {
  return (
    <div
      className={`transition-all fixed bottom-0 left-0 right-0 top-0 z-50 duration-300 ${
        props.isOpen ? "visible opacity-100"  : "invisible opacity-0"
      }`}   
      style={{zIndex:999999999
      }}
    >
      <div
        className="absolute bg-slate-950/40 z-30 w-full h-full"
        style={{
            zIndex:999999999,
            backgroundColor:"#00000038"
        }}
        onClick={props.onClose}
      ></div>
      <div
        className={`z-50 absolute  top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 h-5/6 w-5/6 bg-white rounded-sm ${props.className} `}
        onClick={(e) => e.stopPropagation()}
        style={{
            zIndex:999999999
        }}
      >
        <span
          className="absolute right-2 top-2 text-3xl cursor-pointer"
          onClick={props.onClose}
        >
            <X className={` ${props.styleClose && props.styleClose }`} />
        </span>
        {
          props.loading ? (
            <h1>Loading...</h1>
          ):(
            props.children
          )
        }
      </div>
    </div>
  );
};
export default ModalBox;