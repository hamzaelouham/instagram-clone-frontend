import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon } from "@heroicons/react/outline";

interface ModelProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const Model: React.FC<ModelProps> = ({ isOpen, closeModal }) => {
  const [activeDropZone, setActiveDropZone] = useState(false);
  const [files, setFiles] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputFile = useRef<HTMLInputElement>(null);
  const inputText = useRef<HTMLInputElement>(null);

  function upLoadPublication() {
    // upload logic here
    setLoading(true);

    setLoading(false);
    setFiles(null);
    closeModal();
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropZone(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const reader = new FileReader();
      const $files = e.dataTransfer.files[0];

      if ($files) {
        reader.readAsDataURL($files);
      }
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        setFiles(readerEvent?.target?.result);
      };
    }
  };

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    // e.preventDefault();
    const reader = new FileReader();
    // @ts-ignore
    const $files = e.target.files[0];

    if ($files) {
      reader.readAsDataURL($files);
    }

    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      setFiles(readerEvent?.target?.result);
    };
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setActiveDropZone(false);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setActiveDropZone(true);
  }

  function triggerInput() {
    inputFile.current?.click();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Upload New Publication
                </Dialog.Title>
                <div className="mt-5">
                  {files ? (
                    <div className="flex flex-col mb-5 justify-center">
                      <img
                        src={files}
                        alt="selected"
                        className="h-28 object-cover"
                      />
                      <div className="mt-4">
                        <input
                          type="text"
                          className="w-full border-none focus:ring-0 focus:border-none text-gray-700 text-md font-medium placeholder:font-normal"
                          placeholder="What's in your mind ?"
                          ref={inputText}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        draggable={true}
                        className={`flex h-28 items-center justify-center mb-3 border-dashed border-2 ${
                          activeDropZone
                            ? "border-primary bg-blue-100"
                            : " border-gray-600"
                        }`}
                      >
                        <DocumentAddIcon
                          className={`h-20 w-20 text-xs cursor-pointer transition ease-out ${
                            activeDropZone ? "text-primary" : " text-gray-700"
                          }`}
                          onClick={triggerInput}
                        />
                        <input
                          type="file"
                          hidden
                          ref={inputFile}
                          multiple={true}
                          onChange={onFilesChange}
                        />
                      </div>
                      <p className="text-sm text-gray-500 text-center">
                        Drag photos and videos here !
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className={`upload-btn ${
                      loading ? "cursor-not-allowed animate-pulse" : ""
                    }`}
                    onClick={upLoadPublication}
                    disabled={loading}
                  >
                    {loading ? "uploading..." : "publish"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
