export function clean(obj: {}): {} {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}

export function getColorDependOnNumber(type): string {
  switch (type) {
    case 1:
      return 'yellow';
      break;
    case 2:
      return 'pink';
      break;
    case 3:
      return 'green';
      break;
    case 4:
      return 'red';
      break;
    case 5:
      return 'purple';
      break;
    case 6:
      return 'orange';
      break;
    case 7:
      return 'blue';
      break;
    case 8:
      return 'yellow';
      break;
    case 9:
      return 'yellow';
      break;
    case 10:
      return 'pink';
      break;
    case 11:
      return 'green';
      break;
    case 12:
      return 'red';
      break;
    case 13:
      return 'purple';
      break;
    case 14:
      return 'orange';
      break;
    case 15:
      return 'blue';
      break;
    case 16:
      return 'yellow';
      break;

    default:
      break;
  }
}

export function flattenObj(ob) {
  // The object which contains the
  // final result
  let result = {};

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof ob[i] === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + '.' + j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = ob[i];
    }
  }
  return result;
}
