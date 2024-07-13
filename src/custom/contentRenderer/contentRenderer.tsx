// import React, { useState } from 'react';
// import Button from '../button/button';
// import { Modal } from 'antd';
// import { Document, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

// interface Props{
//     url : string
// }

// const ContentRenderer = ({ url }: Props) => {
//   const [isOpenPdfModal, setIsOpenPdfModal] = useState(false);
//   const openPdfModal = () => {
//     setIsOpenPdfModal(true);
//   };
//   const closePdfModal = () => {
//     setIsOpenPdfModal(false);
//   };
//   const renderContent = () => {
//     const pdfUrl = url
//     const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
//     const fileExtension = url && url?.split('.')?.pop()?.toLowerCase();

//     if (fileExtension === 'mp3' || fileExtension === 'wav' || fileExtension === 'ogg') {
//       return (
//         <audio controls>
//           <source src={url} type={`audio/${fileExtension}`} />
//           Your browser does not support the audio element.
//         </audio>
//       );
//     } else if (fileExtension === 'pdf') {
//       return (
//         <>
//          <Button text='View Pdf' onClick={openPdfModal}/>
//           <Modal
//             open={isOpenPdfModal}
//             onCancel={closePdfModal}
//             // qrCode={qrCodeData}
//             // download={handleDownload}
//             footer=''
//             >
//               <Document file={url} />
//         {/* <Page pageNumber={pageNumber} /> */}

//              {/* <embed src={url} type="application/pdf" width="100%" height="500px" /> */}

//             </Modal>

//         </>

//       );
//     } else {
//       return <p>Unsupported file type.</p>;
//     }
//   };

//   return <div>{renderContent()}</div>;
// };

// export default ContentRenderer;

import React, { useRef, useState } from "react";
import { Modal } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import Button from "../button/button";
import styles from "./main.module.scss";

// Set the worker source
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  url: string;
}

const ContentRenderer: React.FC<Props> = ({ url }) => {
  const [isOpenPdfModal, setIsOpenPdfModal] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const openPdfModal = () => {
    setIsOpenPdfModal(true);
    setIsPlaying(false);
  };

  const closePdfModal = () => {
    setIsOpenPdfModal(false);
    setPageNumber(1); // Reset to the first page when the modal closes
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages!) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef?.current?.pause();
      } else {
        audioRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderContent = () => {
    const pdfUrl = url;
    const fileExtension = url.split(".").pop()?.toLowerCase();

    if (fileExtension === "mp3" || fileExtension === "wav" || fileExtension === "ogg" || fileExtension === "mp4" || fileExtension === "mpeg") {
      return (
        <div>
          <audio controls>
          <source src={url} type={`audio/${fileExtension}`} onContextMenu={(e) => e.preventDefault()} />
          Your browser does not support the audio element.
        </audio>

          {/* <audio ref={audioRef}>
            <source src={url} type={`audio/${fileExtension}`} />
            Your browser does not support the audio element.
          </audio>
          <button onClick={togglePlayPause}>{isPlaying ? "Pause sound" : "Play sound"}</button> */}
        </div>
      );
    } else if (fileExtension === "pdf") {
      return (
        <>
          <Button text="View Pdf" onClick={openPdfModal} />
          <Modal open={isOpenPdfModal} onCancel={closePdfModal} footer={null} width="60%">
            {/* <Document file={url} onLoadSuccess={onDocumentLoadSuccess} onContextMenu={(e) => e.preventDefault()} className={styles.pdfContainer} onLoadError={(error) => console.error('Error while loading PDF:', error)}>
              <Page pageNumber={pageNumber} />
            </Document> */}

            <embed src={url} type="application/pdf" width="100%" height="500px" />
          </Modal>
        </>
      );
    } else {
      return <p>Unsupported file type.</p>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default ContentRenderer;
