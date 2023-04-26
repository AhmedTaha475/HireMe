import { Directive, AfterViewInit, Renderer2, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Directive({
  selector: '[appJQueryLoader]',
})
export class JQueryLoaderDirective implements AfterViewInit {
  @Input() jqueryPaths: string[] = [
    'assets/js/jquery-3.6.0.min.js',
    'assets/js/jquery-migrate-3.3.2.min.js',
    'assets/js/mmenu.min.js',
    'assets/js/tippy.all.min.js',
    'assets/js/simplebar.min.js',
    'assets/js/bootstrap-slider.min.js',
    'assets/js/bootstrap-select.min.js',
    'assets/js/snackbar.js',
    'assets/js/clipboard.min.js',
    'assets/js/counterup.min.js',
    'assets/js/magnific-popup.min.js',
    'assets/js/slick.min.js',
    'assets/js/custom.js',
  ];
  constructor(private http: HttpClient, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.jqueryPaths.forEach((path) => {
      this.http.get(path, { responseType: 'text' }).subscribe((jqueryCode) => {
        const script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = jqueryCode;
        this.renderer.appendChild(document.head, script);
      });
    });
  }
}
