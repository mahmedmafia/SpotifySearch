import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { TrackComponent } from './components/track/track.component';
import { AlbumComponent } from './components/album/album.component';

const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: SearchComponent },
    { path: 'artists/:id', component: ArtistsComponent },
    { path: 'tracks/:id', component: TrackComponent },
    { path: 'albums/:id', component: AlbumComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
