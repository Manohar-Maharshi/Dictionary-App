const form = document.getElementById('form');
const mainWord = document.getElementById('mainWord');
const phoniticWord = document.getElementById('phoniticWord');
const posType = document.getElementById('posType');

// const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/$/${word}`;

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const inputSearch = document.getElementById('inputSearch');
	inputWord = inputSearch.value;
	getData(inputWord);
});

function getData(word) {
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
		.then((res) => res.json())
		.then((data) => {
			renderData(data[0]);
		})
		.catch((error) => {
			document.getElementById('SearchedWord').innerHTML = '';
			document.getElementById('definitions-block').innerHTML = '';
			document.getElementById('eror').style.display = 'block';
		});
}
const renderData = (data) => {
	const definitionsBlock = document.getElementById('definitions-block');
	mainWord.innerHTML = data.word;
	phoniticWord.innerHTML = data.phonetics[0].text;
	data.meanings.forEach((meaning) => {
		definitionsBlock.innerHTML += `
		<div class="definition">
			<h3 id="posType" class="parts-of-speech-type"><span class="pos-name">Parts of Speech:</span> ${meaning.partOfSpeech}</h3>
			<ul class="word-definitions-list">
				<li class="word-definition">
					<span class="main-definition">
						 ${meaning.definitions[0].definition}
					</span>
					<br />
					<span class="example">"${meaning.definitions[0].example}”</span>
				</li>
			</ul>
		</div>
	`;
	});
};
