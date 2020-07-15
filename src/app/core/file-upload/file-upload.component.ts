import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() files: any[] = [];
  @Input() isEdit: boolean = false;
  @Input() fileUrl: string = "";
  fileName: string;
  isNoFileExists: boolean = false;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.fileUrl == '' || this.fileUrl == undefined){
      this.isEdit = false;
      this.isNoFileExists = true;
    }
    else{
      this.fileName = this.fileUrl.substring(this.fileUrl.lastIndexOf('/') + 1);
      this.isEdit = true;
      this.isNoFileExists = false;
    }
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if(index >= 0){
      this.files.splice(index, 1);
    }
    else{
      this.fileName = "";
      this.isNoFileExists = true;
    }
  }

  downloadFile(index: number) {
    const fileToDownload = this.files[index];

    if(fileToDownload.progress === 100){
      const url = window.URL.createObjectURL(fileToDownload);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileToDownload.name || 'download';
  
      const clickHandler = () => {
        setTimeout(() => {
          URL.revokeObjectURL(url);
          a.removeEventListener('click', clickHandler);
        }, 150);
      };
  
      a.addEventListener('click', clickHandler, false);
  
      a.click();
      return a;
    }    
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
