import ImagePicker, {Image} from 'react-native-image-crop-picker';

export function cleanTmp() {
  ImagePicker.clean()
    .then(() => {})
    .catch((error: any) => {});
}

export function openPicker(actions: Function) {
  ImagePicker.openPicker({
    cropping: true,
    height: 220,
    includeBase64: true,
    mediaType: 'photo',
    quality: 0.7,
    selectionLimit: 1,
    width: 403,
  })
    .then((result: Image) => {
      if (result.data) {
        const base64 = `data:${result.mime};base64,${result.data}`;
        actions(base64);
      }
    })
    .catch((error: any) => {});
}
