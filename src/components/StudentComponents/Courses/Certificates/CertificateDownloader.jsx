/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Certificate from "./Certificate";
import moment from "moment";

const CertificateDownloader = forwardRef(({ studentName, courseName }, ref) => {
   const certificateRef = useRef();
 
   const generateCompletionDate = moment(new Date()).format("MMM DD, YYYY");
   const generateCertificateId =
     `CERT-${Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 10000)}`;
 
   useImperativeHandle(ref, () => ({
     handleDownload: async () => {
       console.log("Downloading certificate...");
 
       const canvas = await html2canvas(certificateRef.current, { scale: 2 });
 
       const imgData = canvas.toDataURL("image/png");
 
       const pdf = new jsPDF({
         orientation: "landscape",
         unit: "px",
         format: [800, 600],
       });
 
       pdf.addImage(imgData, "PNG", 0, 0, 800, 600);
       pdf.save(`${studentName}'s ${courseName} certificate.pdf`);
     },
   }));
 
   return (
     <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
       <div ref={certificateRef}>
         <Certificate
           studentName={studentName}
           courseName={courseName}
           completionDate={generateCompletionDate}
           certificateId={generateCertificateId}
         />
       </div>
     </div>
   );
 });
 
 
 export default CertificateDownloader;
 