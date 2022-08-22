import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player-component',
  templateUrl: './vjs-player-component.component.html',
  styleUrls: ['./vjs-player-component.component.css']
})
export class VjsPlayerComponentComponent implements OnInit {

  @ViewChild('target', { static: true }) target! : ElementRef;

  // See options: https://videojs.com/guides/options
  @Input() options! : {
    fluid?: boolean,
    aspectRatio?: string,
    controls: boolean,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };

  player! : videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

}
