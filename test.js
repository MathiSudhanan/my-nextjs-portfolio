function solution(s) {
  let result = getPrefixRemaining(s);
  if (result === s) {
    return s;
  }
  s = result;
  let count = 0;
  while (result !== "") {
    result = getPalRemaining(result);
    console.log(result);
    if (result === s) {
      count = 0;
      return s;
    } else {
      count++;
      if (count > 1) {
        break;
      }
    }
  }
  return s;
}
function getPrefixRemaining(s) {
  let trunStr = "";

  let palInd = 0;
  for (let index = 0; index < s.length; index++) {
    trunStr += s[index];
    let revStr = strReverse(trunStr);

    if (trunStr !== revStr) {
      break;
    } else {
      palInd = index;
    }
  }
  if (palInd > 0) {
    s = s.substring(palInd + 1, s.length);
  }
  // console.log(s)
  return s;
}

function getPalRemaining(s) {
  let trunStr = "";

  let palInd = 0;
  try {
    for (let index = 0; index < s.length; index++) {
      trunStr += s[index];
      let revStr = strReverse(trunStr);

      if (trunStr === revStr) {
        palInd = index;
      }
    }

    if (palInd > 0) {
      s = s.substring(palInd + 1, s.length);
      if (s === "") {
        console.log("empty");

        return s;
      }
    }
  } catch (error) {
    console.log("error");
  }

  return s;
}
function strReverse(s) {
  let res = "";

  for (let index = s.length - 1; index >= 0; index--) {
    res += s[index];
  }

  return res;
}

solution("aaacodedocminimrest");
console.log("test");
