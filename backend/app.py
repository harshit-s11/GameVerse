from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Player
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.get_json()
    player = Player.query.filter_by(username=data['username']).first()
    if not player:
        player = Player(username=data['username'], score=data['score'],
                        achievements=",".join(data['achievements']))
        db.session.add(player)
    else:
        player.score = max(player.score, data['score'])
        existing = set(player.achievements.split(','))
        incoming = set(data['achievements'])
        player.achievements = ",".join(existing.union(incoming))
    db.session.commit()
    return jsonify({"message": "Score submitted!"})

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    top_players = Player.query.order_by(Player.score.desc()).limit(10).all()
    return jsonify([
        {"username": p.username, "score": p.score} for p in top_players
    ])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
