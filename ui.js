const translations = {
    en: { logo: "VESPER", tabC: "CONTACTS", tabM: "MESSAGES", tabP: "PROFILE", connect: "CONNECT", logout: "LOGOUT", sett: "Settings", langL: "Choose Language:", msgH: "Text...", partnerH: "Partner ID", keyH: "Encryption Key" },
    sr: { logo: "TREZOR", tabC: "KONTAKTI", tabM: "PORUKE", tabP: "PROFIL", connect: "POVEŽI SE", logout: "ODJAVA", sett: "Postavke", langL: "Izaberi jezik:", msgH: "Poruka...", partnerH: "ID Partnera", keyH: "Ključ za enkripciju" },
    de: { logo: "TRESOR", tabC: "KONTAKTE", tabM: "NACHRICHTEN", tabP: "PROFIL", connect: "VERBINDEN", logout: "LOGOUT", sett: "Einstellungen", langL: "Sprache wählen:", msgH: "Nachricht...", partnerH: "Partner-ID", keyH: "Verschlüsselung" },
    ru: { logo: "СЕЙФ", tabC: "КОНТАКТЫ", tabM: "СООБЩЕНИЯ", tabP: "ПРОФИЛЬ", connect: "СОЕДИНИТЬ", logout: "ВЫХОД", sett: "Настройки", langL: "Выберите язык:", msgH: "Сообщение...", partnerH: "ID партнера", keyH: "Ключ шифрования" },
    ja: { logo: "金庫", tabC: "連絡先", tabM: "メッセージ", tabP: "プロフィール", connect: "接続する", logout: "ログアウト", sett: "設定", langL: "言語を選択:", msgH: "メッセージ...", partnerH: "パートナーID", keyH: "暗号化キー" },
    zh: { logo: "金库", tabC: "联系人", tabM: "消息", tabP: "个人资料", connect: "连接", logout: "登出", sett: "设置", langL: "选择语言:", msgH: "消息...", partnerH: "伙伴ID", keyH: "加密密钥" }
};

const ui = {
    currentLang: 'en',
    switchTab: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        if(event) event.currentTarget.classList.add('active');
    },
    changeLang: function(v) {
        this.currentLang = v;
        const t = translations[v];
        document.getElementById('app-logo').innerText = t.logo;
        document.getElementById('tab-c').innerText = t.tabC;
        document.getElementById('tab-m').innerText = t.tabM;
        document.getElementById('tab-s').innerText = t.tabP;
        document.getElementById('btn-connect').innerText = t.connect;
        document.getElementById('btn-logout').innerText = t.logout;
        document.getElementById('txt-settings').innerText = t.sett;
        document.getElementById('txt-lang-label').innerText = t.langL;
        document.getElementById('msg-input').placeholder = t.msgH;
        document.getElementById('target-phone').placeholder = t.partnerH;
        document.getElementById('vault-key').placeholder = t.keyH;
    }
};
