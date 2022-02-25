import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '@appstore/app.reducer';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons/faMailBulk';


@Component({
  selector: 'messages',
  template: `
    <div class="messages">
      <div class="app-welcome-left">
        <h3>Pages</h3>
        <ul>
          <li class="intro-anchor active"
              (click)="scrollTo('intro')">⚫ Intro
          </li>

        </ul>
       
      </div>
      <div class="app-welcome-right"
           (scroll)="onScroll($event)"
           #welcomeRight>
        <div id="intro">
          <h1>Welcome Agent Augustus</h1>
          <span id="text1">
            How are you doing this fine day?
          </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class msgs {
  public data: any;
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));

  isIntroVisible = true;
  isEducationVisible = false;
  isWorkVisible = false;

  faDownload = faDownload;
  faPhone = faPhone;
  faMail = faMailBulk;


  ids = ['intro', 'Classified', 'education', 'works', 'skills', 'more'];

  @ViewChild('welcomeRight', {static: true}) welcomeRight: ElementRef;
  private scrollTimeout: any;

  constructor(private store$: Store<any>) {}

  scrollTo(elementId) {
    this.welcomeRight.nativeElement.querySelector(`#${ elementId }`).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  trackByFn(it, i) { return i; }

  onScroll($event: Event) {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.afterScroll(($event.target as any).scrollTop);
    }, 100);
  }

  afterScroll(scrollTop: number) {
    this.ids.forEach(id => {
      const element = document.querySelector(`#${ id }`) as any;
      if ( !element ) {
        return;
      }
      if ( scrollTop >= element.offsetTop - 500 ) {
        document.querySelector(`.${ id }-anchor`).classList.add('active');
      } else {
        document.querySelector(`.${ id }-anchor`).classList.remove('active');
      }
    });
  }
}
