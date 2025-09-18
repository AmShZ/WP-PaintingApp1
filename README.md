# نقاشی بکش لویی (بخش اول)

یک اپ ساده‌ی React برای کشیدن شکل‌های پایه روی بوم. چیزهایی که دارد:
- سایدبار **Tools** با دکمه‌های بزرگ و رنگی (دایره آبی، مربع سبز، مثلث صورتی)
- کلیک روی بوم → اضافه شدن شکل انتخاب‌شده در همان نقطه
- دوبار کلیک روی هر شکل → حذف همان شکل
- شمارنده‌ی تعداد هر نوع شکل در پایین
- **Export** به JSON و **Import** از JSON (دکمه‌ی Import به‌جای «Choose file»)

---

## پیش‌نیاز
- Node.js 20.19+ یا 22.12+ (پیشنهادی 22)
- npm

اگر Node قدیمی است، با nvm ارتقا دهید:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source ~/.nvm/nvm.sh
    nvm install 22
    nvm use 22

---

## نصب و اجرا (WSL/Linux)
    # داخل پوشه‌ی پروژه
    npm install
    npm run dev

بعد در مرورگر باز کنید: `http://localhost:5173/`

### ساخت نسخه‌ی production
    npm run build
    npm run preview

---

## طرز استفاده
1) از سایدبار (**Tools**) یکی از ابزارها را انتخاب کنید: دایره (آبی) / مربع (سبز) / مثلث (صورتی).  
2) روی بوم سفید کلیک کنید تا شکل همان‌جا اضافه شود.  
3) برای حذف، روی همان شکل **دوبار کلیک** کنید.  
4) پایین صفحه تعداد هرکدام از شکل‌ها را می‌بینید.  
5) **Export**: دکمه را بزنید تا `painting.json` دانلود شود.  
6) **Import**: دکمه‌ی **Import** را بزنید و فایل JSON معتبر انتخاب کنید تا عنوان و شکل‌ها بارگذاری شوند.

### فرمت JSON
    {
      "title": "My Painting",
      "shapes": [
        { "id": "uuid-or-number", "type": "circle|square|triangle", "x": 120, "y": 240 }
      ]
    }

---

## ساختار پوشه‌ها
    src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    └── components/
        ├── Header.jsx
        ├── Sidebar.jsx
        ├── Canvas.jsx
        ├── Shape.jsx
        └── Footer.jsx

---

## گزارش کوتاه پیاده‌سازی
- فریم‌ورک: React 18 + Vite. استایل‌ها در `styles.css`.
- Stateها در `App.jsx`: `title` (عنوان)، `selectedShape` (ابزار فعال)، `shapes` (آرایه‌ی اشکال `{id,type,x,y}`).
- اضافه‌کردن شکل: کلیک روی بوم؛ مختصات با `getBoundingClientRect()` از **خود بوم** گرفته می‌شود تا دقیق باشد و کلیک روی خودِ شکل نادیده گرفته می‌شود.
- حذف شکل: در `Shape.jsx` با **دوبار کلیک** و `stopPropagation` تا کلیک به بوم نرسد و شکل ناخواسته ساخته نشود.
- Import/Export: در `Header.jsx` خروجی JSON با Blob دانلود می‌شود؛ برای Import، input فایل مخفی با دکمه‌ی **Import** تریگر می‌شود سپس `title` و `shapes` تنظیم می‌شود.
- نمایش اشکال: دایره و مربع divهای absolute؛ مثلث با borderهای CSS. رنگ آیکن‌های سایدبار مطابق رنگ شکل‌های روی بوم است.

---

## نکات
- اگر خطای نسخه‌ی Node/Vite دیدید، Node را با nvm به 22 ارتقا دهید.
- برای رفع مشکلات نصب:
    rm -rf node_modules package-lock.json
    npm install
- برای زیپ یا گیت، `node_modules/` را حذف/نادیده بگیرید؛ بعداً با `npm install` دوباره ساخته می‌شود.
