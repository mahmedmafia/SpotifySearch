import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from "@angular/common";
import { SearchComponent } from "./components/search/search.component";
import { AlbumComponent } from "./components/album/album.component";
import { ArtistsComponent } from "./components/artists/artists.component";
import { TrackComponent } from "./components/track/track.component";
import { AppRoutingModule } from './app.routing.module';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AlbumComponent,
    ArtistsComponent,
    TrackComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
