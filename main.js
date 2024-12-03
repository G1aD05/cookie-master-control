(() => {
	console.log('Cookie Master Control Add-On Activated!');

	// Create a draggable panel
	const panel = document.createElement('div');
	panel.style.position = 'fixed';
	panel.style.top = '10px';
	panel.style.left = '10px';
	panel.style.width = '350px';
	panel.style.padding = '20px';
	panel.style.background = 'linear-gradient(145deg, #4caf50, #3e8e41)';
	panel.style.color = 'white';
	panel.style.fontFamily = 'Arial, sans-serif';
	panel.style.borderRadius = '12px';
	panel.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
	panel.style.zIndex = '10000';
	panel.style.overflow = 'hidden';

	// Add content to panel
	panel.innerHTML = `
				<div id="dragHandle" class="dragHandle" style="cursor: grab; font-weight: bold; text-align: center; background: #3e8e41; padding: 10px; border-radius: 8px;"> 
								🍪 Cookie Master Control
				</div>
        <div id="stats" style="margin: 15px 0; font-size: 14px; text-align: center;">
            <p>🍪 Cookies: <span id="cookieCount">0</span></p>
            <p>🔥 CPS: <span id="cpsCount">0</span></p>
            <p>⏳ Time to Next Buy: <span id="timeToNextBuy">Calculating...</span></p>
        </div>
        <div>
            <label for="goalInput" style="display: block; font-size: 14px;">🎯 Set Goal (Cookies):</label>
            <input id="goalInput" type="number" value="0" style="width: 95%; margin-bottom: 10px; padding: 8px; border-radius: 8px; border: none;"/>
        </div>
        <div>
        		<label for="cookieInput" style="display: block; font-size: 14px;">🍪 Gain Cookies:</label>
        		<input id="cookieInput" type="number" value="0" style="width: 95%; margin-bottom: 10px; padding: 8px; border-radius: 8px; border: none;"/>
        </div>
        
        <button id="toggleAutoClicker" style="padding: 10px; width: 100%; background: #2196f3; color: white; border: none; border-radius: 8px; font-weight: bold; margin-bottom: 10px;">Auto-Clicker: OFF</button>
        
        <button id="toggleAutoBuyer" style="padding: 10px; width: 100%; background: #2196f3; color: white; border: none; border-radius: 8px; font-weight: bold; margin-bottom: 10px;">Auto-Buyer: OFF</button>
        
        <button id="gainCookies" style="margin-bottom: 10px; padding: 10px; width: 100%; background: #ff9800; color: white; border: none; border-radius: 8px; font-weight: bold;">Gain Cookies</button>
        
        <button id="saveGame" style="margin-top: 10px; padding: 10px; width: 100%; background: #ff9800; color: white; border: none; border-radius: 8px; font-weight: bold;">Save Game</button>
        
        <button id="stopScript" style="margin-top: 10px; padding: 10px; width: 100%; background: #f44336; color: white; border: none; border-radius: 8px; font-weight: bold;">Stop Add-On</button>
        
        <details style="margin-top: 10px; background: #3e8e41; padding: 10px; border-radius: 8px;">
        	<summary style="font-weight: bold; font-size: 10;">More Options</summary>
        	<div>
        		<label for="cookiesPsInput" style="display: block; font-size: 14px; margin-bottom: 5px; margin-top: 5px;">🍪 Increase CPS</label>
            <input id="cookiesPsInput" type="number" value="0" style="width: 95%; margin-bottom: 10px; padding: 8px; border-radius: 8px; border: none;"/>
        	</div>
        	<div>
        	  <label for="lumpsInput" style="display: block; font-size: 14px; margin-bottom: 5px; margin-top: 5px;">🧊 Increase Sugar Lumps</label>
        	  <input id="lumpsInput" type="number" value="0" style="width: 95%; margin-bottom: 10px; padding: 8px; border-radius: 8px; border: none;"/>
          </div>
          <div>
        	  <label for="achievementName" style="display: block; font-size: 14px; margin-bottom: 5px; margin-top: 5px;">🥇 Achievement Name</label>
        	  <input id="achievementName" type="text" value="Wake and Bake" style="width: 95%; margin-bottom: 10px; padding: 8px; border-radius: 8px; border: none;"/>
          </div>
        	
        	<button id="gainCps" style="margin-top: 0px; padding: 10px; width: 100%; background: #ff9800; color: white; border: none; border-radius: 8px; font-weight: bold;">Increase CPS</button>
        	
        	<button id="gainLumps" style="margin-top: 10px; padding: 10px; width: 100%; background: #ff9800; color: white; border: none; border-radius: 8px; font-weight: bold;">Increase Lumps</button>
        	
        	<button id="getAchievement" style="margin-top: 10px; padding: 10px; width: 100%; background: #ff9800; color: white; border: none; border-radius: 8px; font-weight: bold;">Get Achievement</button>
        	
        	<button id="rmWrinklers" style="margin-top: 10px; padding: 10px; width: 100%; background: #2196f3; color: white; border: none; border-radius: 8px; font-weight: bold;">Remove Wrinklers: OFF</button>
        	
        	<button id="settings" style="margin-top: 10px; padding: 10px; width: 100%; background: #00008B; color: white; border: none; border-radius: 8px; font-weight: bold;">⚙️ Settings</button>
        </details>

    `;

	document.body.appendChild(panel);

	// Draggable panel functionality
	const dragHandle = document.getElementById('dragHandle');
	let isDragging = false;
	let startX, startY, startLeft, startTop;

	dragHandle.addEventListener('mousedown', (e) => {
		isDragging = true;
		panel.style.cursor = 'grabbing';
		startX = e.clientX;
		startY = e.clientY;
		startLeft = parseInt(panel.style.left, 10);
		startTop = parseInt(panel.style.top, 10);
		e.preventDefault();
	});

	document.addEventListener('mousemove', (e) => {
		if (isDragging) {
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
			panel.style.left = `${startLeft + dx}px`;
			panel.style.top = `${startTop + dy}px`;
		}
	});

	document.addEventListener('mouseup', () => {
		if (isDragging) {
			isDragging = false;
			panel.style.cursor = 'grab';
		}
	});

	// Auto-clicker functionality
	let autoClickerInterval = null;
	const toggleAutoClicker = () => {
		const button = document.getElementById('toggleAutoClicker');
		if (autoClickerInterval) {
			Game.Notify('Auto-Clicker: OFF', 'The auto-clicker has been turned off');
			clearInterval(autoClickerInterval);
			autoClickerInterval = null;
			button.innerText = 'Auto-Clicker: OFF';
			button.style.backgroundColor = '#2196f3';
		} else {
			Game.Notify('Auto-Clicker: ON', 'The auto-clicker has been turned on');
			autoClickerInterval = setInterval(() => Game.ClickCookie(), 10);
			button.innerText = 'Auto-Clicker: ON';
			button.style.backgroundColor = '#4caf50';
		}
	};

	document
		.getElementById('toggleAutoClicker')
		.addEventListener('click', toggleAutoClicker);

	// Auto-buyer functionality
	let autoBuyerInterval = null;
	const toggleAutoBuyer = () => {
		const button = document.getElementById('toggleAutoBuyer');
		if (autoBuyerInterval) {
			Game.Notify('Auto-Buyer: OFF', 'The auto-buyer has been turned off');
			clearInterval(autoBuyerInterval);
			autoBuyerInterval = null;
			button.innerText = 'Auto-Buyer: OFF';
			button.style.backgroundColor = '#2196f3';
		} else {
			Game.Notify('Auto-Buyer: ON', 'The auto-buyer has been turned on');
			autoBuyerInterval = setInterval(() => {
				const items = Game.ObjectsById.concat(Game.UpgradesInStore);
				let bestItem = null;
				let bestEfficiency = 0;

				items.forEach((item) => {
					if (item && item.price <= Game.cookies) {
						const efficiency = item.storedCps / item.price; // CPS gain per cookie spent
						if (efficiency > bestEfficiency) {
							bestEfficiency = efficiency;
							bestItem = item;
						}
					}
				});

				if (bestItem) bestItem.buy(1);
			}, 1000);
			button.innerText = 'Auto-Buyer: ON';
			button.style.backgroundColor = '#4caf50';
		}
	};

	document
		.getElementById('toggleAutoBuyer')
		.addEventListener('click', toggleAutoBuyer);

	const saveGame = () => {
		Game.WriteSave();
		console.log('Saved the game (From Cookie Master Contol)');
	};

	document.getElementById('saveGame').addEventListener('click', saveGame);

	const gainCookies = () => {
		Game.cookies += parseInt(document.getElementById('cookieInput').value);
		console.log('Added cookies');
	};

	document.getElementById('gainCookies').addEventListener('click', gainCookies);

	// Stop script functionality
	const stopScript = () => {
		clearInterval(autoClickerInterval);
		clearInterval(autoBuyerInterval);
		document.body.removeChild(panel);
		console.log('Cookie Clicker Add-On Deactivated!');
	};

	document.getElementById('stopScript').addEventListener('click', stopScript);

	const changeCps = () => {
		Game.cookiesPs += parseInt(document.getElementById('cookiesPsInput').value);
		console.log('Increased CPS');
	};

	document.getElementById('gainCps').addEventListener('click', changeCps);

	const getAchievement = () => {
		Game.Win(document.getElementById('achievementName').value);
	};

	document
		.getElementById('getAchievement')
		.addEventListener('click', getAchievement);

	let rmWrinklersToggle = false;
	const removeWrinklers = () => {
		const button = document.getElementById('rmWrinklers');
		if (rmWrinklersToggle) {
			Game.Notify('Wrinkler Remover: OFF', 'Wrinklers will stop being removed');
			rmWrinklersToggle = false;
			Game.wrinklerHP = 2.1;
			button.style.backgroundColor = '#2196f3';
			button.innerText = 'Remove Wrinklers: OFF';
		} else {
			Game.Notify('Wrinkler Remover: ON', 'Wrinklers will be removed');
			rmWrinklersToggle = true;
			Game.wrinklerHP = 0;
			button.style.backgroundColor = '#4caf50';
			button.innerText = 'Remove Wrinklers: ON';
		}
	};

	document
		.getElementById('rmWrinklers')
		.addEventListener('click', removeWrinklers);

	const gainLumps = () => {
		Game.lumps += parseInt(document.getElementById('lumpsInput').value);
	};

	document.getElementById('gainLumps').addEventListener('click', gainLumps);

	const settings = () => {
		if (document.getElementById('sPanel')) {
			console.log('Settings window is already open!');
		} else {
			sPanel = document.createElement('div');
			sPanel.id = 'sPanel';
			sPanel.style.position = 'fixed';
			sPanel.style.top = '10px';
			sPanel.style.left = '10px';
			sPanel.style.width = '350px';
			sPanel.style.padding = '20px';
			sPanel.style.background = 'linear-gradient(145deg, #1E90FF, #0000FF)';
			sPanel.style.color = 'white';
			sPanel.style.fontFamily = 'Arial, sans-serif';
			sPanel.style.borderRadius = '12px';
			sPanel.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
			sPanel.style.zIndex = '10000';
			sPanel.style.overflow = 'hidden';
			sPanel.innerHTML = `
		<div id="setDragHandle" class="setDragHandle" style="cursor: grab; font-weight: bold; text-align: center; background: #00008B; padding: 10px; border-radius: 8px;"> 
								⚙️ Settings
		</div>
		<div style="display: flex; gap: 10px;">
		<button id="save" style="margin-top: 10px; padding: 10px; width: 50%; background: #4caf50; color: white; border: none; border-radius: 8px; font-weight: bold;" class="button">Save</button>
		<button id="cancel" style="margin-top: 10px; padding: 10px; width: 50%; background: #f44336; color: white; border: none; border-radius: 8px; font-weight: bold;" class="button">Cancel</button>
		</div>
		
		`;
			document.body.appendChild(sPanel);

			const dragHandle = document.getElementById('setDragHandle');
			let isDragging = false;
			let startX, startY, startLeft, startTop;

			dragHandle.addEventListener('mousedown', (e) => {
				isDragging = true;
				sPanel.style.cursor = 'grabbing';
				startX = e.clientX;
				startY = e.clientY;
				startLeft = parseInt(sPanel.style.left, 10);
				startTop = parseInt(sPanel.style.top, 10);
				e.preventDefault();
			});

			document.addEventListener('mousemove', (e) => {
				if (isDragging) {
					const dx = e.clientX - startX;
					const dy = e.clientY - startY;
					sPanel.style.left = `${startLeft + dx}px`;
					sPanel.style.top = `${startTop + dy}px`;
				}
			});

			document.addEventListener('mouseup', () => {
				if (isDragging) {
					isDragging = false;
					sPanel.style.cursor = 'grab';
				}
			});
			const cancel = () => {
				document.getElementById("sPanel").remove();
			};
			
			document.getElementById("cancel").addEventListener("click", cancel);
		}
	};

	document.getElementById('settings').addEventListener('click', settings);

	// Update stats
	const updateStats = () => {
		document.getElementById('cookieCount').innerText = Game.cookies.toFixed(0);
		document.getElementById('cpsCount').innerText = Game.cookiesPs.toFixed(1);

		const goal = parseInt(document.getElementById('goalInput').value, 10) || 0;
		const cookies = Game.cookies;
		const cps = Game.cookiesPs;

		if (goal > 0 && cps > 0) {
			const timeToGoal = Math.max(0, (goal - cookies) / cps);
			document.getElementById('timeToNextBuy').innerText =
				`${Math.ceil(timeToGoal)} seconds`;
		} else {
			document.getElementById('timeToNextBuy').innerText = 'N/A';
		}
	};
	setInterval(updateStats, 500);

	console.log('Cookie Master Control Add-On Initialized!');
})();
