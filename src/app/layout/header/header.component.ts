import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  currentLang: string = 'en';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'mr']);
    translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('lang');
    const browserLang = translate.getBrowserLang() ?? 'en'; // fallback to 'en' if undefined

    const langToUse = savedLang ?? (['en', 'mr'].includes(browserLang) ? browserLang : 'en');

    translate.use(langToUse);
    this.currentLang = langToUse;
  }

 switchLanguage(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const selectedLang = target.value;
  this.translate.use(selectedLang);
  localStorage.setItem('lang', selectedLang);
}

} 