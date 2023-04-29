import { Directive, AfterViewInit, Renderer2, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Directive({
  selector: '[appJQueryLoader]',
})
export class JQueryLoaderDirective implements AfterViewInit {
  @Input() jqueryPaths: string[] = ['assets/js/custom.js'];
  constructor(private http: HttpClient, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.jqueryPaths.forEach((path) => {
      var scriptTag = document.getElementById('Reloader');
      if (scriptTag) {
        scriptTag.parentNode?.removeChild(scriptTag);
      }
      this.http.get(path, { responseType: 'text' }).subscribe((jqueryCode) => {
        const script = this.renderer.createElement('script');
        script.id = 'Reloader';
        script.type = 'text/javascript';
        script.innerHTML = jqueryCode;
        this.renderer.appendChild(document.head, script);
      });
    });
  }
}

// Get the <script> element with the specified id
// const script = document.getElementById('your-script-id');

// Remove the element from the DOM if it exists
// if (script) {
//   script.parentNode.removeChild(script);
// }
