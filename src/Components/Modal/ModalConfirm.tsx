interface Props {
  handleAgreeModalConfirm: any;
  handleCancelModalConfirm: any;
  question: string;
}
const ModalConfirm: React.FC<Props> = ({
  handleAgreeModalConfirm,
  handleCancelModalConfirm,
  question,
}) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-6 text-center">
                <h2 className="mb-5 text-2xl font-normal text-gray-500 dark:text-gray-400">
                  {question}
                </h2>
                <button
                  onClick={() => {
                    handleAgreeModalConfirm();
                  }}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={(e) => {
                    handleCancelModalConfirm();
                  }}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalConfirm;
