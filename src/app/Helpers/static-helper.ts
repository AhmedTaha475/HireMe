import { buffer } from 'rxjs';

export class StaticHelper {
  public static ConvertByteArrayToImage(imageString: string) {
    const byteArray = Uint8Array.from(Buffer.from(imageString, 'base64'));
    const blob = new Blob([byteArray], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    return url;
  }
  public static ConvertByteArrayToPdf(PdfString: string) {
    const byteArray = Uint8Array.from(Buffer.from(PdfString, 'base64')); // convert the string to a byte array
    const blob = new Blob([byteArray], { type: 'application/pdf' }); // create a blob from the byte array
    return URL.createObjectURL(blob); // return the URL of the blob
  }
}
