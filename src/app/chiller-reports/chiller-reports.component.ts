import { Component } from '@angular/core';
import jspdf, { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-chiller-reports',
  templateUrl: './chiller-reports.component.html',
  styleUrls: ['./chiller-reports.component.scss']
})
export class ChillerReportsComponent {
  GetPdf(){
    const formattedTimestamp = new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear() + "_" + new Date().getHours() + "-" + new Date().getMinutes() + "-" + new Date().getSeconds()

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });
    var data: any = document.getElementById('SamplePdf');
    //this.downloadLoading = true;
    const options = {
      scale: 2, // Adjust scale as needed for better quality
      useCORS: true // Enable CORS to capture images from external sources
    };
    html2canvas(data, options).then(canvas => {
      const imageData = canvas.toDataURL('image/jpeg'); // Convert canvas to base64 image data

      // Add the image data to the PDF
      doc.addImage(imageData, 'JPEG', 0, 0, doc.internal.pageSize.getWidth()-10, doc.internal.pageSize.getHeight()-15);

      // Save or display the PDF
      doc.save('snapshot.pdf');
    });

  }
}
