 
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from config.database import get_db
from models.contact import ContactMessage
from schemas.contact import ContactCreate

router = APIRouter(
    prefix="/api",
    tags=["Contact Form"]
)

@router.post("/contact", status_code=status.HTTP_201_CREATED)
def receive_contact_form(payload: ContactCreate, db: Session = Depends(get_db)):
    try:
        db_message = ContactMessage(
            name=payload.name,
            company=payload.company,
            email=payload.email,
            message=payload.message
        )
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return {
            "status": "success",
            "message": "تم استلام طلبك بنجاح وسيتواصل معك مختصو دِرع."
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="حدث خطأ داخلي أثناء حفظ البيانات.")

@router.get("/admin/messages")
def get_all_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()