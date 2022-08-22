import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule, HIGHLIGHT_OPTIONS,HighlightOptions } from 'ngx-highlightjs';
import { MainComponentComponent } from './main-component/main-component.component';
import { DocumentUploadComponent } from './modals/document-upload/document-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    DocumentUploadComponent
  ],
  imports: [
    BrowserModule,
    HighlightModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [JsonPipe,{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        xml: () => import('highlight.js/lib/languages/xml'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        scss: () => import('highlight.js/lib/languages/scss'),
        json: () => import('highlight.js/lib/languages/json'),
        css: () => import('highlight.js/lib/languages/css')
      }
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
