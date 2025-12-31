from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from app.models.bet import BetQuote
from app.services.market_manager import MarketManager
from app.services.redis import increment_rate_limit, set_rate_limit
import uuid
from datetime import datetime, timedelta

router = APIRouter()
market_mgr = MarketManager()

class BetRequest(BaseModel):
    market_id: str
    side: str
    stake: float

@router.post("/place-bet")
async def place_bet_quote(bet: BetRequest):
    """x402 Payment Required endpoint"""
    
    # Rate limiting
    client_ip = "127.0.0.1"  # Replace with real IP
    if not await increment_rate_limit(f"bet:{client_ip}", 10, 60):
        raise HTTPException(429, "Rate limited")
    
    quote_id = str(uuid.uuid4())
    odds = market_mgr.calculate_odds(bet.market_id)
    
    if bet.side not in odds:
        raise HTTPException(400, "Invalid side")
    
    if not market_mgr.check_exposure(bet.market_id, bet.side, bet.stake):
        raise HTTPException(400, "Exceeds exposure limit")
    
    price = market_mgr.quote_price(odds[bet.side], bet.stake)
    
    quote = BetQuote(
        quote_id=quote_id,
        market_id=bet.market_id,
        side=bet.side,
        odds=odds[bet.side],
        price=price,
        max_stake=1.0,
        expires_at=int((datetime.utcnow() + timedelta(minutes=5)).timestamp())
    )
    
    # Update exposure
    market_mgr.update_exposure(bet.market_id, bet.side, bet.stake)
    
    # HTTP 402 Payment Required
    headers = {
        "Payment-Required": f"crypto-cronos://{price:.6f}@sportsbook",
        "X-Quote-ID": quote_id,
        "Retry-After": "300"
    }
    
    return Response(
        content=quote.model_dump_json(),
        status_code=402,
        headers=headers,
        media_type="application/json"
    )
