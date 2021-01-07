import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { OCRAPIServiceService } from '../../shared/ocr-api-service.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;

  firebaseStorageLocation: string = "gs://ocr-klippa-webapp.appspot.com/";

  ngOnInit(): void {
  }

  constructor(private afStorage: AngularFireStorage,
              private OCRService: OCRAPIServiceService) { }

  upload(event: any) {
    const id = Math.random().toString(36).substring(2);
    console.log(id);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    var newFbImgStorageLocation = this.firebaseStorageLocation + id;
    console.log(newFbImgStorageLocation);
    this.OCRService.readDocumentOCR().subscribe( responseData => {
      console.log(responseData)
    })
  }

//to convert image to base64 string and transform the template into a form
//the form should be submitted

}
