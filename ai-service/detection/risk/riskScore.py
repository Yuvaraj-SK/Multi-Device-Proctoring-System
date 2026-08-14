class RiskScore:

    def __init__(self):
        self.score = 0

    def add_risk(self, points):
        self.score += points

        if self.score > 100:
            self.score = 100

    def reset(self):
        self.score = 0

    def get_score(self):
        return self.score