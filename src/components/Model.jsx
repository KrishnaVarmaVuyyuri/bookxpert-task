import Spinner from "./Spinner";

export default function Modal({ children, onClose, loading = false }) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-t-xl shadow-2xl w-full h-[85vh] overflow-y-auto modal-scroll sm:rounded-xl sm:shadow-2xl sm:w-full sm:max-w-2xl sm:h-auto sm:max-h-[90vh] relative" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
      >
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
            <Spinner size={8} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
