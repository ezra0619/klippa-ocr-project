import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  ref: AngularFireStorageReference;
  // task: AngularFireUploadTask;

  firebaseStorageLocation: string = "gs://ocr-klippa-webapp.appspot.com/";

  ngOnInit(): void {
  }

  constructor(private afStorage: AngularFireStorage,
              private afDatabase: AngularFirestore,
             ) { 

  }

  currentUserId: string = "IDXfLrL7EBZkSuiEeZeQWIqOVdo1";
  basePath = '/' + this.currentUserId + '/files';
  downloadableURL: string = '';
  task: AngularFireUploadTask;

  async upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const filePath = `${this.basePath}/${file.name}`;
      this.task = this.afStorage.upload(filePath, file);

      (await this.task).ref.getDownloadURL().then(url => {this.downloadableURL = url; console.log(this.downloadableURL)});
    } else {
      alert('No images selected');
      this.downloadableURL = ''; }
    };


    // const id = Math.random().toString(36).substring(2);
    // console.log(id);
    // this.ref = this.afStorage.ref(id);
    // this.task = this.ref.put(event.target.files[0]);


    //working before
    // const id = Math.random().toString(36).substring(2);
    // console.log(id);
    // this.ref = this.afStorage.ref(id);
    // this.task = this.ref.put(event.target.files[0]);

    // var newFbImgStorageLocation = this.firebaseStorageLocation + id;
    // console.log(newFbImgStorageLocation);
    // this.OCRService.readDocumentOCR().subscribe( responseData => {
    //   console.log(responseData)
    // })

//to convert image to base64 string and transform the template into a form
//the form should be submitted

}
