  
from pydantic import BaseModel, EmailStr

class ContactCreate(BaseModel):
    name: str
    company: str | None = None
    email: EmailStr
    message: str

    class Config:
        from_attributes = True