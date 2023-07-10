import React from "react";
import { Product } from "../../Types/Products.type";
interface Props {
  // handleOnchangeInput: any;
  // handleAgreeModal: any;
  // isModal: any;
  // handleCancelModal: any;
  // setFormData: any;
  // formData: Product;
  children: any;
}
const Modal: React.FC<Props> = ({
  // isModal,
  // handleCancelModal,
  // handleOnchangeInput,
  // handleAgreeModal,
  // formData,
  children,
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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
