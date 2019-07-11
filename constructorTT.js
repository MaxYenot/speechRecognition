function TranslationTask(task, correctAns, showString){
		this.task = task;
		this.correctAns = correctAns;
		this.showString = showString;
		this.correct = false;
		this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		this.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
		this.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

		this.recognition = new this.SpeechRecognition();
		this.recognition.lang = "en-US";
		this.recognition.maxAlternatives = 30;
		this.temporaryRecognitionResults = [];
		this.recognition.onerror = function(event){console.log(event)};
		this.recognition.onstart = ()=>{
			this.correct = false;
			this.temporaryRecognitionResults = [];
		}
		this.recognition.onresult = (event) => {
			console.log(event.results[0]);
			console.log(event.results[0].length);

			console.log(this.temporaryRecognitionResults);
			
			/*console.log (event.results[0][0].transcript);*/
			for(let i=0; i<=event.results[0].length-1; i++){
				this.temporaryRecognitionResults.push(event.results[0][i].transcript)				
			}
			this.checkAnswer();
		};

	/*
		GUI
	*/

	this.drawTranslate = () => {
		var app = document.getElementById("app");
			app.textContent = "";
		var task = document.createElement("div");
			task.setAttribute("id", "task");
			task.setAttribute("class","b");
			task.textContent = "переведи на английский";

		var theTask = document.createElement("div");
			theTask.setAttribute("id", "theTask");
			theTask.setAttribute("class", "b");
			theTask.textContent = this.task;

		var buttonSection = document.createElement('div');
			buttonSection.setAttribute("id", "buttonSection");
			buttonSection.setAttribute("class", "b");
			if(this.learningMode === true){
				let learningMode = document.createElement("p");
					learningMode.textContent = this.correctAns;
					buttonSection.appendChild(learningMode);
			}
		var btn = document.createElement("button");
			btn.addEventListener('click', () => {
				this.recognition.start();
			});
			btn.textContent = "Нажми меня и произнеси перевод";
			buttonSection.appendChild(btn);
      // adding arrow buttons
      var btnLeft = document.createElement("button");
      btnLeft.textContent = "<<<";
   		if(random === 0){
        	btnLeft.disabled = true;
          	btnLeft.setAttribute("class", "btnDisabled");
        }else{
        btnLeft.addEventListener("click", function(){
        	random--;
 	        tasks[random].make();
          	
        });
        }
    	
      	
    var btnRight = document.createElement("button");
    	btnRight.textContent = ">>>";
   		if(random === tasks.length-1){
        	btnRight.disabled = true;
          	btnRight.setAttribute("class", "btnDisabled");
        }else{
      btnRight.addEventListener("click", function(){
                                  random++;
                                  tasks[random].make();
                                  });
        }
      buttonSection.appendChild(btnLeft);
      buttonSection.appendChild(btnRight);
      // arrButtonsEnd
      
		/*ищем тег с id = "app" и отрисовываем туда нашу разметку */
			app.appendChild(task);
			app.appendChild(theTask);
			app.appendChild(buttonSection);
	}

	this.checkAnswer = () => {
		for(let i=0; i<this.temporaryRecognitionResults.length; i++){
			console.log(this.temporaryRecognitionResults[i]);
			if(this.temporaryRecognitionResults[i].toLowerCase() === this.showString.toLowerCase()){
				this.correct = true;
				break;
			}
		}
		console.log(this.correct);
		this.showFace();
	};


	this.make = () => {
		this.drawTranslate();
		
	}
	
	this.learningMode = false;
	this.showFace = function(){
		if(this.correct === true){
			this.learningMode = false;
			document.getElementById("buttonSection").textContent = ":-)";
			window.setTimeout(window.chooseQuestion, 2000);

		}else{
			this.learningMode = true;
			document.getElementById("buttonSection").textContent = ":-( \n ";
			document.getElementById("buttonSection").textContent += this.correctAns;

			let l8er = document.createElement("button");
				l8er.textContent = "Дальше";
				l8er.addEventListener("click", this.make);
			let linebreak = document.createElement("br");
			document.getElementById("buttonSection").appendChild(linebreak);
			document.getElementById("buttonSection").appendChild(l8er);
		}
		
	}
  
  
  

	}; /*fin*/
