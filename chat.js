const chat = {
    connect: function() {
        appState.partner = document.getElementById('target-phone').value.trim();
        appState.encKey = document.getElementById('vault-key').value;
        if(appState.partner && appState.encKey) {
            if(appState.currentRoom) db.ref('chats/' + appState.currentRoom).off();
            document.getElementById('messages').innerHTML = "";
            ui.switchTab('chats');
            this.loadMessages();
        }
    },
    send: function() {
        const text = document.getElementById('msg-input').value;
        const burn = parseInt(document.getElementById('burn-timer').value);
        if(!text) return;
        const roomID = btoa([appState.me.phone, appState.partner].sort().join("_"));
        const secret = CryptoJS.SHA256(appState.encKey).toString();
        const encrypted = CryptoJS.AES.encrypt(text, secret).toString();
        db.ref('chats/' + roomID).push({
            sender: appState.me.phone, name: appState.me.name, text: encrypted, timestamp: firebase.database.ServerValue.TIMESTAMP, burn: burn
        });
        document.getElementById('msg-input').value = "";
    },
    loadMessages: function() {
        appState.currentRoom = btoa([appState.me.phone, appState.partner].sort().join("_"));
        const secret = CryptoJS.SHA256(appState.encKey).toString();
        db.ref('chats/' + appState.currentRoom).limitToLast(50).on('child_added', snap => {
            const data = snap.val();
            let displayTxt = "";
            try {
                const bytes = CryptoJS.AES.decrypt(data.text, secret);
                displayTxt = bytes.toString(CryptoJS.enc.Utf8) || "🔒 [Key Error]";
            } catch(e) { displayTxt = "🔒 [Encrypted]"; }

            const mEl = document.createElement('div');
            mEl.className = `msg ${data.sender === appState.me.phone ? 'sent' : 'received'}`;
            mEl.innerHTML = `<small style="color:var(--gold);font-size:9px">${data.name}</small><br><span class="txt">${displayTxt}</span>`;
            
            if(data.sender !== appState.me.phone) {
                const tr = document.createElement('span');
                tr.className = "translate-link";
                tr.innerText = "🌐 Translate";
                tr.onclick = () => this.translate(displayTxt, mEl);
                mEl.appendChild(tr);
            }

            document.getElementById('messages').appendChild(mEl);
            document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
            if (data.sender !== appState.me.phone && data.burn > 0) {
                setTimeout(() => { db.ref('chats/' + appState.currentRoom + '/' + snap.key).remove(); mEl.remove(); }, data.burn);
            }
        });
    },
    translate: async function(text, el) {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${ui.currentLang}&dt=t&q=${encodeURI(text)}`);
        const result = await res.json();
        const tDiv = document.createElement('div');
        tDiv.style = "font-size:12px; color:#aaa; margin-top:5px; border-top:1px solid #333";
        tDiv.innerText = "→ " + result[0][0][0];
        el.appendChild(tDiv);
    }
};