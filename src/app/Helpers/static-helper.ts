import { buffer } from 'rxjs';

export class StaticHelper {
  public static ConvertByteArrayToImage(imageString: string) {
    const byteArray = new Uint8Array(
      atob(imageString)
        .split('')
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([byteArray], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    return url;
  }
  public static ConvertByteArrayToPdf(PdfString: string) {
    const byteArray = new Uint8Array(
      atob(PdfString)
        .split('')
        .map((char) => char.charCodeAt(0))
    );
    const blob = new Blob([byteArray], { type: 'application/pdf' }); // create a blob from the byte array
    return URL.createObjectURL(blob); // return the URL of the blob
  }
}
