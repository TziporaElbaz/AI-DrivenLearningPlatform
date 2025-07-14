# פלטפורמת למידה מונעת בינה מלאכותית - צד שרת

## סקירה כללית
שרת Node.js (Express) עבור פלטפורמת הלמידה. מספק REST API, משולב עם OpenAI, ומשתמש ב-PostgreSQL דרך Sequelize ORM.

## הוראות התקנה
- העתקו את הקובץ `.env.example` ל-`.env` ומלאו את הערכים שלכם
- הריצו `npm install`
- השתמשו ב-Docker Compose כדי להרים את מסד הנתונים PostgreSQL
- הריצו `npm run dev` כדי להפעיל את השרת

## טכנולוגיות בשימוש
- Node.js, Express.js
- PostgreSQL, Sequelize
- OpenAI API
- JWT (לאימות משתמשים)
- Docker Compose

## מבנה הפרויקט
- `src/controllers` - קבצי בקר (Route handlers)
- `src/models` - מודלים של Sequelize
- `src/routes` - נתיבי Express
- `src/services` - לוגיקת שירות, אינטגרציה עם OpenAI
- `src/middlewares` - אימות, ולידציה, טיפול בשגיאות
- `src/config` - קבצי קונפיגורציה למסד נתונים ולאפליקציה

## איך להריץ מקומית
ראו את README הראשי של הפרויקט להוראות הפעלה מלאות.
