import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToPdf',
})
export class ConvertToPdfPipe implements PipeTransform {
  transform(PdfString: string, predefinedUrl: string): string {
    if (!PdfString) {
      return predefinedUrl;
    }
    const byteArray = new Uint8Array(
      atob(PdfString)
        .split('')
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return url;
  }
}
