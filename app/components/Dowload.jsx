'use client'
const Dowload = ({afterURL}) => {
    const downloadImage = async (url, filename) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const urlBlob = window.URL.createObjectURL(blob);
      
          const link = document.createElement('a');
          link.href = urlBlob;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      
          // Clean up the temporary URL
          window.URL.revokeObjectURL(urlBlob);
        } catch (error) {
          console.error('Error downloading the image:', error);
        }
      };
  return (
    <button
    onClick={() => downloadImage(afterURL, 'downloaded-image.jpg')}
    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none'
  >
    Download Image
  </button>
  )
}

export default Dowload