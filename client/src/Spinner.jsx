


const Spinner = ({ className = '' }) => (
  <div className={`flex justify-center items-center  my-7 ${className}`}>
    <div className={`w-14 h-14 border-4 border-t-transparent border-slate-500  border-solid rounded-full animate-spin ${className}`}></div>
  </div>
);

export default Spinner;
