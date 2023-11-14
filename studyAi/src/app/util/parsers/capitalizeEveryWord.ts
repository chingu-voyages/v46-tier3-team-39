function capitalizeEveryWord(sentence: string): string {
  // Split the sentence into an array of words
  const words = sentence.split(" ");

  // Capitalize each word
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  // Join the capitalized words back into a sentence
  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}
export default capitalizeEveryWord;
