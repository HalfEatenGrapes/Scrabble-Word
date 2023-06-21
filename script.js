const searchForm = document.querySelector("#word-form");
searchForm.addEventListener("submit", search);

const wordFound = {};
let found = true;

async function search(event) {
  // reset the page

  event.preventDefault();
  const wordInput = document.querySelector("#word");
  const word = wordInput.value;
  await searchAPI(word);
}

async function searchAPI(searchWord) {
  const MWPromise = await fetch(
    `https://dictionaryapi.com/api/v3/references/collegiate/json/${searchWord}?key=2d91602e-3d33-4954-bb9f-bb5eaea0d940`
  );
  const MW = await MWPromise.json();

  console.log(MW.length);
  if (MW.length === 0) {
    found = false;
    sorry();
    return;
  }

  wordFound.word = MW[0].meta.id;
  wordFound.def = MW[0].shortdef[0];
  wordFound.pron = MW[0].hwi.prs[0].mw;
  wordFound.audio = MW[0].hwi.prs[0].sound.audio;
  wordFound.part = MW[0].fl;
  let firstLetter = wordFound.audio.charAt(0);
  wordFound.sound =
    await `https://media.merriam-webster.com/audio/prons/en/us/mp3/${firstLetter}/${wordFound.audio}.mp3`;

  if (found) {
    fillinfo(wordFound);
  }
}

function fillinfo(info) {
  const allowed = document.querySelector(".allowed");
  const congrats = document.querySelector(".congrats-sorry");
  const points = document.querySelector(".num-of-points");
  const part = document.querySelector(".part-of-speech");
  const def = document.querySelector(".deffinition");
  const pronounced = document.querySelector(".pronounced");
  const audio = document.querySelector("audio");

  allowed.textContent = "You are allowed to use this word!";
  congrats.textContent = "Congratulations!";
  points.textContent = ""; // Set the desired points value
  part.textContent = wordFound.part;
  def.textContent = wordFound.def;
  pronounced.textContent = wordFound.pron;
  audio.href = wordFound.sound;
}

function sorry() {
  const allowed = document.querySelector(".allowed");
  const congrats = document.querySelector(".congrats-sorry");
  const part = document.querySelector(".part-of-speech");
  const def = document.querySelector(".deffinition");
  const pronounced = document.querySelector(".pronounced");
  const audio = document.querySelector(".audio");

  allowed.textContent = "You are not allowed to use this word!";
  congrats.textContent = "Sorry";
  part.textContent = "";
  def.textContent = "";
  pronounced.textContent = "";
  audio.href = "";
}
