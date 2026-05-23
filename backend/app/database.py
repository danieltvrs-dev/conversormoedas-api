import time

from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False)
Base = declarative_base()


def criar_tabelas(tentativas=10, espera=3):
    for tentativa in range(1, tentativas + 1):
        try:
            Base.metadata.create_all(bind=engine)
            return
        except OperationalError:
            if tentativa == tentativas:
                raise
            print(
                f"Banco indisponível, tentativa {tentativa}/{tentativas}, "
                f"novo teste em {espera}s..."
            )
            time.sleep(espera)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
