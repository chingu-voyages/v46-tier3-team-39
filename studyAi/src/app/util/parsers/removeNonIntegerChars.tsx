function removeNonIntegerChars(str: string) {
  return str.replace(/\D/g, '');
}

export default removeNonIntegerChars;