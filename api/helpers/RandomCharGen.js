class RandomCharGenerator {
  static RandomCharGenerator(n) {
    let chars = "0123456789abcde";
    let string_length = n;
    let randomstring = "";

    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
  }
}

export default RandomCharGenerator;
