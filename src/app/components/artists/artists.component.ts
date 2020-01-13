import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  id: string;
  artist: Object;
  albums:[];
  constructor(private route: ActivatedRoute, private spotify: SpotifyService,
  ) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.spotify
      .getArtist(this.id)
      .subscribe((res: any) => this.renderArtist(res));
    this.spotify.getAlbumsofArtist(this.id).subscribe((res: any) => {
      this.albums=res.items.reverse();
      this.albums=this.getUnique(this.albums,'name');
      console.log(this.albums);
    });
  }

  back(): void {
    // this.location.back();
  }

  renderArtist(res: any): void {
    this.artist = res;
  }
   getUnique(arr, comp) {

  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

  return unique;
}
}
