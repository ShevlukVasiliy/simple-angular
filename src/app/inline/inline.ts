import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-inline',
  imports: [],
  templateUrl: './inline.html',
  styleUrl: './inline.css',
})
export class Inline implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit() {
    this.title.setTitle('Open Graph Page');
    this.meta.addTags([
      { name: 'og:title', content: 'The Rock' },
      { name: 'og:type', content: 'video.movie' },
      { name: 'og:url', content: '//www.imdb.com/title/tt0117500/' },
    ]);
  }
}
