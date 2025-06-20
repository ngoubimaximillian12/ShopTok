from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class RecommendationRequest(BaseModel):
    user_id: str

@app.post("/friend-suggestions")
async def friend_suggestions(request: RecommendationRequest):
    # Dummy static recommendations
    return {"friends": ["user2", "user3"]}

@app.post("/product-recommendations")
async def product_recommendations(request: RecommendationRequest):
    # Dummy static recommendations
    return {"products": ["prod2", "prod3"]}
