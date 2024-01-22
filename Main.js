(function() {
  // godlike v1.32
  var startText = ""
	if (document.querySelector("#summitMainContainer") !== null){
  	document.querySelector("#summitMainContainer").remove()
    startText = "Summit has detected that\nit has already been launched,\nso it deleted it for you."
  }
  let color
  const guiContainer = document.createElement('div');
  guiContainer.id = 'summitMainContainer'
  guiContainer.style = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: #191919;
    padding: 15px;
    z-index: 9999;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    font-family: 'Arial', sans-serif;
    color: #fff;
  `;
  document.body.appendChild(guiContainer);

  //toggleBtn = document.createElement('button')
  //toggleBtn.style = `
  //  position: fixed;
  // top: 0;
  //  right: 0;
  //  z-index: 9998;
  // background = #191919;
  //`;
  //document.body.appendChild(toggleBtn)
  let isDragging = false;
  let offsetX, offsetY;

  guiContainer.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - guiContainer.getBoundingClientRect().left;
    offsetY = e.clientY - guiContainer.getBoundingClientRect().top;
  });

  window.addEventListener('mouseup', function() {
    isDragging = false;
  });

  window.addEventListener('mousemove', function(e) {
    if (isDragging) {
      guiContainer.style.left = e.clientX - offsetX + 'px';
      guiContainer.style.top = e.clientY - offsetY + 'px';
    }
  });

  const label0 = document.createElement('div');
  label0.textContent = 'Summit - 2023';
  label0.style = `
  	color: #ac07f2;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: -4px;
  `;
  guiContainer.appendChild(label0);

  const separatorLine = document.createElement('hr');
  separatorLine.style = `
    outline: 0px solid #ac07f2;
    margin: 10px 0;
    padding: 5px;
  `;
  guiContainer.appendChild(separatorLine);

  function skipQuestion() {
    if (document.querySelector("#diagnosticIFrame") !== null) {
      skipButton.textContent = "ERROR: Diagnostic!";
      console.log("unable to skip: You are on the diagnostic!")
      return
    }
    if (document.getElementById("html5Iframe") !== null) {
      if (html5Iframe.src.includes("QUIZ")) {
        skipButton.textContent = "ERROR: Quiz is active"
        console.log("unable to skip: Quiz mode is enabled")
      }
      if (html5Iframe.src.includes("TUTORIAL")) {
        if (html5Iframe.contentWindow.document.getElementById('nav-forward') !== null) {
          skipButton.textContent = "Skipped question!"
          Object.values(html5Iframe.contentWindow.document.getElementById('nav-forward'))[1].onClick();
        } else {
          skipButton.textContent = "Error: Cannot Skip"
        }
      }
      console.log('Skipped question!');
    }
    if (document.getElementById("html5Iframe") === null) {
      skipButton.textContent = "ERROR: Not in Lesson"
    }
    setTimeout(function kaka() {
      skipButton.textContent = "Skip Current Question"
    }, 500)
  }

  const skipButton = document.createElement('button');
  skipButton.textContent = 'Skip Current Question';
  skipButton.style = `
    padding: 6px;
    margin-top: 6px;
    background-color: #ac07f2;
    color: #fff;
    border: none;
    border-radius:6px;5
    cursor: pointer;
    font-size: 16px;
  `;
  skipButton.addEventListener('click', skipQuestion);
  guiContainer.appendChild(skipButton);


  const gokys = document.createElement('div');
  guiContainer.appendChild(gokys);
  // dropdown? no way!

  var button = document.createElement("button");
  button.textContent = "Simulate Games";
  button.className = "dropdown-button";
  guiContainer.appendChild(button)
  button.style = `
    padding: 6px;
    background-color: #ac07f2;
    color: #fff;
    border: none;
    border-radius:6px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 5px;
  `;
  button.onclick = toggleDropdown;

  // Create a div for the dropdown content
  var dropdownContent = document.createElement("div");
  dropdownContent.className = "dropdown-content";
  dropdownContent.id = "myDropdown";
  dropdownContent.style.display = "none"; // Hide initially

  // Create dropdown items and add them to the dropdown content
  //var currentdictionary = 'https://raw.githubusercontent.com/DO-Ui/bombparty-bot/master/wordlist.txt'
  var items = [
    "- Galaxy Sprint",
    "- Cat Stacker",
    "- Path Spinners",
    "- Wizard Pinball",
    "- Dig Site",
    "- Begooped"
  ];
  var textLabels = []
  var links = [
    "https://cdn.i-ready.com/instruction/reward-games/v1.3.x/2/game-lanerunner/",
    "https://cdn.i-ready.com/instruction/game-catstacker/1.6.x/2/",
    "https://cdn.i-ready.com/instruction/game-hpr/1.4.x/2/",
    "https://cdn.i-ready.com/instruction/reward-games/v1.3.x/2/game-bubbles/",
    "https://cdn.i-ready.com/instruction/reward-games/v1.3.x/2/game-minedigger/",
    "https://cdn.i-ready.com/instruction/game-begooped/1.3.x/2/"
  ];
  items.forEach(function(itemText) {
    var item = document.createElement("div");
    item.className = "dropdown-item";
    item.textContent = itemText;
    item.style.color = color;
    item.style = `
    	font-weight: bold;
    	margin-top: 5px
    `
    textLabels.push(item)

    item.addEventListener("mouseover", function() {
      item.textContent = "-> " + itemText.substr(2); // Change text on hover
    });

    // Add mouseout event listener to revert text when not hovering
    item.addEventListener("mouseout", function() {
      item.textContent = itemText;
    });


    item.onclick = function() {
      console.log(itemText + " clicked");
      currentLink = links[items.indexOf(itemText)];

      function openInNewTab(url) {
        window.open(url, '_blank').focus();
      }
      openInNewTab(currentLink)
    };
    dropdownContent.appendChild(item);
  });

  guiContainer.appendChild(dropdownContent);

  // Toggle the dropdown display
  function toggleDropdown() {
    dropdownContent.style.display = (dropdownContent.style.display === "none") ? "block" : "none";
  }


	
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
      dropdownContent.style.display = "none";
    }
  };

	  const killmekillme2 = document.createElement('div')
  guiContainer.appendChild(killmekillme2);
  
	  var button3 = document.createElement("button");
  button3.textContent = "Destroy GUI";
  button3.className = "dropdown-button";
  guiContainer.appendChild(button3)
  button3.style = `
    padding: 6px;
    background-color: #ac07f2;
    color: #fff;
    border: none;
    border-radius:6px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 5px;
  `;
  button3.onclick = function () {
  guiContainer.remove()
  }

  const infoLabel = document.createElement('div');
  infoLabel.textContent = '"p" to skip | comma to toggle gui';
  infoLabel.style = `
    font-size: 12px;
    margin-top: 10px;
  `;
  guiContainer.appendChild(infoLabel)

  const killmekillme = document.createElement('div')
  guiContainer.appendChild(killmekillme);

  const infoLabel2 = document.createElement('div');
  infoLabel2.textContent = startText
  if (startText === "") {
    infoLabel2.textContent = 'Summit will automatically bind\nwith the pause button. if comma\ndoesnt work, use that instead.';
  }


  infoLabel2.style = `
    font-size: 12px;
    margin-top: 10px;
    font-weight: bold;
    word-wrap: break-word;
    white-space: pre-wrap;
  `;

  guiContainer.appendChild(infoLabel2);

  document.addEventListener('keyup', (event) => {
    if (event.key === 'p') {
      skipQuestion();
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.key === ',') {
      toggleGUIVisibility();
    }
  });
  


  function toggleGUIVisibility() {
    guiContainer.style.display = guiContainer.style.display === 'none' ? 'block' : 'none';
  }
  
  function rainbowFade() {
    let angle = 0;
    let nutsack = 0
    let introMultiplier = 0

    function changeColor() {
      introMultiplier += 0.05
      //console.log(introMultiplier)
      const red = Math.sin(angle) * 127 + 128;
      const green = Math.sin(angle + (2 * Math.PI / 3)) * 127 + 128;
      const blue = Math.sin(angle + (4 * Math.PI / 3)) * 127 + 128;

      color = `rgb(${red}, ${green}, ${blue})`;
      label0.style.color = color;
      separatorLine.style.border = `1px solid ${color}`;
      guiContainer.style.outline = `${(Math.abs(Math.cos(nutsack/30)))*5}px solid ${color}`
      textLabels.forEach(function recolor(item, index) {
        item.style.color = color
      })
      button.style.backgroundColor = color;
      guiContainer.style.opacity = introMultiplier
      skipButton.style.backgroundColor = color;
      infoLabel2.style.color = color
      button3.style.backgroundColor = color
      separatorLine.style = `
    					outline: ${Math.abs(Math.cos(nutsack/30)*3)}px solid ${color};
       				border: 0px solid ${color};
    					margin: 10px 0;
  					`;
      angle += 0.015;
      nutsack++
      requestAnimationFrame(changeColor);
    }
    changeColor();
  }

  rainbowFade();

})();
