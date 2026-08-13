   
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.database import engine, Base
from routers import contact

# إنشاء الجداول عند التشغيل
Base.metadata.create_all(bind=engine)

app = FastAPI(title="دِرع | API أمن الشبكات والأنظمة")

# إعدادات CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ربط مسارات الـ Contact بالتطبيق الرئيسي
app.include_router(contact.router)