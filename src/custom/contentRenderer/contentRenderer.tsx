import React, { useState } from 'react';
import Button from '../button/button';
import { Modal } from 'antd';
interface Props{
    url : string
}

const ContentRenderer = ({ url }: Props) => {
  const [isOpenPdfModal, setIsOpenPdfModal] = useState(false);
  const openPdfModal = () => {
    setIsOpenPdfModal(true);
  };
  const closePdfModal = () => {
    setIsOpenPdfModal(false);
  };
  const renderContent = () => {
    const pdfUrl = url
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    const fileExtension = url && url?.split('.')?.pop()?.toLowerCase();
    

    if (fileExtension === 'mp3' || fileExtension === 'wav' || fileExtension === 'ogg') {
      return (
        <audio controls>
          <source src={url} type={`audio/${fileExtension}`} />
          Your browser does not support the audio element.
        </audio>
      );
    } else if (fileExtension === 'pdf') {
      return (
        <>
         <Button text='View Pdf' onClick={openPdfModal}/>
          <Modal
            open={isOpenPdfModal}
            onCancel={closePdfModal}
            // qrCode={qrCodeData}
            // download={handleDownload}
            footer=''
            > 
             <embed src={url} type="application/pdf" width="100%" height="500px" />
             {/* <iframe
        src={url}
        style={{ width: '100%', height: '500px' }}
        title='material-pdf'
        frameBorder="0"
      /> */}

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