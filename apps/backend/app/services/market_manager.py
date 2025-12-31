import random
from typing import Dict

class MarketManager:
    def __init__(self):
        self.exposure_limits = {"home": 10.0, "away": 10.0, "over": 10.0, "under": 10.0}
        self.active_exposure = {}
    
    def calculate_odds(self, market_id: str) -> Dict[str, float]:
        """Dynamic odds with house edge"""
        base_odds = {"home": 1.90, "away": 1.90}
        # Simulate market movement
        base_odds["home"] += random.uniform(-0.05, 0.05)
        base_odds["away"] += random.uniform(-0.05, 0.05)
        return base_odds
    
    def check_exposure(self, market_id: str, side: str, stake: float) -> bool:
        """Check risk limits"""
        current_exposure = self.active_exposure.get(f"{market_id}:{side}", 0)
        return (current_exposure + stake) <= self.exposure_limits.get(side, 10.0)
    
    def quote_price(self, odds: float, stake: float) -> float:
        """Apply 2% house edge"""
        return stake * odds * 1.02
    
    def update_exposure(self, market_id: str, side: str, stake: float):
        key = f"{market_id}:{side}"
        self.active_exposure[key] = self.active_exposure.get(key, 0) + stake
