import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { NgAuthService } from 'src/app/shared/ng-auth.service.ts.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  currentUserID: string;
  basePath: string;
  dbUserScanCollection: any;
  scannedDocuments: Object[] = [];

  ngOnInit(): void {

    //collect the logged user id information
    this.ngAuthService.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.currentUserID = user.uid;
        this.basePath = '/' + this.currentUserID + '/files';
        this.dbUserScanCollection = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs');

        this.dbUserScanCollection.get().then((querySnapshot) => { 
          querySnapshot.forEach((doc) => {
              console.log(doc.id, "=>", doc.data());
              var newObject = {
                'docID': doc.id,
                'docData': doc.data()
              };  
              console.log(newObject)
              this.scannedDocuments.push(newObject);
          })
       })

        // testing purposes
        console.log("user is signed in");
        console.log(user.uid);

      } else {
        // No user is signed in.
      }
    });

    

  }

  constructor(private afDatabase: AngularFirestore,
              public ngAuthService: NgAuthService
             ) { 

  }

  onButton(){
    console.log(this.dbUserScanCollection);

  }

  letsSee(){
    console.log(this.scannedDocuments);
  }

}

  // firebaseStorageLocation: string = "gs://ocr-klippa-webapp.appspot.com/";


  // ref: AngularFireStorageReference;
  // task: AngularFireUploadTask;

  // currentUserId: string = "IDXfLrL7EBZkSuiEeZeQWIqOVdo1";
  // basePath = '/' + this.currentUserId + '/files';
  // downloadableURL: string = '';
  // task: AngularFireUploadTask;

  // async upload(event: any) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const filePath = `${this.basePath}/${file.name}`;
  //     this.task = this.afStorage.upload(filePath, file);

  //     (await this.task).ref.getDownloadURL().then(url => {this.downloadableURL = url; console.log(this.downloadableURL)});
  //   } else {
  //     alert('No images selected');
  //     this.downloadableURL = ''; }
  //   };


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