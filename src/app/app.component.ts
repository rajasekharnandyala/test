import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { SharedserviceService } from './sharedservice.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FormBuilder]
})
export class AppComponent { 
  title = 'project';
  unsubscrip: Subscription[] = [];
  pdfData: string;
  applese = '<h1>tesjnsnfjsdfmnsf</h1>' + '<p>innerHTML - HTML associated by a DOM element. As shown on code snippet #1, the value of DIV was programmatically modified.Angular 2-way data binding - The same change can also be implemented using Angular ‘s 2-way data binding of a component property to the innerHTML of the DOM element DIV</p>';
  consentName: any;
  private _sharedService: any;
  @ViewChild('externalPdfViewer') public externalPdfViewer: any;
  viewerDisplay: any = 'none';

  constructor(private SharedserviceService: SharedserviceService, private PdfViewer: ElementRef) { }
  print() {
    let pdf;
    let path = 'C:\Users\rajsekhar.nandyala';
    let contents = document.getElementById('myAnchor');
    html2canvas(contents).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // var fileURL = URL.createObjectURL(file);
      // window.open(fileURL);
      // pdf.byte;
      let test = encodeURIComponent(pdf); 
      this.unsubscrip.push(
        this._sharedService.showPdf.subscribe(
          (data: any) => {
            this.showPdf(data);
          }));
          this._sharedService.showPdf.emit({ DocData: sourcehtml, DocName: 'Selected Documents' });
          this.viewerDisplay = "block"
      this.SharedserviceService.showPdf.emit({ DocData: test, DocName: 'Selected Documents' });
    });

}

showPdf(content) {
  console.log(content.DocData);
  this.consentName = content.DocName;
  this.externalPdfViewer.pdfSrc = this.convertDataURIToBinary(content.DocData);
  this.externalPdfViewer.downloadFileName = content.DocName;
  this.externalPdfViewer.refresh();
  let el: HTMLElement = this.PdfViewer.nativeElement as HTMLElement;
  el.click();


}



convertDataURIToBinary(dataURI: string): Uint8Array {
  let raw = window.atob(dataURI);
  let rawLength = raw.length;
  let array = new Uint8Array(new ArrayBuffer(rawLength));
  let i: number;
  for (i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

        
}
