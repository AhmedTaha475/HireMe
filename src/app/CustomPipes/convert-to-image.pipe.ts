import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToImage',
})
export class ConvertToImagePipe implements PipeTransform {
  transform(imageString: string, predefinedUrl: string): string {
    if (!imageString) {
      return predefinedUrl;
    }
    const byteArray = new Uint8Array(
      atob(imageString)
        .split('')
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([byteArray], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    return url;
  }
}
