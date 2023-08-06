let htmlContent =
  '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation Equity utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';

let plainText =
  "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------";

let plainTextPositions = [
  {
    start: 241,
    end: 247,
  },
  {
    start: 518,
    end: 525,
  },
];

var patt = /<[^>]+>/g; // pattern to find <any> HTML Tags
let a = []; // 2d array to store start and end indexes of HTML Tags to maintain the index with plainText and htmlContent

while ((match = patt.exec(htmlContent))) {
  if (a.length != 0 && a[a.length - 1][1] == match.index) {
    // check for continous HTML Tags and combines their start and end indexes
    a[a.length - 1][1] = patt.lastIndex;
  } else {
    a.push([match.index, patt.lastIndex]); // if no, then store as it is
  }
  // console.log(match.index + ' ' + (patt.lastIndex-1) + ' -> '+(patt.lastIndex-match.index));
}

// a.forEach((el) => console.log(el, el[1] - el[0]));  // print and check correct array elements and thier length differences

let offset = 0; // offset to add <mark></mark> Tags in string
plainTextPositions.forEach((pos) => {
  let p = pos.start + offset;
  let diff = 0,
    i = 0;
  do {
    diff = a[i][1] - a[i][0] - 1;
    p += diff;
    i++;
  } while (p > a[i][0]); // check till index position of the text is nearly find, by merging lengths of HTML Tags ranges
  let str = plainText.substring(pos.start, pos.end); // sub-string to find in htmlContent
  let indexPosition = htmlContent.indexOf(str, p); // find correct position of sub-string in htmlContent by nearly starting index p (by removing counts of HTML Tags lengths)
  // console.log(p, indexPosition);
  htmlContent =
    htmlContent.slice(0, indexPosition) +
    `<mark>${str}</mark>` +
    htmlContent.slice(indexPosition + (pos.end - pos.start)); // update htmlContent string with <mark></mark> Tags by marking correct sub-string
  offset += 13; // <mark></mark> Tags have length 13 which add on every position highlighted, to maintain the correct index in updated htmlContent string
});

console.log(htmlContent);
