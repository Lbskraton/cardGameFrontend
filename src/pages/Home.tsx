import Card from "../components/Card";


function Home() {
  // Lista de cartas de muestra
  const cards = [
    { entity: '🂡', suit: 'spades', value: 'A', deck: 1 },
    { entity: '🂽', suit: 'hearts', value: 'Q', deck: 1 },
    { entity: '🃍', suit: 'diamonds', value: 'Q', deck: 1 },
    { entity: '🃊', suit: 'diamonds', value: '10', deck: 1 },
    { entity: '🃏', suit: 'joker', value: 'Joker', deck: 1 },
    { entity: '🂛', suit: 'clubs', value: 'J', deck: 1 },
    { entity: '🂡', suit: 'spades', value: 'A', deck: 1 },
    { entity: '🃏', suit: 'joker', value: 'Joker', deck: 1 },
    { entity: '🂡', suit: 'spades', value: 'A', deck: 1 },
    { entity: '🂱', suit: 'hearts', value: 'A', deck: 1 },
    { entity: '🂡', suit: 'spades', value: 'A', deck: 1 },
    { entity: '🃞', suit: 'clubs', value: 'K', deck: 1 },
  ];

  return (
    <div>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {cards.map((card, idx) => (
          <Card
            key={idx}
            suit={card.suit}
            value={card.value}
            entity={card.entity}
            backEntity="🂠"
            turned={false}
            onClickCard={() => {}}
            // Puedes ajustar size y sizeUnit según tu diseño
            size={120}
            sizeUnit="px"
          />
        ))}
      </div>
    </div>
  );
}

export default Home;