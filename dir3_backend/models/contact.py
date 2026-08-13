  
from sqlalchemy import Column, Integer, String, Text, DateTime
import datetime
from config.database import Base

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    company = Column(String(150), nullable=True)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)