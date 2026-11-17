# 🎮 Cezeri Games — Web Sitesi & Cloudflare Dağıtım Kılavuzu

**cezerigames.com** için geliştirilmiş modern, ultra hızlı, responsive ve Cloudflare Pages uyumlu resmi web sitesi projesi.

---

## 📁 Proje Dizin Yapısı

```
cezerigames-web/
├── index.html                   # Ana Sayfa (Cezeri Games Vitrini, MultiMind Tanıtımı, Vizyon, İletişim)
├── games/
│   └── multimind/
│       └── index.html           # MultiMind Kids: Brain Games Özel Oyunu Sayfası & Mağaza İndirme Linkleri
├── blog/
│   ├── index.html               # Blog / Makaleler Ana Sayfası
│   └── coklu-zeka-kurami/
│       └── index.html           # Örnek Makale: Çoklu Zeka Kuramı ve Oyun Temelli Eğitim
├── privacy-policy/
│   └── index.html               # COPPA, GDPR-K, Apple & Google Aile Politikası Uyumlu Gizlilik Politikası
├── terms/
│   └── index.html               # Kullanım Şartları (Terms of Service)
├── assets/
│   ├── css/style.css            # Özel Glassmorphism, animasyon ve stil sistemi
│   ├── js/main.js               # Mobil menü, yumuşak kaydırma, interaktif efektler
│   └── images/                  # Vektörel logolar, favicolar ve MultiMind oyun görselleri
└── README.md
```

---

## ⚡ 1. Sitenizi Bilgisayarınızda İnceleme

Herhangi bir sunucu veya ek kurulum gerekmez:
1. `cezerigames-web/index.html` dosyasına çift tıklayarak doğrudan Chrome / Edge tarayıcınızda açabilirsiniz.

---

## 🚀 2. GitHub Deposu Oluşturma ve Yükleme (1 Dakika)

1. **GitHub'da Yeni Depo Açın:**
   * [github.com/new](https://github.com/new) adresine gidin.
   * Depo adı olarak `cezerigames-web` yazın ve **Create repository** deyin.

2. **Terminal / PowerShell ile Yükleyin:**
   ```powershell
   cd c:\Users\root\Documents\GitHub\cezerigames-web
   git init
   git add .
   git commit -m "feat: Cezeri Games resmi web sitesi ve MultiMind vitrini"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/cezerigames-web.git
   git push -u origin main
   ```

---

## ☁️ 3. Cloudflare Pages ile Yayına Alma (Tamamen Ücretsiz)

1. [dash.cloudflare.com](https://dash.cloudflare.com/) adresine girin.
2. Sol menüden **Workers & Pages** > **Create application** > **Pages** sekmesine tıklayın.
3. **Connect to Git** (GitHub'a Bağlan) butonuna basın ve `cezerigames-web` deponuzu seçin.
4. Ayarlar:
   * **Project name:** `cezerigames-web`
   * **Production branch:** `main`
   * **Framework preset:** `None` (Statik HTML/CSS olduğu için hiçbir derleme ayarı gerekmez)
   * **Build command:** *(Boş bırakın)*
   * **Build output directory:** `.` veya `/` *(Boş bırakabilir veya kök dizin seçebilirsiniz)*
5. **Save and Deploy** butonuna basın. Siteniz 15 saniye içinde Cloudflare üzerinde yayına geçer!

---

## 🌐 4. `cezerigames.com` Alan Adını Bağlama

1. Cloudflare Pages projenizin içindeyken **Custom Domains** (Özel Alan Adları) sekmesine tıklayın.
2. **Set up a custom domain** butonuna basın.
3. `cezerigames.com` yazın ve devam edin.
4. Cloudflare DNS ayarlarını tek tıkla otomatik bağlar ve ücretsiz SSL sertifikanızı hemen aktif eder!
5. İsteğe bağlı olarak `www.cezerigames.com` için de aynı adımı tekrarlayabilirsiniz.

---

## ✍️ 5. İleride Yeni Blog Yazısı Nasıl Eklenir?

Yeni bir yazı yazmak istediğinizde:
1. `blog/coklu-zeka-kurami` klasörünü kopyalayıp yeni yazınızın başlığıyla adlandırın (örn: `blog/ekran-suresi`).
2. İçindeki `index.html` dosyasını Not Defteri veya VS Code ile açıp metninizi yazın.
3. `git add .` -> `git commit -m "yeni yazi"` -> `git push` yaptığınız anda Cloudflare sitenizi otomatik günceller!
