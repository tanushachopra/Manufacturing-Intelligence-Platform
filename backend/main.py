from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes.predictive import router as predictive_router
from api.routes.telemetry import router as telemetry_router
from api.routes.rul import router as rul_router
from api.routes.anomaly import router as anomaly_router
from api.routes.ai_insights import router as ai_router
from api.routes import copilot


app = FastAPI(
    title="FactoryOS API",
    version="1.0.0",
    description="AI Powered Manufacturing Intelligence Platform",
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# EXISTING API ROUTES
# =========================================================

app.include_router(
    predictive_router,
    prefix="/api",
    tags=["Predictive Maintenance"],
)


app.include_router(
    telemetry_router,
    prefix="/api",
    tags=["Telemetry"],
)


app.include_router(
    rul_router,
    prefix="/api",
    tags=["Remaining Useful Life"],
)


app.include_router(
    anomaly_router,
    prefix="/api",
    tags=["Anomaly Detection"],
)


app.include_router(
    ai_router,
    prefix="/api",
    tags=["AI Insights"],
)


# =========================================================
# AI COPILOT
# =========================================================

app.include_router(
    copilot.router,
)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "FactoryOS Backend Running 🚀",
        "status": "healthy",
        "version": "1.0.0",
    }