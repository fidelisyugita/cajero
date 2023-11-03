import colors, {Color} from '../styles/colors';

export function currencyPrice(price: number) {
  return `Rp ${formatNumber(price)}`;
}

export function formatNumber(price: number) {
  // Convert the price to a string and split it into whole and decimal parts
  let parts = price.toString().split('.');
  // Get the whole part of the price
  let wholePart = parts[0];
  // Get the decimal part of the price, or set it to an empty string if it doesn't exist
  let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  // Add commas as a separator for the whole part of the price, every three digits from the right
  let formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Concatenate the whole and decimal parts back together with dot separator
  let formattedPrice = formattedWholePart + decimalPart;

  return formattedPrice;
}

export function getColorSystem(color: Color | string) {
  if (color.indexOf('.') > -1) {
    const [pallete, shade]: string[] = color.split('.');

    return (colors as {[key: string]: {[key: string]: string}})[pallete][shade];
  }
  return color;
}

export function getInitials(fullName: string): string {
  const trimmedName: string = fullName.trim(); // Trim the input string
  return trimmedName
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
}

export const sortDatas = (datas: any[], headers: any[]): any[] => {
  return datas.map(data => {
    const sortedData: any = headers.reduce((sortedObject, header) => {
      const propertyId = header.id;
      sortedObject[propertyId] = data[propertyId];
      if (data.hasOwnProperty(propertyId)) {
        sortedObject[propertyId] = data[propertyId];
      }

      return sortedObject;
    }, {});

    for (const property in data) {
      if (!sortedData.hasOwnProperty(property)) {
        sortedData[property] = data[property];
      }
    }

    return sortedData;
  });
};
