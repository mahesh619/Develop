import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateFileService } from '../translate-file.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss']
})
export class FolderPage implements OnInit {
  folder: string;
  ionicForm: FormGroup;
  defaultDate = new Date();
  isSubmitted = false;
  selectedLanguage: string;
  submitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private TranslateFileService: TranslateFileService,
    public http: HttpClient
  ) {
    // Get Default language
    this.selectedLanguage = this.TranslateFileService.getDefaultLanguage();
    // Validation of form
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dob: [this.defaultDate, Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit() {
    this.translate.get('DASHBOARD.HOME').subscribe((text: string) => {
      this.folder = text;
    });
  }

  //Submit the form
  submitForm() {
    this.submitted = true;
     // stop here if form is invalid
     if (this.ionicForm.invalid) {
      return;
    }
    //called fake api
    this.http.post<any>('https://reqres.in/api/posts', this.ionicForm.value).subscribe(data => {
        console.log("fake api");
    },
    (error)=>{
       console.log("error cought", error);
    }
    );
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    });
  }

  //Set the default language
  languageChanged() {
    this.TranslateFileService.setLanguage(this.selectedLanguage);
    this.translate.get('DASHBOARD.HOME').subscribe((text: string) => {
      this.folder = text;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.ionicForm.controls;
  }
}
