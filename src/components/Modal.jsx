import React from 'react';

const Modal = ({ isOpen, onClose, imageSrc, title, link }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose} // Close modal when clicked outside the modal content
        >
            <div
                className="bg-[#1d1a2b] rounded-lg p-8 w-11/12 sm:w-1/2 lg:w-1/3"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-2xl font-bold">{title}</h2>
                    <button 
                        className="text-white text-2xl cursor-pointer" 
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <div className="text-center">
                    <img 
                        src={imageSrc} 
                        alt={title} 
                        className="w-full h-auto rounded-lg mb-4" 
                    />
                    <button 
                        onClick={() => window.open(link, "_blank")}
                        className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition duration-200 mt-4"
                    >
                        View Certificate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
