const auth = {
    login: function() {
        const name = document.getElementById('my-name').value.trim();
        const phone = document.getElementById('my-phone').value.trim();
        if(name && phone) {
            appState.me = { name, phone };
            document.getElementById('auth-overlay').classList.add('hidden');
            db.ref('status/' + phone).set({ online: true });
            db.ref('status/' + phone).onDisconnect().remove();
        }
    }
};
