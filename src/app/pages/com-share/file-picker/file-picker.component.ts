import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FilePickerService } from './file.service';

@Component({
  selector: 'ngx-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'], 
  providers: [FilePickerService]
})
export class FilePickerComponent implements OnInit {
  @Output() fileSelected = new EventEmitter<any[]>();
  @Input() id: any;
  @Input() fileName: any;
  @ViewChild('file') file: ElementRef;

  name: string;
  type: string;
  size: any;
  fileList: any[];
  res: boolean = false;
  constructor(private service: FilePickerService) {}

  ngOnInit(): void {
    if(this.fileName){
      var x = document.getElementsByClassName("custom-file-label");
    x[this.id - 1].innerHTML = this.fileName;
    }
  }

  // onFilesAdded(e){
  //   this.fileList = e.target.files[0];
  //   this.name= this.fileList.name;
  //   this.type=this.fileList.type;
  //   this.size= this.fileList.size;
  //   console.log(this.fileList);
  //   var x = document.getElementsByClassName("custom-file-label");
  //   x[0].innerHTML = this.name;
  //   // this.fileSelected.emit()
  // }
  onFilesAdded(e) {
    this.res = true;
    console.log('id', this.id)
    this.fileList = e.target.files;
    let fileValue = [];
    let allName = [];
    if(this.fileList.length == 1){
      console.log('one file');
      const res = this.convertTobject(this.fileList[0]);
      allName.push(res["name"] + "  ");
      this.service.saveSingle(this.fileList[0]).subscribe(res=>{
        console.log('file res', res.data);
        if(res && res.data){
          this.res= false;
        }
        this.fileSelected.emit(res.data? res.data : '');
        // this.fileSelected.emit([res.data? res.data : '', allName[0]]);
      })
    }
    else{
      for (let index = 0; index < this.fileList.length; index++) {
        const res = this.convertTobject(this.fileList[index]);
        allName.push(res["name"] + "  ");
        // fileValue.push(res);
        fileValue.push(this.fileList[index]);
      }
      console.log('fi va', fileValue)
      this.service.saveMultiple(fileValue).subscribe(res=>{
        console.log('multiple', res)
        if(res && res.data){
          this.res= false;
        }
        this.fileSelected.emit(res.data ? res.data : '')
      })

    }

    console.log("out loop", "".concat(...allName));
    var x = document.getElementsByClassName("custom-file-label");
    x[this.id - 1].innerHTML = "".concat(...allName);
    // console.log(x.length, 'leg', x, 'val')
    // this.fileSelected.emit(fileValue);

  }

  convertTobject(fileObject) {
    const imageObject = {};

    for (const key in fileObject) {
      const value = fileObject[key];
      const notFunction = typeof value !== "function";
      notFunction && (imageObject[key] = value);
    }

    return imageObject;
  }

  returnFileSize(number) {
    if (number < 1024) {
      return number + "bytes";
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + "KB";
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + "MB";
    }
  }
}
