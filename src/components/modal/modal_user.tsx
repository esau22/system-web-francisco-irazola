interface ModalUserProps {
  handleShowModal: () => void;
  children: React.ReactNode;
}

const ModalUser = ({ handleShowModal, children }: ModalUserProps) => {
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex justify-center items-center w-full h-full fixed top-0 left-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md rounded-lg shadow-md dark:bg-gray-600"
      onClick={handleShowModal}
    >
      <div
        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        onClick={handleModalContentClick}
      >
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-300 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          onClick={handleShowModal}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="#c6c7c7"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close popup</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalUser;
